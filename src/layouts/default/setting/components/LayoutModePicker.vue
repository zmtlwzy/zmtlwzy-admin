<template>
  <div :class="prefixCls">
    <template v-for="item in menuTypeList || []" :key="item.title">
      <Picker
        :prefix-cls="prefixCls"
        :mode="item.type"
        :current-mode="getMenuType"
        :title="t(item.title)"
        :tick-center="getIsTopMenu"
        @click="handleChange(item)"
      />
    </template>
  </div>
</template>
<script lang="ts">
  import { baseHandler } from '../handler';

  import { useDesign } from '/@/composables/web/useDesign';
  import { useMenuSetting } from '/@/composables/setting/useMenuSetting';
  import { useI18n } from '/@/composables/web/useI18n';

  import Picker from './Picker.vue';

  import { HandlerEnum, menuTypeList } from '../enum';
  import { MenuTypeEnum } from '/@/enums/menuEnum';

  export default defineComponent({
    name: 'ThemeModePicker',
    components: { Picker },
    setup() {
      const { prefixCls } = useDesign('setting-layout-mode-picker');
      const { getMenuType, getIsTopMenu } = useMenuSetting();
      const { t } = useI18n();

      const handleChange = ({ mode, type }: typeof menuTypeList[0]) => {
        baseHandler(HandlerEnum.CHANGE_LAYOUT, {
          mode,
          type,
          split: type !== MenuTypeEnum.MIX ? false : undefined,
        });
      };

      return {
        t,
        prefixCls,
        menuTypeList,
        handleChange,
        getMenuType,
        getIsTopMenu,
      };
    },
  });
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-setting-layout-mode-picker';

  .@{prefix-cls} {
    display: flex;
    justify-content: space-evenly;

    &__item {
      position: relative;
      width: 56px;
      height: 48px;
      overflow: hidden;
      cursor: pointer;
      color: #111111;
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

      &--sidebar {
        &::after {
          z-index: 1;
          width: 33%;
          height: 100%;
          background-color: #273352;
          border-radius: 4px 0 0 4px;
        }

        &::before {
          width: 100%;
          height: 25%;
          background-color: #fff;
        }
      }

      &--mix {
        &::before {
          width: 33%;
          height: 100%;
          background-color: #fff;
          border-radius: 4px 0 0 4px;
        }

        &::after {
          z-index: 1;
          width: 100%;
          height: 25%;
          background-color: #273352;
        }
      }

      &--top-menu {
        background-color: #f8f8f8;
        &::after {
          width: 100%;
          height: 25%;
          background-color: #273352;
        }
      }

      &--mix-sidebar {
        &::after {
          z-index: 1;
          width: 15%;
          height: 100%;
          background-color: #273352;
          border-radius: 4px 0 0 4px;
          box-shadow: 1px 0 0 #787e91, 6px 0 0 #354368, 12px 0 0 #354368;
        }

        &::before {
          width: 100%;
          height: 25%;
          background-color: #fff;
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
