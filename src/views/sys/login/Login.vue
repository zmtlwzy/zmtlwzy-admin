<template>
  <div :class="prefixCls">
    <div class="fixed top-3 right-6 space-x-4 text-18px text-$app-text-color-2">
      <AppLocalePicker v-if="!sessionTimeout && showLocale" placement="bottom-end" />
      <AppDarkModeToggle v-if="!sessionTimeout" />
    </div>

    <div class="fixed bottom-0 w-full">
      <Footer show />
    </div>

    <div :class="`${prefixCls}-bg`" />
    <div class="flex-jc h-full pt-150px pb-200px">
      <div :class="`${prefixCls}-form`" class="w-460px min-w-320px">
        <AppLogo class="justify-center pl-0 mb-6" is-static logo-size="38" title-size="24" />
        <LoginForm />
        <MobileForm />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import LoginForm from './LoginForm.vue';
  import MobileForm from './MobileForm.vue';
  import Footer from '/@/layouts/default/footer/index.vue';
  import { useDesign } from '/@/composables/web/useDesign';
  import { useLocaleStore } from '/@/store/modules/locale';

  defineProps({
    sessionTimeout: {
      type: Boolean,
    },
  });

  const { prefixCls } = useDesign('login');
  const localeStore = useLocaleStore();
  const showLocale = localeStore.getShowPicker;
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-login';

  .@{prefix-cls} {
    position: relative;
    width: 100%;
    height: 100vh;
    &-bg {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      background-image: url('/@/assets/bg.svg');
      background-size: cover;
      :root.dark & {
        filter: invert(0.92);
      }
    }
  }
</style>
