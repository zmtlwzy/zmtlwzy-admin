import { rest } from 'msw';
import type { requestParams } from '../_type';
import { getRequestToken, resultError, resultSuccess } from '../_util';

export function createFakeUserList() {
  return [
    {
      userId: '1',
      username: 'admin',
      realName: 'Zmtlwzy',
      avatar: 'https://picsum.photos/id/1005/100/100.webp',
      desc: 'manager',
      password: '123456',
      token: 'fakeToken1',
      homePath: '/dashboard/analysis',
      roles: [
        {
          roleName: 'Super Admin',
          value: 'super',
        },
      ],
    },
    {
      userId: '2',
      username: 'test',
      password: '123456',
      realName: 'test user',
      avatar: 'https://picsum.photos/id/388/100/100.webp',
      desc: 'tester',
      token: 'fakeToken2',
      homePath: '/dashboard/workbench',
      roles: [
        {
          roleName: 'Tester',
          value: 'test',
        },
      ],
    },
  ];
}

const fakeCodeList: any = {
  1: ['1000', '3000', '5000'],

  2: ['2000', '4000', '6000'],
};
export default [
  rest.post('/basic-api/login', (req, res, ctx) => {
    const { username, password } = req.body as any;
    let json: Record<string, unknown> = resultError('Incorrect account or password！');
    const checkUser = createFakeUserList().find(
      (item) => item.username === username && password === item.password
    );
    if (checkUser) {
      const { userId, username: _username, token, realName, desc, roles } = checkUser;
      console.log('登录成功')
      json = resultSuccess({
        roles,
        userId,
        username: _username,
        token,
        realName,
        desc,
      });
    }
    return res(ctx.delay(200), ctx.json(json));
  }),
  rest.get('/basic-api/getUserInfo', (req: requestParams, res, ctx) => {
    const token = getRequestToken(req);
    let json: Record<string, unknown> = resultError('Invalid token');
    if (token) {
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) json = resultError('The corresponding user information was not obtained!');
      else json = resultSuccess(checkUser);
    }
    return res(ctx.json(json));
  }),
  rest.get('/basic-api/getPermCode', (req: requestParams, res, ctx) => {
    const token = getRequestToken(req);
    let json: Record<string, unknown> = resultError('Invalid token');
    if (token) {
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        json = resultError('The corresponding user information was not obtained!');
      } else {
        const codeList = fakeCodeList[checkUser.userId];
        json = resultSuccess(codeList);
      }
    }
    return res(ctx.delay(200), ctx.json(json));
  }),

  rest.get('/basic-api/logout', (req: requestParams, res, ctx) => {
    const token = getRequestToken(req);
    let json: Record<string, unknown> = resultError('Invalid token');
    if (token) {
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) json = resultError('The corresponding user information was not obtained!');
      else json = resultSuccess(undefined, { message: 'Token has been destroyed' });
    }

    return res(ctx.delay(200), ctx.json(json));
  }),
];
