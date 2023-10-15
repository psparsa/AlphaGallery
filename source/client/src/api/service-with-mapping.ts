/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpResponse } from './http-client';

export const serviceWithMapping =
  <ResponseType extends HttpResponse<any>, MapperResult, VariablesType>(
    service: (variables: VariablesType) => Promise<ResponseType>,
    mapper: (operationResult: ResponseType['data']) => MapperResult
  ) =>
  async (variables: VariablesType): Promise<MapperResult> => {
    const { data } = await service(variables);

    return mapper(data);
  };
