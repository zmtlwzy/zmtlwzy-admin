<template>
  <div>
    <slot name="title" />
    <div class="grid grid-cols-1 grid-flow-row-dense md:grid-cols-[300px_1fr] gap-4">
      <BasicForm @register="register" @submit="handleSubmit" />

      <div class="mt-12 ml-12 <md:row-start-1">
        <n-avatar :src="userinfo.avatar" round :size="108" class="mb-6" />
        <n-upload
          action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
          :headers="{
            'naive-info': 'hello!',
          }"
          :data="{
            'naive-data': 'cool! naive!',
          }"
        >
          <n-button class="ml-2">上传文件</n-button>
        </n-upload>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useMessage } from 'naive-ui';
  import { set } from 'lodash-es';
  import { useUserStore } from '/@/store/modules/user';
  import { accountInfoApi } from '/@/api/demo/account';
  import { useForm } from '/@/components/Form/index';

  import { schemas } from './data';

  const userStore = useUserStore();
  const userinfo = computed(() => userStore.getUserInfo);
  const { info } = useMessage();

  const [register, { setFieldsValue }] = useForm({
    schemas,
    labelPlacement: 'top',
    gridProps: { cols: 2, xGap: 8 },
    giProps: { span: 2 },
    submitButtonText: '更新',
  });

  const handleSubmit = (e) => {
    info(JSON.stringify(e));
  };

  onMounted(async () => {
    const data = await accountInfoApi();
    console.log(set({ a: 1, b: 2 }, ['sdf', 'sdf'], 15), 'data');
    setFieldsValue(data);
  });
</script>
