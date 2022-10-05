<template>
  <PageWrapper
    title="关于页"
    content="
Zmtlwzy Admin 是一个基于 Vue3、Vite、Naive UI、TypeScript 的中后台解决方案，它使用了最新的前端技术栈，提供现成的开箱解决方案及示例。"
  >
    <CollapseCard title="项目信息">
      <n-code :code="JSON.stringify(appInfo, null, 2)" language="json" />
    </CollapseCard>
  </PageWrapper>
</template>

<script lang="ts" setup>
const appInfo = __APP_INFO__
</script>
