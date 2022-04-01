<template>
  <PageWrapper title="单号：234231029431">
    <template #extra>
      <n-space>
        <n-radio-group>
          <n-radio-button v-for="btn in ['操作一', '操作二', '···']" :key="btn" :value="btn">
            {{ btn }}
          </n-radio-button>
        </n-radio-group>
        <n-button type="primary">主操作</n-button>
      </n-space>
    </template>
    <template #headerContent>
      <n-descriptions label-placement="left" :column="2">
        <n-descriptions-item v-for="[key, val] in pageHeaderDes" :key="key" :label="key">
          {{ val }}
        </n-descriptions-item>
      </n-descriptions>
      <n-tabs type="line" size="large" class="mt-5">
        <n-tab name="1">详情</n-tab>
        <n-tab name="2">规则</n-tab>
      </n-tabs>
    </template>
    <div grid="~ cols-1 gap-4">
      <n-card size="small" title="流程进度" :segmented="{ content: true }">
        <n-timeline horizontal class="grid grid-cols-[1fr_1fr_1fr_auto] px-10 max-w-1200px mx-auto">
          <n-timeline-item type="success" time="2020-09-21 16:43:21">
            <template #icon>
              <i-akar-icons-circle-fill />
            </template>
            <template #header>
              <n-space vertical>
                <n-text class="text-16px">创建项目</n-text>
                <div class="space-x-2">
                  <n-text :depth="3">陈美雪</n-text>
                  <i-ant-design-message-outlined />
                </div>
              </n-space>
            </template>
          </n-timeline-item>

          <n-timeline-item type="info">
            <template #icon>
              <i-akar-icons-circle-fill />
            </template>
            <template #header>
              <n-space vertical>
                <n-text class="text-16px">部门初审</n-text>
                <div class="space-x-2">
                  <n-text>林宋琴</n-text>
                  <i-ant-design-message-outlined class="text-$app-primary-color" />
                </div>
                <span class="cursor-pointer text-12px text-$app-primary-color">催一下</span>
              </n-space>
            </template>
          </n-timeline-item>
          <n-timeline-item #header>
            <n-text :depth="3" class="text-16px">财务复核</n-text>
          </n-timeline-item>
          <n-timeline-item #header>
            <n-text :depth="3" class="text-16px">完成</n-text>
          </n-timeline-item>
        </n-timeline>
      </n-card>
      <n-card size="small" title="用户信息" :segmented="{ content: true }">
        <n-space vertical>
          <div>
            <n-descriptions label-placement="left">
              <n-descriptions-item v-for="[key, val] in pageContentDes" :key="key" :label="key">
                {{ val }}
              </n-descriptions-item>
            </n-descriptions>
            <div class="text-16px font-semibold mt-5 mb-4">信息组</div>
            <n-descriptions label-placement="left">
              <n-descriptions-item v-for="[key, val] in pageContentDes2" :key="key" :label="key">
                {{ val }}
              </n-descriptions-item>
            </n-descriptions>
          </div>
          <n-card size="small" header-style="padding:0;" :segmented="{ content: true }">
            <template #header>
              <div class="bg-$n-action-color py-3 px-4">
                <n-text class="text-14px">多层信息组</n-text>
              </div>
            </template>
            <div class="text-16px font-semibold mt-5 mb-4">组名称</div>
            <n-descriptions label-placement="left">
              <n-descriptions-item v-for="[key, val] in pageContentDes3" :key="key" :label="key">
                {{ val }}
              </n-descriptions-item>
            </n-descriptions>
            <n-divider />
            <div class="text-16px font-semibold mt-5 mb-4">组名称</div>
            <n-descriptions label-placement="left">
              <n-descriptions-item label="学名">
                Citrullus lanatus (Thunb.) Matsum. et
                Nakai一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗..
              </n-descriptions-item>
            </n-descriptions>
            <n-divider />
            <div class="text-16px font-semibold mt-5 mb-4">组名称</div>
            <n-descriptions label-placement="left">
              <n-descriptions-item v-for="[key, val] in pageContentDes3" :key="key" :label="key">
                {{ val }}
              </n-descriptions-item>
            </n-descriptions>
          </n-card>
        </n-space>
      </n-card>

      <n-card size="small" title="用户近半年来电记录" :segmented="{ content: true }">
        <n-empty />
      </n-card>

      <n-card header-style="padding:0;">
        <template #header>
          <n-tabs type="line" size="large" :tabs-padding="20" pane-style="padding: 20px;">
            <n-tab name="数据一" />
            <n-tab name="数据二" />
          </n-tabs>
        </template>
        <n-data-table class="mt-4" :columns="tableColumns2" :data="tableData2" />
      </n-card>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { pageHeaderDes, pageContentDes, pageContentDes2, pageContentDes3 } from './data';
  import { tableColumns2, tableData2 } from '../basic/data';
</script>
