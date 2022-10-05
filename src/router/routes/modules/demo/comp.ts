import type { AppRouteModule } from '/@/router/types'

import { LAYOUT, getParentLayout } from '/@/router/constant'
import { t } from '/@/composables/web/useI18n'

const routes: AppRouteModule = {
  path: '/comp',
  name: 'Comp',
  component: LAYOUT,
  redirect: '/comp/table',
  meta: {
    orderNo: 700,
    icon: 'ant-design:wallet-outlined',
    title: t('routes.demo.comp.comp'),
  },
  children: [
    {
      path: 'table',
      name: 'TableDemo',
      redirect: '/comp/table/basic-table',
      component: getParentLayout('TableDemo'),
      meta: {
        title: t('routes.demo.table.table'),
      },
      children: [
        {
          path: 'basic-table',
          name: 'TableBasicDemo',
          component: () => import('/@/views/demo/comp/table/basic.vue'),
          meta: {
            title: t('routes.demo.table.basic'),
          },
        },
        {
          path: 'basic-table-detail/:id?',
          name: 'TableBasicDemoDetail',
          component: () => import('/@/views/demo/comp/table/detail.vue'),
          meta: {
            title: '表格详情页',
            hideMenu: true,
            hideTab: true,
            currentActiveMenu: '/comp/table/basic-table',
          },
        },
      ],
    },
    {
      path: 'form',
      name: 'FormDemo',
      redirect: '/comp/form/basic-form',
      component: getParentLayout('FormDemo'),
      meta: {
        title: t('routes.demo.form.form'),
      },
      children: [
        {
          path: 'basic-form',
          name: 'formBasicDemo',
          component: () => import('/@/views/demo/comp/form/basic.vue'),
          meta: {
            title: t('routes.demo.form.basic'),
          },
        },
        {
          path: 'use-form',
          name: 'useFormDemo',
          component: () => import('/@/views/demo/comp/form/useForm.vue'),
          meta: {
            title: t('routes.demo.form.useForm'),
          },
        },
      ],
    },
    {
      path: 'modal',
      name: 'ModalDemo',
      component: () => import('/@/views/demo/comp/modal/basic.vue'),
      meta: {
        title: t('routes.demo.comp.modal'),
      },
    },
    {
      path: 'loading',
      name: 'LoadingDemo',
      component: () => import('/@/views/demo/comp/loading/basic.vue'),
      meta: {
        title: t('routes.demo.comp.loading'),
      },
    },
  ],
}

export default routes
