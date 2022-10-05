import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/composables/web/useI18n'

const routes: AppRouteModule = {
  path: '/list',
  name: 'ListPage',
  component: LAYOUT,
  redirect: '/list/base-list',
  meta: {
    orderNo: 200,
    icon: 'ci:list-ul',
    title: t('routes.demo.page.list'),
  },
  children: [
    {
      path: 'base-list',
      name: 'BaseListPage',
      component: () => import('/@/views/demo/page/list/basicListPage.vue'),
      meta: {
        title: t('routes.demo.page.listBasic'),
      },
    },
    {
      path: 'card-list',
      name: 'CardListPage',
      component: () => import('/@/views/demo/page/list/cardListPage.vue'),
      meta: {
        title: t('routes.demo.page.listCard'),
      },
    },
  ],
}

export default routes
