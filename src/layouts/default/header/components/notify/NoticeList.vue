<template>
  <n-scrollbar style="max-height: 360px">
    <NList v-loading="loading">
      <template v-if="list.length">
        <template v-for="item in list" :key="item.id">
          <NListItem
            class="hover:bg-$app-hover-color cursor-pointer"
            @click="handleTitleClick(item)"
          >
            <NThing class="px-4" :class="{ 'opacity-30': item.read }">
              <template #avatar>
                <NAvatar
                  v-if="item.avatar"
                  :style="{
                    backgroundColor: 'transparent',
                  }"
                  :src="item.avatar"
                />
                <span v-else> {{ item.avatar }}</span>
              </template>
              <template #header>
                <NEllipsis :line-clamp="titleRows" :tooltip="{ placement: 'top' }">
                  <NText>
                    {{ item.title }}
                  </NText>
                  <template #tooltip>
                    {{ item.title }}
                  </template>
                </NEllipsis>
              </template>
              <template v-if="item.extra" #header-extra>
                <NTag :type="item?.color" size="small">
                  {{ item.extra }}
                </NTag>
              </template>
              <template #description>
                <NEllipsis v-if="item.description" :line-clamp="descRows">
                  {{ item.description }}
                </NEllipsis>
                <span v-else class="text-$app-text-color-3">
                  {{ item.datetime }}
                </span>
              </template>
              <template v-if="item.description" #footer>
                <span class="text-$app-text-color-3">
                  {{ item.datetime }}
                </span>
              </template>
            </NThing>
          </NListItem>
        </template>
      </template>
      <n-empty v-else class="min-h-200px flex-jc-ac" />
    </NList>
  </n-scrollbar>
</template>

<script setup lang="ts">
import type { ListItem } from './data'

withDefaults(
  defineProps<{
    list?: ListItem[]
    loading?: boolean
    titleRows?: number
    descRows?: number
  }>(),
  {
    list: () => [],
    loading: false,
    titleRows: 1,
    descRows: 2,
  },
)

const handleTitleClick = (item: ListItem) => {
  item.read = true
}
</script>
