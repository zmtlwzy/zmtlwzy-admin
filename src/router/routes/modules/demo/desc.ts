import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/composables/web/useI18n';

const routes: AppRouteModule = {
  path: '/desc',
  name: 'DescPage',
  component: LAYOUT,
  redirect: '/desc/base-desc',
  meta: {
    orderNo: 300,
    icon: 'ic:outline-description',
    title: t('routes.demo.page.desc'),
  },
  children: [
    {
      path: 'base-desc',
      name: 'baseDescPage',
      component: () => import('/@/views/demo/page/desc/basic/basicDescPage.vue'),
      meta: {
        title: t('routes.demo.page.descBasic'),
      },
    },
    {
      path: 'high-desc',
      name: 'highDescPage',
      component: () => import('/@/views/demo/page/desc/high/highDescPage.vue'),
      meta: {
        title: t('routes.demo.page.descHigh'),
      },
    },
  ],
};

export default routes;
