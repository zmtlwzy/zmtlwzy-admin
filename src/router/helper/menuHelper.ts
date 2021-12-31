import { AppRouteModule } from '/@/router/types';
import type { MenuModule, Menu, AppRouteRecordRaw } from '/@/router/types';
import { findPath, treeMap } from '/@/utils/helper/treeHelper';
import { cloneDeep, omit } from 'lodash-es';
import { isUrl } from '/@/utils/is';
import { RouteParams } from 'vue-router';
import { toRaw } from 'vue';

export function getAllParentPath<T = Recordable>(treeData: T[], path: string) {
  const menuList = findPath(treeData, (n) => n.path === path) as Menu[];
  return (menuList || []).map((item) => item.path);
}

function joinParentPath(menus: Menu[], parentPath = '') {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index];
    // https://next.router.vuejs.org/guide/essentials/nested-routes.html
    // Note that nested paths that start with / will be treated as a root path.
    // This allows you to leverage the component nesting without having to use a nested URL.
    if (!(menu.path.startsWith('/') || isUrl(menu.path))) {
      // path doesn't start with /, nor is it a url, join parent path
      menu.path = `${parentPath}/${menu.path}`;
    }
    if (menu?.children?.length) {
      joinParentPath(menu.children, menu.meta?.hidePathForChildren ? parentPath : menu.path);
    }
  }
}

// Parsing the menu module
export function transformMenuModule(menuModule: MenuModule): Menu {
  const { menu } = menuModule;

  const menuList = [menu];

  joinParentPath(menuList);
  return menuList[0];
}

export function transformRouteToMenu(routeModList: AppRouteModule[], routerMapping = false) {
  const cloneRouteModList = cloneDeep(routeModList);
  const routeList: AppRouteRecordRaw[] = [];

  cloneRouteModList.forEach((item) => {
    if (routerMapping && item.meta?.hideChildrenInMenu && typeof item.redirect === 'string') {
      item.path = item.redirect;
      if (Reflect.has(item, 'children') && !!item.children && item.children.length > 0) {
        item.name = item.children[0].name;
        Object.assign(item.meta, item.children[0].meta, { hideMenu: false });
        Reflect.deleteProperty(item, 'children');
        Reflect.deleteProperty(item, 'redirect');
      }
    }
    if (item.meta?.single) {
      const realItem = item?.children?.[0];
      realItem && routeList.push(realItem);
    } else {
      routeList.push(item);
    }
  });
  const list = treeMap(routeList, {
    conversion: (node: AppRouteRecordRaw) => {
      const { meta: { title, hideMenu = false } = {}, name, path, redirect } = node;
      return {
        meta:
          {
            ...omit(node.meta, 'title'),
          } || {},
        label: title,
        path,
        name,
        hideMenu,
        ...(redirect ? { redirect } : {}),
      };
    },
  }) as unknown as Menu[];
  joinParentPath(list);
  return cloneDeep(list);
}

/**
 * config menu with given params
 */
const menuParamRegex = /(?::)([\s\S]+?)((?=\/)|$)/g;
export function configureDynamicParamsMenu(menu: Menu, params: RouteParams) {
  const { path, paramPath } = toRaw(menu);
  let realPath = paramPath || path;
  const matchArr = realPath.match(menuParamRegex);

  matchArr?.forEach((it) => {
    const realIt = it.slice(1);
    if (params[realIt]) {
      realPath = realPath.replace(`:${realIt}`, params[realIt] as string);
    }
  });
  // save original param path.
  if (!paramPath && matchArr && matchArr.length > 0) {
    menu.paramPath = path;
  }
  menu.path = realPath;
  // children
  menu.children?.forEach((item: Menu) => configureDynamicParamsMenu(item, params));
}
