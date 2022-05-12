<template>
  <component v-if="type" :is="componentMap.get(type)" @click="handleClick" />
</template>

<script setup lang="ts">
  import type { Component } from 'vue';
  import { TriggerEnum } from '/@/enums/menuEnum';
  import { useMenuSetting } from '/@/composables/setting/useMenuSetting';
  import { isFunction } from 'lodash-es';

  import BarTrigger from './BarTrigger.vue';
  import ButtonTrigger from './ButtonTrigger.vue';
  import HeaderTrigger from './HeaderTrigger.vue';

  defineOptions({
    name: 'Trigger',
  });

  const props = withDefaults(
    defineProps<{
      type?: TriggerEnum;
      onClick?: Fn;
    }>(),
    {
      type: TriggerEnum.BAR,
    }
  );

  const componentMap = new Map<TriggerEnum, Component>();
  componentMap.set(TriggerEnum.BAR, BarTrigger);
  componentMap.set(TriggerEnum.BUTTON, ButtonTrigger);
  componentMap.set(TriggerEnum.HEADER, HeaderTrigger);

  const { toggleCollapsed } = useMenuSetting();
  const handleClick = () => {
    if (props?.onClick && isFunction(props.onClick)) {
      props.onClick();
    } else {
      toggleCollapsed();
    }
  };
</script>
