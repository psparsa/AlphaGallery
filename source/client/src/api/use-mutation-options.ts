import { UseMutationOptions as UseRqMutationOptions } from '@tanstack/react-query';

export type UseMutationOptions<
  TData,
  TError,
  TVariables,
  TContext = unknown
> = Omit<
  UseRqMutationOptions<TData, TError, TVariables, TContext>,
  'mutationFn' | 'mutationKey'
>;
