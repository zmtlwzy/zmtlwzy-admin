import { defHttp } from '/@/utils/http/axios'
import type { DemoListGetResultModel, DemoParams } from './model/tableModel'

enum Api {
  DEMO_LIST = '/table/getDemoList',
}

/**
 * @description: Get sample list value
 */

export const demoListApi = (params: DemoParams) =>
  defHttp.get<DemoListGetResultModel>({
    url: Api.DEMO_LIST,
    params,
    headers: {
      // @ts-expect-error
      ignoreCancelToken: true,
    },
  })
