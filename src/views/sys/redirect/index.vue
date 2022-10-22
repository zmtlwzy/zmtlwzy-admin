<script lang="ts" setup>
import { onBeforeRouteLeave } from 'vue-router'
import { useRedirectStore } from '/@/store/modules/redirect'

const { currentRoute, replace } = useRouter()
const redirectStore = useRedirectStore()

const { query } = unref(currentRoute)
const path = redirectStore.getPath

const _path = Array.isArray(path) ? path.join('/') : path

if (redirectStore.getRedirentType === 'name') {
  replace({
    name: _path,
    query,
    params: redirectStore.getParams,
  })
}
else {
  replace({
    path: _path.startsWith('/') ? _path : `/${_path}`,
    query,
  })
}

onBeforeRouteLeave(() => {
  redirectStore.$reset()
})
</script>

<template>
  <div />
</template>
