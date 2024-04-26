import {createPost} from '@/api';
import queryClient from '@/api/queryClient';
import {queryKeys} from '@/constants';
import {Marker, UseMutationCustomOptions} from '@/types';
import {useMutation} from '@tanstack/react-query';

function useMutateCreatePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: createPost,
    // api가 등록된 장소에 대한 정보를 보내줌 이 데이터를 마커를 표시하는 캐시에 추가
    onSuccess: newPost => {
      // 장소를 추가했을 때, 마커를 가져오는 쿼리가 무효화 되면서 마커가 푯;
      // 서버에서 요청이 성공했을때 어떤데이터를 response로 내려줄 때 좋음
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
      // 캐시를 사용해 재요청, 첫인자로 key, 두번째 인자로 함수나 값
      // key에 해당하는 데이터 조회가능
      // 마커에 대한 모든 데이터들이 조회됨, 이 배열에 새 마커를 넣어주기만 하면 됨.
      queryClient.setQueryData<Marker[]>(
        [queryKeys.MARKER, queryKeys.GET_MARKERS],
        existingMarkers => {
          const newMarker = {
            id: newPost.id,
            latitude: newPost.latitude,
            longitude: newPost.longitude,
            color: newPost.color,
            score: newPost.score,
          };
          return existingMarkers
            ? [...existingMarkers, newMarker]
            : [newMarker];
        },
      );
    },
    ...mutationOptions,
  });
}

export default useMutateCreatePost;
