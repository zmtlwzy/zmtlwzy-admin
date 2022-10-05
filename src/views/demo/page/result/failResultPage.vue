<template>
  <PageWrapper>
    <n-card>
      <n-result
        class="mt-12"
        status="error"
        title="提交失败"
        description="请核对并修改以下信息后，再重新提交。"
      >
        <template #footer>
          <n-button type="primary">
            返回修改
          </n-button>
        </template>
      </n-result>
      <div class="bg-$n-action-color mt-24 py-6 px-10">
        <div class="mb-4 text-16px font-semibold">
          您提交的内容有如下错误：
        </div>
        <div class="mb-4">
          <i-ant-design-close-circle-outlined class="mr-2 text-16px" />
          您的账户已被冻结
          <a class="ml-4">立即解冻 ></a>
        </div>
        <div class="mb-4">
          <i-ant-design-close-circle-outlined class="mr-2 text-16px" />
          您的账户还不具备申请资格
          <a class="ml-4">立即解冻 ></a>
        </div>
      </div>
    </n-card>
  </PageWrapper>
</template>

<script setup lang="ts"></script>
