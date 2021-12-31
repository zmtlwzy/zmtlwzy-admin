<script setup lang="ts">
  import useChangeTheme from '/@/composables/web/useChaneTheme';
  import { ThemeEnum } from '/@/enums/appEnum';
  import { useDesign } from '/@/composables/web/useDesign';

  const { prefixCls } = useDesign('app-dark-mode-switch');
  const [darkModeRef, setLocalTheme] = useChangeTheme();
  const handleClick = () => {
    if (darkModeRef.value === ThemeEnum.DARK) {
      setLocalTheme(ThemeEnum.LIGHT);
    } else {
      setLocalTheme(ThemeEnum.DARK);
    }
  };
</script>

<template>
  <span :class="prefixCls" @click="handleClick">
    <i-clarity-sun-solid v-if="darkModeRef === ThemeEnum.LIGHT" />
    <i-clarity-moon-solid v-else />
  </span>
</template>
