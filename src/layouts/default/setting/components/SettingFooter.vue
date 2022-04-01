<template>
  <div class="w-full my-2">
    <NGrid x-gap="12" y-gap="12" :cols="2">
      <NGi v-if="isSupported">
        <NButton type="primary" ghost block @click="handleCopy">
          <template #icon>
            <IAntDesignCopyOutlined />
          </template>
          {{ t('layout.setting.copyBtn') }}
        </NButton>
      </NGi>
      <NGi :span="isSupported ? 1 : 2">
        <NButton type="warning" ghost block @click="handleResetSetting">
          <template #icon>
            <IAntDesignRedoOutlined />
          </template>
          {{ t('common.resetText') }}
        </NButton>
      </NGi>
      <NGi :span="2">
        <NButton type="error" ghost block @click="handleClearAndRedo">
          <template #icon>
            <ITablerRefreshAlert />
          </template>
          {{ t('layout.setting.clearBtn') }}
        </NButton>
      </NGi>
    </NGrid>
  </div>
</template>
<script lang="ts">
  import { useMessage, useDialog } from 'naive-ui';

  import { useAppStore } from '/@/store/modules/app';
  import { usePermissionStore } from '/@/store/modules/permission';
  import { useMultipleTabStore } from '/@/store/modules/multipleTab';
  import { useUserStore } from '/@/store/modules/user';
  import useChangeTheme from '/@/composables/web/useChaneTheme';
  // import { themeState } from '/@/settings/designSetting';

  // import { useDesign } from '/@/composables/web/useDesign';
  import { useI18n } from '/@/composables/web/useI18n';
  import { useClipboard } from '@vueuse/core';

  // import { updateColorWeak } from '/@/logics/theme/updateColorWeak';
  // import { updateGrayMode } from '/@/logics/theme/updateGrayMode';
  import defaultSetting from '/@/settings/projectSetting';

  export default defineComponent({
    name: 'SettingFooter',
    setup() {
      const permissionStore = usePermissionStore();
      // const { prefixCls } = useDesign('setting-footer');
      const { t } = useI18n();
      const tabStore = useMultipleTabStore();
      const userStore = useUserStore();
      const appStore = useAppStore();
      const createMessage = useMessage();
      const createDialog = useDialog();
      const { copy, isSupported } = useClipboard();
      const [_, resetDarkMode] = useChangeTheme();

      function handleCopy() {
        copy(JSON.stringify(unref(appStore.getProjectConfig), null, 2));
        isSupported &&
          createDialog.success({
            closable: false,
            title: t('layout.setting.operatingTitle'),
            content: t('layout.setting.operatingContent'),
            positiveText: t('common.okText'),
          });
      }
      function handleResetSetting() {
        try {
          appStore.setProjectConfig(defaultSetting);
          resetDarkMode();
          // const { colorWeak, grayMode } = defaultSetting;
          // updateTheme(themeColor);
          // updateColorWeak(colorWeak);
          // updateGrayMode(grayMode);
          createMessage.success(t('layout.setting.resetSuccess'));
        } catch (error) {
          createMessage.error(String(error));
        }
      }

      function handleClearAndRedo() {
        localStorage.clear();
        appStore.resetAllState();
        permissionStore.resetState();
        tabStore.resetState();
        userStore.resetState();
        location.reload();
      }
      return {
        // prefixCls,
        t,
        isSupported,
        handleCopy,
        handleResetSetting,
        handleClearAndRedo,
      };
    },
  });
</script>
<!-- <style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-setting-footer';

  .@{prefix-cls} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style> -->
