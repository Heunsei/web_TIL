import {useMutation, useQuery} from '@tanstack/react-query';
import {
  getAccessToken,
  getProfile,
  logout,
  postLogin,
  postSignup,
} from '@/api/auth';
import {UseMutationCustomOptions, UseQueryCustomOptions} from '@/types/commons';
import {removeEncryptStorage, setEncryptStorage} from '@/utils';
import {removeHeader, setHeader} from '@/utils/header';
import {useEffect} from 'react';
import queryClient from '@/api/queryClient';
import {numbers, queryKeys, storageKey} from '@/constants';

// 버전 5부터는 객체로 전달해줘야함
function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
    onError: error => {
      console.log(error);
    },
  });
}

function useLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: ({accessToken, refreshToken}) => {
      setEncryptStorage(storageKey.REFRESH_TOKEN, refreshToken);
      // 앞으로의 요청에 헤더값에 토큰을 넣지않고 기본적으로 토큰이 들어가게 됨
      setHeader('Authorization', `Bearer ${accessToken}`);
    },
    // 성공 실패 상관없이 실행할 함수 선언
    onSettled: () => {
      // 로그인 성공 실패 상관없이 자동갱신이 처음 로그인 했을때도 로직이 돌도록 해야함
      console.log('실행확인');
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      });
    },
    onError: error => {
      console.log(error);
    },
    ...mutationOptions,
  });
}

// refresh토큰은 따로 저장소에 저장하는게 아니라 짧게 유효시간을 가지기 때문에
// useQuery를 사용해 시간을 지정해 사용가능하다
function useGetRefreshToken() {
  const {isSuccess, data, isError} = useQuery({
    // 사용을 위한 쿼리 키 전달
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    // 시간 주기에 따라 refetch
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME,
    // 자동 갱신
    refetchOnReconnect: true,
    // 백그라운드에서도 refetch가능 하도록 설정
    refetchIntervalInBackground: true,
  });
  // 리패치 성공시 해야할 것
  useEffect(() => {
    if (isSuccess) {
      // axiosInstance에 토큰을 넣어 사용할것
      setHeader('Authorization', `Bearer ${data.accessToken}`);
      setEncryptStorage(storageKey.REFRESH_TOKEN, data.refreshToken);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      // axiosInstance에 넣어둔 토큰을 삭제하는 함수
      removeHeader('Authorization');
      removeEncryptStorage(storageKey.REFRESH_TOKEN);
    }
  }, [isError]);
  return {isSuccess, isError};
}

// 로그인 후 프로필도 가져옴
// useMutation처럼 옵션을 받아올 수 있도록 설정
function useGetProfile(queryOptions: UseQueryCustomOptions) {
  return useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    queryFn: getProfile,
    ...queryOptions,
  });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeHeader('Authorization');
      removeEncryptStorage(storageKey.REFRESH_TOKEN);
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.AUTH]});
    },
    ...mutationOptions,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    // 토큰을 가져왔을 때 성공하면 함수 실행
    enabled: refreshTokenQuery.isSuccess,
  });
  const isLogin = getProfileQuery.isSuccess;
  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  return {
    signupMutation,
    loginMutation,
    isLogin,
    getProfileQuery,
    logoutMutation,
  };
}

export default useAuth;
