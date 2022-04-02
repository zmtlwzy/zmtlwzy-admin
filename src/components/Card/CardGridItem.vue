<template>
  <NGridItem v-bind="NGIProps" :class="prefixCls">
    <NCard class="card-grid--hoverable" hoverable :bordered="false" v-bind="getCardBindVal">
      <template v-for="item in Object.keys($slots)" :key="item" #[item]="data">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </NCard>
  </NGridItem>
</template>

<script lang="ts">
  export default {
    __GRID_ITEM__: true,
  };
</script>

<script setup lang="ts">
  import { omit } from 'lodash-es';
  import { propTypes } from '/@/utils/propTypes';
  import { useDesign } from '/@/composables/web/useDesign';

  const { prefixCls } = useDesign('card-grid-item');

  const NGIProps = defineProps({
    offset: propTypes.stringNumber,
    span: propTypes.stringNumber,
    suffix: propTypes.bool,
  });

  const attrs = useAttrs();

  const getCardBindVal = computed(() => {
    return omit(attrs, ['hoverable', 'bordered']);
  });
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-card-grid-item';

  .@{prefix-cls} {
    .n-card.card-grid--hoverable {
      border-radius: 0;

      &:hover {
        position: relative;
        z-index: 1;
      }
    }
  }
</style>
