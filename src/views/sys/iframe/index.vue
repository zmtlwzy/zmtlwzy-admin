<template>
  <div :class="prefixCls" :style="getWrapStyle">
    <NSpin :show="loading" size="large" :style="getWrapStyle">
      <iframe
        ref="frameRef"
        :src="frameSrc"
        :class="`${prefixCls}__main`"
        @load="hideLoading"
      ></iframe>
    </NSpin>
  </div>
</template>
<script lang="ts">
  import type { CSSProperties } from 'vue';
  import { defineComponent, ref, unref, computed } from 'vue';

  import { propTypes } from '/@/utils/propTypes';
  import { useDesign } from '/@/composables/web/useDesign';
  // import { on, off, emit } from '/@/logics/mitt/layoutContentResize';
  import { useLayoutContentResize } from '/@/logics/mitt/layoutContentResize';
  import { useContentSizeInject } from '/@/composables/web/useAppInject';

  export default defineComponent({
    name: 'IFrame',
    props: {
      frameSrc: propTypes.string.def(''),
    },
    setup() {
      const loading = ref(true);
      const frameRef = ref();

      const { prefixCls } = useDesign('iframe-page');
      const { on, emit } = useLayoutContentResize();
      const { height } = useContentSizeInject();
      on(calcHeight);

      const getWrapStyle = computed((): CSSProperties => {
        return {
          height: `${unref(height)}px`,
        };
      });

      function calcHeight() {
        const iframe = unref(frameRef);
        if (!iframe) {
          return;
        }

        iframe.style.height = `${unref(height)}px`;
      }

      function hideLoading() {
        loading.value = false;
        emit();
      }

      return {
        getWrapStyle,
        loading,
        frameRef,
        prefixCls,

        hideLoading,
      };
    },
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-iframe-page';

  .@{prefix-cls} {
    &__main {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: var(--app-body-color);
      border: 0;
      box-sizing: border-box;
    }
  }
</style>
