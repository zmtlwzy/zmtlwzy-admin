import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/composables/web/useI18n'

const IFrame = () => import('/@/views/sys/iframe/FrameBlank.vue')

const routes: AppRouteModule = {
  path: '/frame',
  name: 'Frame',
  component: LAYOUT,
  redirect: '/frame/doc',
  meta: {
    orderNo: 800,
    icon: 'ion:tv-outline',
    title: t('routes.demo.iframe.frame'),
  },

  children: [
    {
      path: 'doc',
      name: 'Doc',
      component: IFrame,
      meta: {
        frameSrc: 'https://v3.cn.vuejs.org/',
        title: t('routes.demo.iframe.doc'),
        hideLoading: true,
      },
    },
    {
      path: 'naive-ui-doc',
      name: 'NaiveUiDoc',
      component: IFrame,
      meta: {
        frameSrc: 'https://www.naiveui.com/',
        title: t('routes.demo.iframe.naiveUI'),
        hideLoading: true,
      },
    },
  ],
}

export default routes
