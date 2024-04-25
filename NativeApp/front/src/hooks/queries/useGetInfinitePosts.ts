import {ResponsePost, getPosts} from '@/api';
import {queryKeys} from '@/constants';
import {ResponseError} from '@/types';
import {
  QueryKey,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';

// 페이징 쿼리가 추가된 쿼리
function useGetInfinitePosts(
  queryOptions?: UseInfiniteQueryOptions<
    ResponsePost[],
    ResponseError,
    ResponsePost[][],
    ResponsePost[],
    QueryKey,
    number
  >,
) {
  return useInfiniteQuery({
    queryFn: ({pageParam}) => getPosts(pageParam),
    queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPages.length + 1 : undefined;
    },
    ...queryOptions,
  });
}

export default useGetInfinitePosts;
