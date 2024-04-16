import {AxiosError} from 'axios';
import {
  UseMutationOptions,
  UseQueryOptions,
  QueryKey,
} from '@tanstack/react-query';

type ResponseError = AxiosError<{
  statusCode: string;
  message: string;
  error: string;
}>;

// Omit -> 특정 속성만 제거한 타입을 정의하는것
// mutation에서 우리가 사용할 Error타입이 원하는 형태로 설정되어있지 않기 때문에
// 위의 타입을 새로 정의해서 덮은 후 사용, UseMutationOptions에 있는 Error타입을 참고
type UseMutationCustomOptions<TData = unknown, TVariables = unknown> = Omit<
  UseMutationOptions<TData, ResponseError, TVariables, unknown>,
  'mutationFn'
>;

type UseQueryCustomOptions<TQueryFnData = unknown, TData = TQueryFnData> = Omit<
  UseQueryOptions<TQueryFnData, ResponseError, TData, QueryKey>,
  'queryKey'
>;

export type {ResponseError, UseMutationCustomOptions, UseQueryCustomOptions};
