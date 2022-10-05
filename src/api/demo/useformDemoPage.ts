import { ContentTypeEnum } from '/@/enums/httpEnum'
import type { UploadApiResult } from '../model/uploadModel'
import { defHttp } from '/@/utils/http/axios'
import { useGlobSetting } from '/@/composables/setting'

const { uploadUrl = '' } = useGlobSetting()

/**
 * @description: Upload interface
 */
export function useFormDemoApi(params: Record<string, unknown>) {
  return defHttp.post<UploadApiResult>(
    {
      url: uploadUrl,
      timeout: 3 * 1000,
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA,
        // @ts-expect-error
        'ignoreCancelToken': true,
      },
      params,
    },
    {
      errorMessageMode: 'none',
      apiUrl: '',
    },
  )
}
