import { rest } from 'msw';
import faker from '@faker-js/faker/locale/zh_CN';
import { format } from 'date-fns';
import { resultSuccess } from '../_util';

function getRandomPics(count = 10): string[] {
  const arr: string[] = [];
  for (let i = 0; i < count; i++) arr.push(faker.image.food(800, 600, true));
  return arr;
}

const demoList = (pageSize: number) => {
  const result: any[] = [];
  for (let index = 0; index < pageSize; index++) {
    result.push({
      id: faker.finance.account(5),
      beginTime: format(new Date(faker.date.past(5)), 'yyyy-MM-dd HH:mm:ss'),
      endTime: format(new Date(faker.date.future(5)), 'yyyy-MM-dd HH:mm:ss'),
      address: faker.address.cityPrefix() + faker.address.citySuffix(),
      name: faker.name.lastName() + faker.name.firstName(),
      avatar: faker.image.nature(200, 200, true),
      imgArr: getRandomPics(Math.ceil(Math.random() * 3) + 1),
      imgs: getRandomPics(Math.ceil(Math.random() * 3) + 1),
      date: format(new Date(faker.date.soon()), 'yyyy-MM-dd'),
      time: format(new Date(faker.date.soon()), 'HH:mm:ss'),
      'no|100000-10000000': 100000,
      'status|1': faker.random.arrayElement([true, false]),
    });
  }
  return result;
};

export default [
  rest.get('/basic-api/table/getDemoList', (req, res, ctx) => {
    const { page = 1, pageSize = 10 } = Object.fromEntries(req.url.searchParams.entries());
    const items = demoList(Number(pageSize));
    return res(
      ctx.delay(100),
      ctx.json(
        resultSuccess({
          page: Number(page),
          pageSize: Number(pageSize),
          total: 45,
          items,
        })
      )
    );
  }),
];
