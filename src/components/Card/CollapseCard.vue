<template>
  <n-card :size="size" v-bind="$attrs" :segmented="segmented">
    <template #header-extra>
      <slot v-if="$slots['header-extra']" name="header-extra" />
      <n-switch v-else v-model:value="show" />
    </template>
    <template v-for="item in getSlots" #[item]="data">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
    <template #default>
      <NFadeInExpandTransition :appear="appear">
        <div v-show="show" :class="prefixCls">
          <slot />
        </div>
      </NFadeInExpandTransition>
    </template>
  </n-card>
</template>

<script setup lang="ts">
  import { omit } from 'lodash-es';
  import { CardProps } from 'naive-ui';
  import NFadeInExpandTransition from 'naive-ui/lib/_internal/fade-in-expand-transition';
  import { useDesign } from '/@/composables/web/useDesign';

  const slots = useSlots();
  const { prefixCls } = useDesign('collapse-transition');
  withDefaults(
    defineProps<{
      size?: CardProps['size'];
      segmented?: CardProps['segmented'];
      appear?: boolean;
    }>(),
    {
      size: 'small',
      segmented: true,
      appear: false,
    }
  );
  const show = ref(true);
  const getSlots = computed(() => Object.keys(omit(slots, ['header-extra', 'default'])));
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-collapse-transition';

  .@{prefix-cls} {
    &.fade-in-height-expand-transition-leave-active {
      overflow: hidden;
      transition: max-height var(--app-transition-duration) var(--app-bezier),
        opacity var(--app-transition-duration) var(--app-bezier-out),
        margin-top var(--app-transition-duration) var(--app-bezier),
        margin-bottom var(--app-transition-duration) var(--app-bezier),
        padding-top var(--app-transition-duration) var(--app-bezier),
        padding-bottom var(--app-transition-duration) var(--app-bezier);
    }

    &.fade-in-height-expand-transition-enter-active {
      overflow: hidden;
      transition: max-height var(--app-transition-duration) var(--app-bezier),
        opacity var(--app-transition-duration) var(--app-bezier),
        margin-top var(--app-transition-duration) var(--app-bezier),
        margin-bottom var(--app-transition-duration) var(--app-bezier),
        padding-top var(--app-transition-duration) var(--app-bezier),
        padding-bottom var(--app-transition-duration) var(--app-bezier);
    }

    &.fade-in-height-expand-transition-leave-from,
    &.fade-in-height-expand-transition-enter-to {
      opacity: 1;
    }

    &.fade-in-height-expand-transition-enter-from,
    &.fade-in-height-expand-transition-leave-to {
      opacity: 0;
      margin-top: 0 !important;
      margin-bottom: 0 !important;
    }
  }
</style>
