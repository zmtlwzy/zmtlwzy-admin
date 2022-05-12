<template>
  <section
    v-show="show"
    class="full-loading"
    :class="{ absolute }"
    :style="[background ? `background-color: ${background}` : '']"
  >
    <NSpin v-bind="loadingProps">
      <template v-for="item in Object.keys($slots)" #[item]="data">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </NSpin>
  </section>
</template>

<script setup lang="ts">
  defineOptions({
    name: 'Loading',
    inheritAttrs: false,
  });
  const props = withDefaults(
    defineProps<{
      show?: boolean;
      absolute?: boolean;
      background?: string;
      description?: string;
      stroke?: string;
      size?: number | 'small' | 'medium' | 'large';
      strokeWidth?: number;
      rotate?: boolean;
    }>(),
    {
      absolute: true,
      show: false,
      rotate: true,
    }
  );

  const attrs = useAttrs();
  const loadingProps = { ...attrs, ...props };
</script>

<style lang="less" scoped>
  section.full-loading {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: rgb(255 255 255 / 40%);

    ::v-deep(.n-spin) {
      color: var(--app-primary-color);
    }

    html.dark & {
      background-color: rgb(0 0 0 / 40%);
    }

    &.absolute {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 300;
    }
  }
</style>
