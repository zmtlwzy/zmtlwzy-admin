<template>
  <PageWrapper
    title="多级菜单页面"
    content="确保组件的name属性与路由name属性一致才能正常启用页面缓存功能"
  >
    <n-card>
      <slot />
    </n-card>
  </PageWrapper>
</template>

<script setup lang="ts"></script>
