<template>
  <Teleport to="body">
    <transition name="zoom-fade" mode="out-in">
      <div v-if="visible" :class="getClass" @click.stop>
        <div ref="contentRef" :class="`${prefixCls}-content`">
          <div :class="`${prefixCls}-input__wrapper`">
            <n-input
              ref="inputRef"
              :class="`${prefixCls}-input`"
              placeholder="菜单搜索"
              size="large"
              allow-clear
              @input="handleSearch"
            >
              <template #prefix>
                <span class="i-ic:round-search text-20px" />
              </template>
            </n-input>
            <span :class="`${prefixCls}-cancel`" @click="handleClose">
              {{ t('common.cancelText') }}
            </span>
          </div>

          <div v-show="getIsNotData" :class="`${prefixCls}-not-data`">
            {{ t('component.app.searchNotData') }}
          </div>

          <div v-show="!getIsNotData">
            <n-scrollbar ref="scrollWrap" :class="`${prefixCls}-list`" trigger="none">
              <div
                v-for="(item, index) in searchResult"
                :ref="refs.set"
                :key="item.path"
                :data-index="index"
                :class="[
                  `${prefixCls}-list__item`,
                  {
                    [`${prefixCls}-list__item--active`]: activeIndex === index,
                  },
                ]"
                @mouseenter="handleMouseenter"
                @click="handleEnter"
              >
                <div :class="`${prefixCls}-list__item-icon`">
                  <Icon :icon="item.icon || 'mdi:form-select'" :size="20" />
                </div>
                <div :class="`${prefixCls}-list__item-text`">
                  {{ item.label }}
                </div>
                <div :class="`${prefixCls}-list__item-enter`">
                  <span class="i-fluent:arrow-enter-left-24-filled text-20px" />
                </div>
              </div>
            </n-scrollbar>
          </div>
          <AppSearchFooter />
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { type ComponentPublicInstance, computed, nextTick, ref, unref, watch } from 'vue'
import { type ScrollbarInst } from 'naive-ui'
import { type MaybeElement, onClickOutside, useTemplateRefsList } from '@vueuse/core'
import { useDesign } from '/@/composables/web/useDesign'
import { useMenuSearch } from '../useMenuSearch'
import { useI18n } from '/@/composables/web/useI18n'
import { useAppInject } from '/@/composables/web/useAppInject'
import AppSearchFooter from './AppSearchFooter.vue'

const props = defineProps({
  visible: { type: Boolean },
})

const emit = defineEmits(['close'])

const scrollWrap = ref<Nullable<ComponentPublicInstance<ScrollbarInst>>>(null)
const inputRef = ref<Nullable<HTMLElement>>(null)

const { t } = useI18n()
const { prefixCls } = useDesign('app-search-modal')
const contentRef = ref<MaybeElement>()
const refs = useTemplateRefsList<HTMLDivElement>()
const { getIsMobile } = useAppInject()

const { handleSearch, searchResult, keyword, activeIndex, handleEnter, handleMouseenter }
    = useMenuSearch(refs, scrollWrap, emit)

const getIsNotData = computed(() => !keyword || unref(searchResult).length === 0)

const getClass = computed(() => {
  return [
    prefixCls,
    {
      [`${prefixCls}--mobile`]: unref(getIsMobile),
    },
  ]
})

watch(
  () => props.visible,
  (visible: boolean) => {
    visible
        && nextTick(() => {
          unref(inputRef)?.focus()
        })
  },
)

onClickOutside(contentRef, handleClose)

function handleClose() {
  searchResult.value = []
  emit('close')
}
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-app-search-modal';
  @footer-prefix-cls: ~'@{namespace}-app-search-footer';

  .@{prefix-cls} {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 800;
    display: flex;
    width: 100%;
    height: 100%;
    padding-top: 50px;
    background-color: rgb(0 0 0 / 25%);
    justify-content: center;

    &--mobile {
      padding: 0;

      > div {
        width: 100%;
      }

      .@{prefix-cls}-input {
        width: calc(100% - 38px);
      }

      .@{prefix-cls}-cancel {
        display: inline-block;
      }

      .@{prefix-cls}-content {
        width: 100%;
        height: 100%;
        border-radius: 0;
      }

      .@{footer-prefix-cls} {
        display: none;
      }

      .@{prefix-cls}-list {
        height: calc(100% - 80px);
        max-height: unset;

        &__item {
          &-enter {
            opacity: 0% !important;
          }
        }
      }
    }

    &-content {
      position: relative;
      width: 632px;
      margin: 0 auto auto;
      background-color: var(--app-component-bg-color);
      border-radius: 8px;
      box-shadow: 0 25px 50px -12px rgb(0 0 0 / 25%);
      flex-direction: column;
    }

    &-input__wrapper {
      display: flex;
      padding: 14px 14px 0;
      justify-content: space-between;
      align-items: center;
    }

    &-input {
      width: 100%;
      font-size: 1em;
      color: #1c1e21;
      border-radius: 6px;

      span[role='img'] {
        color: #999;
      }
    }

    &-cancel {
      display: none;
      font-size: 1em;
      color: #666;
    }

    &-not-data {
      display: flex;
      width: 100%;
      height: 100px;
      font-size: 0.9;
      color: rgb(150 159 175);
      align-items: center;
      justify-content: center;
    }

    :deep(.n-scrollbar-content) {
      padding: 0 14px 20px 14px;
    }

    :deep(&-list) {
      max-height: 472px;
      padding-bottom: 20px;
      margin: 0 auto;
      margin-top: 14px;

      &__item {
        position: relative;
        display: flex;
        width: 100%;
        height: 56px;
        padding-bottom: 4px;
        padding-left: 14px;
        margin-top: 8px;
        font-size: 14px;
        color: var(--app-text-color);
        cursor: pointer;
        background-color: rgb(249, 249, 249);
        border-radius: 4px;
        box-shadow: 0 1px 3px 0 #d4d9e1;
        align-items: center;

        > div:first-child,
        > div:last-child {
          display: flex;
          align-items: center;
        }

        &--active {
          color: #fff;
          background-color: var(--app-primary-color);

          .@{prefix-cls}-list__item-enter {
            opacity: 100%;
          }
        }

        &-icon {
          width: 30px;
        }

        &-text {
          flex: 1;
        }

        &-enter {
          width: 30px;
          opacity: 0%;
        }
      }
    }
  }
</style>
