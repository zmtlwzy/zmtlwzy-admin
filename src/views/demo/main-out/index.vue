<template>
  <div class="h-screen flex flex-col justify-center space-y-4 max-w-800px mx-auto">
    <span>{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
  const text = '一个在DefaultLayout外的组件，可以进行一些测试用例。';
</script>
