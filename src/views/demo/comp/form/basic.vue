<template>
  <PageWrapper title="表单基础示例" content="BasicForm组件支持使用 JSON-Schema 对象渲染表单。">
    <CollapseCard title="基础表单">
      <div class="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-x-18 gap-y-8">
        <n-scrollbar style="max-height: 550px">
          <n-code :code="JSON.stringify(schemas, null, 2)" language="json" />
        </n-scrollbar>
        <div class="flex-jc p-4">
          <BasicForm
            submit-button-text="提交"
            :grid-props="{ cols: 2, xGap: 24 }"
            :gi-props="{ span: 2 }"
            :schemas="schemas"
            class="max-w-800px"
            @submit="handleSubmit"
          >
            <template #dynamicSlot="{ model, field }">
              <n-dynamic-input
                v-model:value="model[field]"
                preset="pair"
                key-placeholder="环境变量名"
                value-placeholder="环境变量值"
              />
            </template>
          </BasicForm>
        </div>
      </div>
    </CollapseCard>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { useMessage } from 'naive-ui';
  import { schemas } from './data';

  const { info } = useMessage();
  const handleSubmit = (e) => {
    info(JSON.stringify(e, null, 2));
  };
</script>
