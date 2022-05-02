<template>
  <PageWrapper title="useForm操作示例">
    <template #headerContent>
      <div class="mb-4">
        <n-button class="mr-2" @click="setProps({ labelWidth: 150 })"> 更改labelWidth </n-button>
        <n-button class="mr-2" @click="setProps({ labelWidth: 120 })"> 还原labelWidth </n-button>
        <n-button class="mr-2" @click="setProps({ size: 'large' })"> 更改Size </n-button>
        <n-button class="mr-2" @click="setProps({ size: 'medium' })"> 还原Size </n-button>
        <n-button class="mr-2" @click="setProps({ disabled: true })"> 禁用表单 </n-button>
        <n-button class="mr-2" @click="setProps({ disabled: false })"> 解除禁用 </n-button>
      </div>
    </template>

    <CollapseCard title="useForm示例">
      <BasicForm @register="register" @submit="handleSubmit">
        <template #dynamicSlot="{ model, field }">
          <n-dynamic-input v-model:value="model[field]" :on-create="onCreate" #="{ index, value }">
            <div class="grid gap-x-4 grid-cols-[auto_1fr] w-full">
              <n-checkbox
                class="items-center"
                v-model:checked="value.isCheck"
                :label="`第${index + 1}项 :`"
              />
              <n-input-number v-model:value="value.number" />
            </div>
          </n-dynamic-input>
        </template>
        <template #uploadSlot="{ model, field }">
          <n-upload
            v-model:file-list="model[field]"
            list-type="image-card"
            @before-upload="beforeUpload"
          >
            <n-upload-dragger>
              <n-icon size="48" :depth="3">
                <i-bx:bxs-user />
              </n-icon>
            </n-upload-dragger>
          </n-upload>
        </template>
      </BasicForm>
    </CollapseCard>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { useMessage, type UploadProps } from 'naive-ui';
  import { isDevMode } from '/@/utils/env';
  import { schemas } from './data';
  import { useForm } from '/@/components/Form';
  import { useFormDemoApi } from '/@/api/demo/useformDemoPage';

  const submitButtonOptions = reactive({ loading: false });
  const [register, { setProps }] = useForm({
    submitButtonOptions,
    submitButtonText: '提交',
    gridProps: { cols: 2, xGap: 24 },
    giProps: { span: 2 },
    schemas,
  });

  const { info, warning, error } = useMessage();
  const handleSubmit = async (formData) => {
    submitButtonOptions.loading = true;
    try {
      // 需要开启/test/server服务或真实服务器地址
      const url = await useFormDemoApi(formData);
      info(`提交成功： ${url}`, {
        closable: true,
        duration: 10 * 1000,
      });
    } catch {
      isDevMode() && warning('可能需要开启/test/server服务');
      info(JSON.stringify(formData, null, 2), {
        closable: true,
        duration: 10 * 1000,
      });
    }
    submitButtonOptions.loading = false;
  };
  const beforeUpload: NonNullable<UploadProps['onBeforeUpload']> = async (data) => {
    if (/^image\/.+/.test(data.file.file?.type || '')) {
      return true;
    }
    error('只能上传图片文件，请重新选择');
    return false;
  };

  const onCreate = (index: number) => {
    return {
      isCheck: false,
      number: index,
    };
  };
</script>
