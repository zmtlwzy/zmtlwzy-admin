<template>
  <PageWrapper title="卡片列表">
    <template #headerContent>
      <n-space vertical :size="16">
        <n-text> 这是一个关于卡片列表页面的描述，只用于占位作用</n-text>
        <n-space :size="24">
          <n-button text>
            <template #icon>
              <i-logos-vue />
            </template>
            vue
          </n-button>
          <n-button text>
            <template #icon>
              <i-logos-react />
            </template>
            react
          </n-button>
          <n-button text>
            <template #icon>
              <i-logos-svelte-icon />
            </template>
            svelte
          </n-button>
        </n-space>
      </n-space>
    </template>
    <DemoCard />
  </PageWrapper>
</template>

<script lang="ts" setup>
  import DemoCard from './components/DemoCard.vue';
</script>
