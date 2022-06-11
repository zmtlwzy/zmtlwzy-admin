<template>
  <div v-if="getShowMultipleTab" :style="getWrapperStyle" :class="prefixCls">
    <n-tabs
      ref="tabsElRef"
      v-model:value="activeKeyRef"
      type="card"
      size="small"
      closable
      :tab-style="getTabStyle"
      @close="handleClose"
      @update:value="handleTabChange"
    >
      <template #prefix>
        <div class="placeholder" />
      </template>
      <n-tab
        v-for="panel in panels"
        :key="panel.path || panel.fullPath"
        :name="panel.path || panel.fullPath"
        :class="{ '!pr-2': panel?.meta?.affix }"
        :closable="!panel?.meta?.affix"
      >
        <TabContent :tab-item="panel" />
      </n-tab>

      <template #suffix>
        <div class="flex h-full w-18">
          <TabContent is-extra :tab-item="$route" />
          <TabRedo />
        </div>
      </template>
    </n-tabs>
  </div>
</template>
<script lang="ts">
  import type { CSSProperties, StyleValue } from 'vue';
  import { unrefElement, MaybeElementRef, whenever } from '@vueuse/core';

  import type { RouteLocationNormalized, RouteMeta } from 'vue-router';

  import TabRedo from './components/TabRedo.vue';
  import TabContent from './components/TabContent.vue';

  import { useGo } from '/@/composables/web/usePage';
  import { useDesign } from '/@/composables/web/useDesign';
  // import { useMenuSetting } from '/@/composables/setting/useMenuSetting';
  import { useMultipleTabSetting } from '/@/composables/setting/useMultipleTabSetting';
  import { multipleTabsHeight } from '/@/settings/designSetting';
  import { initAffixTabs } from './useMultipleTabs';
  import { getNaiveCssVarsRef } from '/@/composables/core/useNaiveInternal';

  import { REDIRECT_NAME } from '/@/router/constant';
  import { useMultipleTabStore } from '/@/store/modules/multipleTab';
  import { listenerRouteChange } from '/@/logics/mitt/routeChange';

  export default defineComponent({
    name: 'MultipleTabs',
    components: { TabRedo, TabContent },
    setup() {
      initAffixTabs();
      const tabsElRef = ref() as unknown as MaybeElementRef<HTMLDivElement>;
      const activeKeyRef = ref<string>();

      const router = useRouter();
      const tabStore = useMultipleTabStore();

      const { prefixCls } = useDesign('multiple-tabs');
      const { getShowMultipleTab } = useMultipleTabSetting();

      const go = useGo();
      const getTabStyle = ref<CSSProperties>({
        borderTop: 'none',
        borderRadius: '0px',
        padding: '0px',
        paddingRight: '6px',
      });

      const getWrapperStyle = computed((): StyleValue => {
        const headerColor = getNaiveCssVarsRef('Layout', 'headerColor')!;
        return {
          backgroundColor: headerColor.value,
        };
      });
      const getTabsState = computed(() => {
        return tabStore.getTabList.filter((item) => !item.meta?.hideTab);
      });

      listenerRouteChange((route) => {
        const { name } = route;
        if (name === REDIRECT_NAME || !route) {
          return;
        }

        const { path, fullPath, meta = {} } = route;
        const { currentActiveMenu, hideTab } = meta as RouteMeta;
        const isHide = !hideTab ? null : currentActiveMenu;
        const p = isHide || fullPath || path;
        if (activeKeyRef.value !== p) {
          activeKeyRef.value = p as string;
        }

        if (isHide) {
          const findParentRoute = router
            .getRoutes()
            .find((item) => item.path === currentActiveMenu);

          findParentRoute && tabStore.addTab(findParentRoute as unknown as RouteLocationNormalized);
        } else {
          tabStore.addTab(unref(route));
        }
      });

      watch(
        () => activeKeyRef.value,
        (val) => {
          nextTick(() => {
            if (!val) return;
            const tabElItem = unrefElement(tabsElRef)?.querySelector(`[data-name="${val}"]`);
            if (!tabElItem) return;
            setTimeout(() => {
              tabElItem.scrollIntoView({
                behavior: 'smooth',
              });
            }, 50);
          });
        },
        {
          immediate: true,
        }
      );

      whenever(
        () => unrefElement(tabsElRef),
        (el) => {
          const elRef = el.querySelector('.n-tabs-nav') as HTMLElement;
          elRef.style.minHeight = `${multipleTabsHeight}px`;
        }
      );

      const handleClose = (key: string) => {
        tabStore.closeTabByKey(key, router);
      };

      const handleTabChange = (activeKey: string) => {
        activeKeyRef.value = activeKey;
        go(activeKey, false);
      };

      return {
        activeKeyRef,
        panels: getTabsState,
        tabsElRef,
        handleClose,
        handleTabChange,
        prefixCls,
        getTabStyle,
        getWrapperStyle,
        getShowMultipleTab,
      };
    },
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-multiple-tabs';

  .@{prefix-cls} {
    grid-area: multipletab;
    overflow-x: hidden;
    transition: background-color var(--app-transition-duration) var(--app-bezier),
      border-color var(--app-transition-duration) var(--app-bezier);

    .n-tabs {
      .n-tabs-nav {
        .n-tabs-nav__prefix {
          padding-right: 12px;
        }

        .n-tabs-nav__suffix {
          padding-left: 0px;
          margin-left: -1px;
        }

        // IN 2.30.0 closeIcon add hover background
        // .n-tabs-tab-wrapper {
        //   .n-tabs-tab {
        //     .n-tabs-tab__close {
        //       &::before {
        //         content: '';
        //         display: inline-block;
        //         z-index: -1;
        //         top: calc(50% - 10px);
        //         left: calc(50% - 10px);
        //         position: absolute;
        //         width: 20px;
        //         height: 20px;
        //         border-radius: 5px;
        //         background-color: transparent;
        //       }

        //       &:hover::before {
        //         background-color: var(--app-pressed-color);
        //       }
        //     }

        //     &.n-tabs-tab--active .n-tabs-tab__close {
        //       &:hover::before {
        //         background-color: var(--app-hover-color);
        //       }
        //     }
        //   }
        // }
      }
    }
  }
</style>
