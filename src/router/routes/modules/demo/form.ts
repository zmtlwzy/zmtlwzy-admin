import type { AppRouteModule } from '/@/router/types'
import { LAYOUT } from '/@/router/constant'
import { t } from '/@/composables/web/useI18n'

const routes: AppRouteModule = {
  path: '/form',
  name: 'FormPage',
  component: LAYOUT,
  redirect: '/form/base-form',
  meta: {
    orderNo: 100,
    icon: 'ant-design:form-outlined',
    title: t('routes.demo.page.form'),
  },
  children: [
    {
      path: 'base-form',
      name: 'BaseFromPage',
      component: () => import('/@/views/demo/page/form/basicFormPage.vue'),
      meta: {
        title: t('routes.demo.page.formBasic'),
      },
    },
    {
      path: 'step-form',
      name: 'StepFormPage',
      component: () => import('/@/views/demo/page/form/step/stepFormPage.vue'),
      meta: {
        title: t('routes.demo.page.formStep'),
      },
    },
    {
      path: 'high-form',
      name: 'HighFormPage',
      component: () => import('/@/views/demo/page/form/high/highFormPage.vue'),
      meta: {
        title: t('routes.demo.page.formHigh'),
      },
    },
  ],
}

export default routes
