<template>
  <PageWrapper>
    <n-card>
      <n-result status="success" title="提交成功" class="mt-12">
        <template #footer>
          <n-space vertical :size="16">
            <span
              >提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message
              全局提示反馈即可。
              <br />
              本文字区域可以展示简单的补充说明，如果有类似展示
              “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。</span
            >
            <n-space justify="center">
              <n-button key="console" type="primary"> 返回列表 </n-button>
              <n-button key="buy"> 查看项目 </n-button>
              <n-button key="buy"> 打印 </n-button>
            </n-space>
          </n-space>
        </template>
      </n-result>
      <n-space vertical :size="16" class="mt-24 bg-$n-action-color p-6">
        <n-descriptions title="项目名称" label-placement="left">
          <n-descriptions-item label="项目 ID"> 111222 </n-descriptions-item>
          <n-descriptions-item label="负责人"> 啊宾 </n-descriptions-item>
          <n-descriptions-item label="生效时间"> 2020-11-12 ~ 2022-04-07 </n-descriptions-item>
        </n-descriptions>
        <n-steps :current="2" size="small">
          <n-step title="创建项目">
            <div>啊宾</div>
            <p>2020-12-12 12:32</p>
          </n-step>
          <n-step title="部门初审">
            <p>Chad</p>
          </n-step>
          <n-step title="财务复核" />
          <n-step title="完成" />
        </n-steps>
      </n-space>
    </n-card>
  </PageWrapper>
</template>
<script setup lang="ts"></script>
