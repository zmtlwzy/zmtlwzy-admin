<template>
  <div class="lg:flex">
    <div class="flex items-center space-x-2">
      <div class="w-72px mr-3">
        <n-avatar :src="userinfo.avatar || headerImg" round :size="72" />
      </div>
      <div class="flex flex-col space-y-2">
        <span class="text-lg mb-2"> 晚上好，{{ userinfo.realName }}，今天记得加班哦！ </span>
        <span class="text-$app-text-color-3"> 今日阴，22℃ - 28℃ </span>
      </div>
    </div>

    <div class="flex flex-1 justify-end md:mt-0 mt-4">
      <div class="workbench-header-right workbench-header-right-divider">
        <span class="text-$app-text-color-3"> 项目 </span>
        <span class="text-xl">5</span>
      </div>
      <div class="workbench-header-right workbench-header-right-divider">
        <span class="text-$app-text-color-3"> 团队 </span>
        <span class="text-xl">9</span>
      </div>

      <div class="workbench-header-right">
        <span class="text-$app-text-color-3"> 启动时间 </span>
        <span class="text-xl">2021</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useUserStore } from '/@/store/modules/user';
  import headerImg from '/@/assets/images/header.jpg';

  const userStore = useUserStore();
  const userinfo = computed(() => userStore.getUserInfo);
</script>

<style>
  .workbench-header-right {
    @apply flex-ja-col text-right px-7 relative;
  }

  .workbench-header-right-divider::after {
    @apply content-empty absolute top-[20%] right-0 h-[60%] border-dashed border-r-1px text-gray-500:50;
  }
</style>
