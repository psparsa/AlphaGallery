import {
  QueryKey,
  UseQueryOptions as UseRqQueryOptions,
} from '@tanstack/react-query';

export type UseQueryOptions<
  // eslint-disable-next-line unicorn/prevent-abbreviations
  TQueryFnData,
  TError,
  TQueryKey extends QueryKey,
  TData = TQueryFnData
> = UseRqQueryOptions<TQueryFnData, TError, TData, TQueryKey>;
