<template>
  <div class="h-screen flex-jc-ac">
    <span>{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
  const text = ref('一个在DefaultLayout外的组件，可以进行一些测试用例。');
</script>
