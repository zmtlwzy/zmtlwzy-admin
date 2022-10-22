<script lang="ts" setup>
import LoginForm from './LoginForm.vue'
import MobileForm from './MobileForm.vue'
import RegisterForm from './RegisterForm.vue'
import ResetForm from './ResetForm.vue'
import Footer from '/@/layouts/default/footer/index.vue'
import { useDesign } from '/@/composables/web/useDesign'
import { useLocaleStore } from '/@/store/modules/locale'

defineProps({
  sessionTimeout: {
    type: Boolean,
  },
})

const { prefixCls } = useDesign('login')
const localeStore = useLocaleStore()
const showLocale = localeStore.getShowPicker
</script>

<template>
  <div :class="prefixCls">
    <div class="fixed top-3 right-6 space-x-4 text-18px text-$app-text-color-2">
      <AppLocalePicker v-if="!sessionTimeout && showLocale" placement="bottom-end" />
      <AppDarkModeToggle v-if="!sessionTimeout" />
    </div>

    <div :class="`${prefixCls}-bg`" />
    <div :class="`${prefixCls}-card-wrapper`">
      <n-card
        :class="`${prefixCls}-form`"
        content-style="padding: 24px;"
        class="w-460px min-w-320px border-rd-4 shadow-sm"
      >
        <LoginForm />
        <MobileForm />
        <RegisterForm />
        <ResetForm />
      </n-card>
    </div>
    <div class="fixed bottom-0 w-full">
      <Footer show />
    </div>
  </div>
</template>

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
    transition: filter var(--app-transition-duration) var(--app-bezier);

    :root.dark & {
      filter: invert(0.92);
    }
  }

  &-card-wrapper {
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;
    // transform: translateY(-5%);
  }
}
</style>
