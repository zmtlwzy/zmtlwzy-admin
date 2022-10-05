import { genMessage } from '../helper'
// import antdLocale from 'ant-design-vue/es/locale/zh_CN';
// import momentLocale from 'moment/dist/locale/zh-cn';

const modules = import.meta.glob('./zh_CN/**/*.ts', { eager: true }) as Record<
  string,
  {
    default: unknown
  }
>
export default {
  message: {
    ...genMessage(modules, 'zh_CN'),
    // antdLocale,
  },
  // momentLocale,
  // momentLocaleName: 'zh-cn',
}
