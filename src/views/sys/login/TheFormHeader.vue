<script setup lang='ts'>
interface Props {
  title: string
}
defineProps<Props>()
defineEmits(['back'])
defineOptions({
  name: 'TheFormHeader',
})
</script>

<template>
  <n-space justify="start" align="center" class="pl-4 mb-4">
    <n-button text class="mt-4px" @click="$emit('back')">
      <template #icon>
        <n-icon :size="19" class="mr-6">
          <i-ic:sharp-arrow-back-ios />
        </n-icon>
      </template>
    </n-button>
    <span class="text-2xl fw600">
      {{ title }}
    </span>
  </n-space>
</template>
