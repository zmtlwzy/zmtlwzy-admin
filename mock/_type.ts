import type { PathParams, MockedRequest } from 'msw';

export type requestParams = Omit<MockedRequest['headers'], 'headers'> &
{
  headers: Record<'headers' | '_headers', {
    authorization?: string;
  }>
  params: PathParams;
}
