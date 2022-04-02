<template>
  <div :class="prefixCls">
    <template v-for="item in themeModeList || []" :key="item.title">
      <Picker
        :prefix-cls="prefixCls"
        :mode="item.mode"
        :current-mode="currentMode"
        :title="t(item.title)"
        @click="handleChange(item.mode)"
      />
    </template>
  </div>
</template>
<script lang="ts">
  import useChangeTheme from '/@/composables/web/useChaneTheme';
  import { useDesign } from '/@/composables/web/useDesign';
  import { useI18n } from '/@/composables/web/useI18n';

  import Picker from './Picker.vue';

  import { themeModeList } from '../enum';

  export default defineComponent({
    name: 'ThemeModePicker',
    components: { Picker },
    setup() {
      const { prefixCls } = useDesign('setting-menu-theme-picker');
      const [currentMode, handleChange] = useChangeTheme();
      const { t } = useI18n();

      return {
        t,
        prefixCls,
        themeModeList,
        currentMode,
        handleChange,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-setting-menu-theme-picker';

  .@{prefix-cls} {
    display: flex;
    justify-content: space-evenly;

    &__item {
      position: relative;
      width: 56px;
      height: 48px;
      overflow: hidden;
      cursor: pointer;
      color: var(--app-text-color);
      background-color: #f0f2f5;
      border-radius: 4px;
      box-shadow: 0 1px 2.5px 0 rgba(0, 0, 0, 0.18);

      &::before,
      &::after {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
      }

      &--light {
        &::before {
          width: 100%;
          height: 25%;
          background-color: #fff;
        }

        &::after {
          z-index: 1;
          width: 33%;
          height: 100%;
          background-color: #fff;
          border-radius: 4px 0 0 4px;
        }
      }

      &--menuDark {
        &::before {
          width: 100%;
          height: 25%;
          background-color: #fff;
        }

        &::after {
          z-index: 1;
          width: 33%;
          height: 100%;
          background-color: #273352;
          border-radius: 4px 0 0 4px;
        }
      }

      &--dark {
        background-color: #354368;
        color: #fafafa;

        &::before {
          width: 100%;
          height: 25%;
          background-color: #273352;
        }

        &::after {
          z-index: 1;
          width: 33%;
          height: 100%;
          background-color: #2e3a57;
          border-radius: 4px 0 0 4px;
        }
      }

      &--active {
        padding: 12px;

        &::before,
        &::after {
          border-radius: 0;
        }
      }

      &:hover {
        &::before,
        &::after {
          border-radius: 0;
        }
      }
    }

    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
</style>
