import { ResultEnum } from '../../src/enums/httpEnum';
import { rest } from 'msw';
import { resultError, resultSuccess } from '../_util';

const userInfo = {
  name: 'zmtlwzy',
  nickName: 'Zmtlwzy',
  userid: '00000001',
  email: 'zmtlwzy@example.com',
  signature: '日月之行，若出其中',
  country: 'China',
  phone: '0942-268888888',
  Adress: {
    Provincey: '44',
    City: '0',
  },
};

export default [
  rest.get('/basic-api/account/getAccountInfo', (_, res, ctx) => {
    return res(ctx.delay(1000), ctx.json(resultSuccess(userInfo)));
  }),
  rest.post('/basic-api/user/sessionTimeout', (_, res, ctx) => {
    return res(ctx.status(401), ctx.json(resultError()));
  }),
  rest.post('/basic-api/user/tokenExpired', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(resultError('Token Expired!', { code: ResultEnum.TIMEOUT as number }))
    );
  }),
];
