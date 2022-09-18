<template>
  <div :class="`${prefixCls}`">
    <span :class="`${prefixCls}-item`">
      <i-fluent:arrow-enter-left-24-filled />
    </span>

    <span>{{ t('component.app.toSearch') }}</span>
    <span :class="`${prefixCls}-item`">
      <i-fluent:arrow-up-24-filled />
    </span>
    <span :class="`${prefixCls}-item`">
      <i-fluent:arrow-down-24-filled />
    </span>
    <span>{{ t('component.app.toNavigate') }}</span>
    <span :class="`${prefixCls}-item`">
      <i-mdi:keyboard-esc />
    </span>
    <span>{{ t('common.closeText') }}</span>
  </div>
</template>

<script lang="ts" setup>
  import { useDesign } from '/@/composables/web/useDesign';
  import { useI18n } from '/@/composables/web/useI18n';
  const { prefixCls } = useDesign('app-search-footer');
  const { t } = useI18n();
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-app-search-footer';

  .@{prefix-cls} {
    position: relative;
    display: flex;
    height: 44px;
    padding: 0 16px;
    font-size: 12px;
    color: #666;
    background-color: var(--app-hover-color);
    border-top: 1px solid var(--app-border-color);
    border-radius: 0 0 16px 16px;
    box-shadow: 0 -1px 0 0 #e0e3e8a7, 0 -3px 6px 0 rgba(69, 98, 155, 0.07);
    align-items: center;
    flex-shrink: 0;

    &-item {
      display: flex;
      font-size: 14px;
      width: 20px;
      height: 18px;
      padding-bottom: 2px;
      margin-right: 0.4em;
      background: linear-gradient(-225deg, #d5dbe4, #f8f8f8);
      border-radius: 2px;
      box-shadow: inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff,
        0 1px 2px 1px rgb(30 35 90 / 40%);
      align-items: center;
      justify-content: center;

      &:nth-child(2),
      &:nth-child(3),
      &:nth-child(6) {
        margin-left: 14px;
      }
    }
  }
</style>
