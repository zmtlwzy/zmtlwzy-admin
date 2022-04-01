<template>
  <n-icon :class="getClass" :size="size" :color="color" :depth="depth">
    <Iconify :icon="getIconRef" />
  </n-icon>
</template>

<script lang="ts">
  import { Icon as Iconify } from '@iconify/vue';
  import type { Depth } from 'naive-ui/lib/icon/src/Icon';
  import { propTypes } from '/@/utils/propTypes';

  export default defineComponent({
    name: 'Icon',
    components: { Iconify },
    props: {
      size: propTypes.stringNumber,
      spin: propTypes.bool,
      color: propTypes.string,
      depth: [String, Number] as PropType<Depth>,
      icon: propTypes.string,
      prefix: propTypes.string,
      useTranstion: propTypes.bool,
    },
    setup(props) {
      const getIconRef = computed(() => `${props.prefix ? props.prefix + ':' : ''}${props.icon}`);
      const getClass = computed(() => {
        return {
          'animate-spin animate-duration-2000': props.spin,
          'transition-all ease-in-out-300': props.useTranstion,
        };
      });
      return {
        getIconRef,
        getClass,
      };
    },
  });
</script>
