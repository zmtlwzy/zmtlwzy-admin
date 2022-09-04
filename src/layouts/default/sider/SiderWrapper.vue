<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}_wrapper`">
      <div class="menu_wrapper" :style="getMenuWrapperStyle">
        <slot name="header" />

        <div ref="scrollEl" class="menu">
          <ScrollContainer :style="getSideBarSrollStyle" :inverted="getInverted">
            <slot />
          </ScrollContainer>
        </div>

        <slot name="trigger">
          <Trigger v-if="getShowTrigger" :collapsed="getCollapsed" :type="getTrigger" />
        </slot>
      </div>
      <div v-if="$slots.secondaryMenu">
        <slot name="secondaryMenu" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { StyleValue } from 'vue';
  import { useElementSize, MaybeElementRef } from '@vueuse/core';
  import { isBoolean } from 'lodash-es';
  import { formatLength } from '/@/utils/css';
  import { getNaiveCssVars } from '/@/composables/core/useNaiveInternal';

  import { useDesign } from '/@/composables/web/useDesign';
  import { useAppInject } from '/@/composables/web/useAppInject';
  import { useRootSetting } from '/@/composables/setting/useRootSetting';
  import { useMenuSetting } from '/@/composables/setting/useMenuSetting';

  import { TriggerEnum } from '/@/enums/menuEnum';
  import Trigger from '../trigger/index.vue';

  const props = withDefaults(
    defineProps<{
      inverted?: boolean;
      trigger?: boolean;
      width: number | string;
    }>(),
    {
      trigger: true,
      inverted: undefined,
    }
  );

  const { prefixCls } = useDesign('layout-sideBar');

  const { getIsDarkMode } = useRootSetting();
  const { getMenuInverted, getTrigger, getCollapsed, getSplit } = useMenuSetting();
  const { getIsMobile } = useAppInject();
  const getShowTrigger = computed(() => {
    return (
      props.trigger &&
      ((getTrigger.value !== TriggerEnum.HEADER && !unref(getIsMobile)) || unref(getSplit))
    );
  });

  const scrollEl: MaybeElementRef = ref(null);

  const { height } = useElementSize(scrollEl);
  const getSideBarSrollStyle = computed(() => ({
    maxHeight: `${height.value}px`,
  }));

  const getInverted = computed(() => {
    if (isBoolean(props.inverted)) return props.inverted;
    return getMenuInverted.value;
  });

  const {
    siderColor: sc,
    siderColorInverted: sci,
    siderBorderColor: sbc,
    siderBorderColorInverted: sbci,
  } = getNaiveCssVars('Layout');
  const { siderColor: dark_sc, siderBorderColor: dark_sbc } = getNaiveCssVars('Layout', true);
  const getSiderBgColor = computed(() =>
    unref(getIsDarkMode) ? dark_sc : unref(getInverted) ? sci : sc
  );
  const getSiderBorderColor = computed(() =>
    unref(getIsDarkMode) ? dark_sbc : unref(getInverted) ? sbci : sbc
  );

  useCssVars(() => ({
    'mix-sider-bg-color': unref(getSiderBgColor),
    'mix-sider-border-color': unref(getSiderBorderColor),
  }));

  const getMenuWrapperStyle = computed(
    (): StyleValue => ({
      width: formatLength(props.width),
    })
  );
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-layout-sideBar';

  .@{prefix-cls} {
    grid-area: sider;
    z-index: 5;
    height: 100%;
    position: relative;
    border-right-width: 1px;
    background-color: var(--mix-sider-bg-color);
    border-color: var(--mix-sider-border-color);
    transition-property: width, background-color, border-color;
    transition-duration: var(--app-transition-duration);
    transition-timing-function: var(--app-bezier);

    &_wrapper {
      display: grid;
      grid-template-columns: auto auto;
      height: 100%;

      .menu_wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
        will-change: width;
        transition: width var(--app-transition-duration) var(--app-bezier);

        .menu {
          flex: 1;
        }
      }
    }
  }
</style>
