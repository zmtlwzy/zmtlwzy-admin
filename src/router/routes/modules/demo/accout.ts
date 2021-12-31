import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/composables/web/useI18n';

const routes: AppRouteModule = {
  path: '/account',
  name: 'AccountPage',
  component: LAYOUT,
  redirect: '/account/setting',
  meta: {
    orderNo: 600,
    icon: 'mdi:qrcode-plus',
    title: t('routes.demo.page.account'),
  },
  children: [
    {
      path: 'center',
      name: 'AccountCenterPage',
      component: () => import('/@/views/demo/page/account/center/accountCenterPage.vue'),
      meta: {
        title: t('routes.demo.page.accountCenter'),
      },
    },
    {
      path: 'setting',
      name: 'AccountSettingPage',
      component: () => import('/@/views/demo/page/account/setting/accountSettingPage.vue'),
      meta: {
        title: t('routes.demo.page.accountSetting'),
      },
    },
  ],
};

export default routes;
