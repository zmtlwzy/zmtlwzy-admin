<template>
  <div class="app-layout-header-anction-icon px-3" @click="setDrawerState(true)">
    <i-ion-settings-outline />
    <SettingDrawer />
  </div>
</template>

<script lang="ts">
import SettingDrawer from './SettingDrawer.vue'

import { useDrawer, useDrawerEnum } from '/@/composables/component/useDrawer'

export default defineComponent({
  name: 'SettingButton',
  components: { SettingDrawer },
  setup() {
    const [_, setDrawerState] = useDrawer(useDrawerEnum.AppConfigDrawer)
    return {
      setDrawerState,
    }
  },
})
</script>
