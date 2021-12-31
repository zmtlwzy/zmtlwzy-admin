import { MockMethod } from 'vite-plugin-mock';
import { Random } from 'mockjs';
import { resultSuccess } from '../_util';

function getRandomPics(count = 10): string[] {
  const arr: string[] = [];
  for (let i = 0; i < count; i++) {
    arr.push(Random.image('800x600', Random.color(), Random.color(), Random.title()));
  }
  return arr;
}

const demoList = (pageSize: number) => {
  const result: any[] = [];
  for (let index = 0; index < pageSize; index++) {
    result.push({
      id: '@integer(1,99999)',
      beginTime: '@datetime',
      endTime: '@datetime',
      address: '@city()',
      name: '@cname()',
      avatar: Random.image('400x400', Random.color(), Random.color(), Random.first()),
      imgArr: getRandomPics(Math.ceil(Math.random() * 3) + 1),
      imgs: getRandomPics(Math.ceil(Math.random() * 3) + 1),
      date: `@date('yyyy-MM-dd')`,
      time: `@time('HH:mm')`,
      'no|100000-10000000': 100000,
      // 'status|1': ['normal', 'enable', 'disable'],
      'status|1': [true, false],
    });
  }
  return result;
};

export default [
  {
    url: '/basic-api/table/getDemoList',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 10 } = query;
      const items = demoList(Number(pageSize));
      return resultSuccess({ page: Number(page), pageSize: Number(pageSize), total: 45, items });
    },
  },
] as MockMethod[];
