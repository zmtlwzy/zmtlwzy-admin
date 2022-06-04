<template>
  <NTooltip placement="bottom">
    <template #trigger>
      <div
        :class="[
          `${prefixCls}__item`,
          `${prefixCls}__item--${mode}`,
          'hover:(outline-primary before:rounded-none after:rounded-none)',
          {
            'flex-jc-ac': tickCenter,
          },
        ]"
        @click="handleClick"
      >
        <svg
          viewBox="0 0 400 400"
          width="1em"
          height="1em"
          :class="['absolute', 'text-3xl', 'top-3.5', { 'left-6': !tickCenter }]"
        >
          <polyline
            fill="none"
            stroke="currentColor"
            points="93,219 173,284 304,138"
            :class="{ [`${tickPrefixCls}`]: currentMode === mode }"
            :[`stroke-width`]="24"
            :[`stroke-dasharray`]="350"
            :[`stroke-dashoffset`]="350"
            :[`stroke-linecap`]="`round`"
            :[`stroke-linejoin`]="`round`"
          />
        </svg>
      </div>
    </template>
    {{ title }}
  </NTooltip>
</template>

<script setup lang="ts">
  import { useDesign } from '/@/composables/web/useDesign';
  import { propTypes } from '/@/utils/propTypes';

  defineProps({
    prefixCls: propTypes.string,
    mode: propTypes.string,
    currentMode: propTypes.string,
    title: propTypes.string,
    tickCenter: propTypes.bool,
  });

  const emit = defineEmits(['click']);

  const { prefixCls: tickPrefixCls } = useDesign('setting-picker-tick');
  const handleClick = (e) => {
    emit('click', e);
  };
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-setting-picker-tick';

  @keyframes tick {
    from {
      stroke-dashoffset: 350;
    }

    to {
      stroke-dashoffset: 0;
    }
  }

  .@{prefix-cls} {
    animation: tick 0.6s cubic-bezier(0.3, 0.35, 0.08, 1);
    animation-fill-mode: forwards;
  }
</style>
