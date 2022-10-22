import type { AppRouteModule } from '/@/router/types'
import { LAYOUT } from '/@/router/constant'
import { t } from '/@/composables/web/useI18n'

const routes: AppRouteModule = {
  path: '/result',
  name: 'ResultPage',
  component: LAYOUT,
  redirect: '/result/success-result',
  meta: {
    orderNo: 500,
    icon: 'akar-icons:circle-check',
    title: t('routes.demo.page.result'),
  },
  children: [
    {
      path: 'success-result',
      name: 'successResultPage',
      component: () => import('/@/views/demo/page/result/successResultPage.vue'),
      meta: {
        title: t('routes.demo.page.resultSuccess'),
      },
    },
    {
      path: 'fail-result',
      name: 'failResultPage',
      component: () => import('/@/views/demo/page/result/failResultPage.vue'),
      meta: {
        title: t('routes.demo.page.resultFail'),
      },
    },
  ],
}

export default routes
