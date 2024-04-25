import {ResponseSinglePost, getPost} from '@/api';
import {queryKeys} from '@/constants';
import {UseQueryCustomOptions} from '@/types';
import {useQuery} from '@tanstack/react-query';

function useGetPost(
  id: number | null,
  queryOptions?: UseQueryCustomOptions<ResponseSinglePost>,
) {
  return useQuery({
    queryFn: () => getPost(Number(id)),
    queryKey: [queryKeys.POST, queryKeys.GET_POST, id],
    // id가 있을때만 쿼리 실행
    enabled: Boolean(id),
    ...queryOptions,
  });
}

export default useGetPost;
