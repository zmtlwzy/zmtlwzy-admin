import type { RestRequest } from 'msw';

export type requestParams = RestRequest & {
  headers: {
    _headers?: {
      authorization?: string;
    };
  };
}
