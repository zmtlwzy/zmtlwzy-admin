<template>
  <NPopselect
    v-model:value="selectedKeys"
    trigger="click"
    :options="localeList"
    :render-label="renderLabel"
    @update:value="handleMenuEvent"
  >
    <span v-bind="{ ...getTriggerCls }">
      <i-ic-baseline-language class="text-18px" />
      <span v-if="showText" class="ml-1">{{ getLocaleText }}</span>
    </span>
  </NPopselect>
</template>
<script lang="ts" setup>
  import { ref, watchEffect, unref, computed, h } from 'vue';
  import { SelectOption, SelectGroupOption } from 'naive-ui';
  import type { LocaleType } from '/#/config';
  import { useLocale } from '/@/locales/useLocale';
  import { localeList } from '/@/settings/localeSetting';

  const props = defineProps({
    /**
     * Whether to display text
     */
    showText: { type: Boolean, default: false },
    /**
     * Whether to refresh the interface when changing
     */
    reload: { type: Boolean },
    triggerCls: { type: String },
  });

  const selectedKeys = ref<string>();

  const { changeLocale, getLocale } = useLocale();

  const getLocaleText = computed(() => {
    const key = selectedKeys.value;
    if (!key) {
      return '';
    }
    return localeList.find((item) => item.value === key)?.text;
  });

  const getTriggerCls = computed(() => {
    return props.triggerCls ? { class: props.triggerCls } : {};
  });

  function renderLabel({ label, value }: SelectOption | SelectGroupOption) {
    const suffix = value as string;
    return h(
      'div',
      { class: `min-w-120px d-flex *hb-layout` },
      {
        default: () => [
          h('span', undefined, {
            default: () => label,
          }),
          h(
            'span',
            { class: `text-xs text-gray-400` },
            {
              default: () => suffix.toLocaleLowerCase(),
            }
          ),
        ],
      }
    );
  }

  watchEffect(() => {
    selectedKeys.value = unref(getLocale);
  });

  async function toggleLocale(lang: LocaleType | string) {
    await changeLocale(lang as LocaleType);
    selectedKeys.value = lang as string;
    props.reload && location.reload();
  }

  function handleMenuEvent(value: SelectOption['value']) {
    if (unref(getLocale) === value) {
      return;
    }
    toggleLocale(value as string);
  }
</script>
