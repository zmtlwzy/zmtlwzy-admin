<template>
  <NBreadcrumb>
    <NBreadcrumbItem v-for="{ title, link, icon } in routesList" :key="link">
      <Icon v-if="getShowBreadCrumbIcon && icon" class="mr-1" :icon="icon" />
      <router-link v-if="link" :to="link" #="{ navigate, href }" custom>
        <n-a :href="href" @click="navigate"> {{ title }} </n-a>
      </router-link>
      <n-text v-else>{{ title }}</n-text>
    </NBreadcrumbItem>
  </NBreadcrumb>
</template>
<script lang="ts">
  import { useRootSetting } from '/@/composables/setting/useRootSetting';
  import { useI18n } from '/@/composables/web/useI18n';
  import { filter } from '/@/utils/helper/treeHelper';
  import type { RouteLocationMatched } from 'vue-router';

  export default defineComponent({
    name: 'LayoutBreadcrumb',

    setup() {
      const routesList = ref<any[]>([]);
      const { currentRoute } = useRouter();
      const { getShowBreadCrumbIcon } = useRootSetting();
      const { t } = useI18n();

      watchEffect(() => {
        const routeMatched = currentRoute.value.matched;
        const arr: any[] = [];
        const filterMatch = filterItem(routeMatched);
        filterMatch.forEach((item, index) => {
          const link = filterMatch.length - 1 !== index ? item.path : undefined;
          // console.log(link, 'link');
          arr.push({
            link,
            title: t(item?.meta.title),
            icon: item?.meta?.icon,
          });
        });
        arr.length && (routesList.value = arr);
      });

      function filterItem(list: RouteLocationMatched[]) {
        return filter(list, (item) => {
          const { meta, name } = item;
          if (!meta) {
            return !!name;
          }
          const { title, hideBreadcrumb, hideMenu } = meta;
          if (!title || hideBreadcrumb || hideMenu) {
            return false;
          }
          return true;
        });
      }

      return {
        t,
        routesList,
        getShowBreadCrumbIcon,
      };
    },
  });
</script>
