<template>
  <PageWrapper
    title="分步表单"
    content-background
    content=" 将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。"
    content-class="p-4"
  >
    <n-card>
      <div class="mx-auto w-750px m-4">
        <NSteps :current="current" :vertical="isVertical" :status="currentStatus" class="md:ml-1/7">
          <NStep title="填写转账信息" />
          <NStep title="确认转账信息" />
          <NStep title="完成" />
        </NSteps>
      </div>
      <div class="mt-8">
        <Step1 v-show="current === 1" @next="handleStep1Next" />
        <Step2
          v-show="current === 2"
          v-if="initSetp2"
          @prev="handleStepPrev"
          @next="handleStep2Next"
        />
        <Step3 v-show="current === 3" v-if="initSetp3" @redo="handleRedo" />
      </div>
    </n-card>
  </PageWrapper>
</template>

<script lang="ts">
  export default {
    name: 'StepFormPage',
  };
</script>

<script setup lang="ts">
  import { ref } from 'vue';
  import type { StepsProps } from 'naive-ui';
  import { useBreakpoint } from '/@/composables/event/useBreakpoint';
  import Step1 from './Step1.vue';
  import Step2 from './Step2.vue';
  import Step3 from './Step3.vue';

  const current = ref(1);
  const currentStatus = ref<StepsProps['status']>('process');
  const initSetp2 = ref(false);
  const initSetp3 = ref(false);

  const { smaller, sizeEnum } = useBreakpoint();
  const isVertical = smaller(sizeEnum.MD);

  function handleStep1Next(step1Values: any) {
    current.value++;
    initSetp2.value = true;
    console.log(step1Values);
  }

  function handleStepPrev() {
    current.value--;
  }

  function handleStep2Next() {
    current.value++;
    initSetp3.value = true;
  }

  function handleRedo() {
    current.value = 1;
    initSetp2.value = false;
    initSetp3.value = false;
  }
</script>
