<template>
  <n-card>
    <div class="flex-jb-ac flex-col">
      <n-avatar
        :src="userinfo.avatar || headerImg"
        object-fit="cover"
        round
        :size="108"
        class="mb-6"
      />
      <div class="font-semibold text-lg font-segoe">{{ userinfo.realName }}</div>
      <div>日月之行，若出其中</div>
    </div>
    <div class="grid grid-cols-[auto_1fr] gap-2 mt-6">
      <template v-for="{ icon, text } in userMessage" :key="text">
        <component :is="icon" class="text-16px mt-2px" />
        <span>{{ text }}</span>
      </template>
    </div>
    <n-divider />
    <div class="mb-2">标签</div>
    <n-dynamic-tags v-model:value="tagsRef" :closable="false" />
    <n-divider />
    <div class="mb-4">团队</div>
    <Team />
  </n-card>
</template>

<script setup lang="ts">
  import Team from '/@/views/dashboard/workbench/components/Team.vue';
  import { useUserStore } from '/@/store/modules/user';
  import headerImg from '/@/assets/images/header.jpg';
  import { userMessage, tags } from './data';

  const userStore = useUserStore();
  const userinfo = computed(() => userStore.getUserInfo);

  const tagsRef = ref(tags);
</script>
