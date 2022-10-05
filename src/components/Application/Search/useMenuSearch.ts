import type { Menu } from '/@/router/types'
import type { ComponentPublicInstance, Ref } from 'vue'
import { nextTick, onBeforeMount, ref, unref } from 'vue'
import { getMenus } from '/@/router/menus'
import { cloneDeep } from 'lodash-es'
import { filter, forEach } from '/@/utils/helper/treeHelper'
import { useGo } from '/@/composables/web/usePage'
import { onKeyStroke, useDebounceFn } from '@vueuse/core'
import { type ScrollbarInst } from 'naive-ui'
import { useI18n } from '/@/composables/web/useI18n'

export interface SearchResult {
  label?: string
  path: string
  icon?: string
}

// Translate special characters
function transform(c: string) {
  const code: string[] = ['$', '(', ')', '*', '+', '.', '[', ']', '?', '\\', '^', '{', '}', '|']
  return code.includes(c) ? `\\${c}` : c
}

function createSearchReg(key: string) {
  const keys = [...key].map(item => transform(item))
  const str = ['', ...keys, ''].join('.*')
  return new RegExp(str)
}

export function useMenuSearch(
  refs: Ref<HTMLElement[]>,
  scrollWrap: Ref<Nullable<ComponentPublicInstance<ScrollbarInst>>>,
  emit: EmitType,
) {
  const searchResult = ref<SearchResult[]>([])
  const keyword = ref('')
  const activeIndex = ref(-1)

  let menuList: Menu[] = []

  const { t } = useI18n()
  const go = useGo()
  const handleSearch = useDebounceFn(search, 200)

  onBeforeMount(async () => {
    const list = await getMenus()
    menuList = cloneDeep(list)
    forEach(menuList, (item) => {
      item.label = t(item.label ?? '')
    })
  })

  function search(_keyword: string) {
    keyword.value = _keyword.trim()
    if (!_keyword) {
      searchResult.value = []
      return
    }
    const reg = createSearchReg(unref(keyword))
    const filterMenu = filter(menuList, (item) => {
      return reg.test(item.label ?? '') && !item.hideMenu
    })
    searchResult.value = handlerSearchResult(filterMenu, reg)
    activeIndex.value = 0
  }

  function handlerSearchResult(filterMenu: Menu[], reg: RegExp, parent?: Menu) {
    const ret: SearchResult[] = []
    filterMenu.forEach((item) => {
      const { label, path, icon, children, hideMenu, meta } = item
      if (!hideMenu && reg.test(label ?? '') && (!children?.length || meta?.hideChildrenInMenu)) {
        ret.push({
          label: parent?.label ? `${parent.label} > ${label}` : label,
          path,
          icon: icon || meta?.icon,
        })
      }
      if (!meta?.hideChildrenInMenu && Array.isArray(children) && children.length)
        ret.push(...handlerSearchResult(children, reg, item))
    })
    return ret
  }

  // Activate when the mouse moves to a certain line
  function handleMouseenter(e: any) {
    const index = e.target.dataset.index
    activeIndex.value = Number(index)
  }

  // Arrow key up
  function handleUp() {
    if (!searchResult.value.length)
      return
    activeIndex.value--
    if (activeIndex.value < 0)
      activeIndex.value = searchResult.value.length - 1

    handleScroll()
  }

  // Arrow key down
  function handleDown() {
    if (!searchResult.value.length)
      return
    activeIndex.value++
    if (activeIndex.value > searchResult.value.length - 1)
      activeIndex.value = 0

    handleScroll()
  }

  // When the keyboard up and down keys move to an invisible place
  // the scroll bar needs to scroll automatically
  function handleScroll() {
    const refList = unref(refs)
    if (!refList || !Array.isArray(refList) || refList.length === 0 || !unref(scrollWrap))
      return

    const index = unref(activeIndex)
    const currentRef = refList[index]
    if (!currentRef)
      return

    const wrapEl = unref(scrollWrap)
    if (!wrapEl)
      return

    const scrollHeight = currentRef.offsetTop + currentRef.offsetHeight
    const wrapHeight = wrapEl.$el.nextElementSibling.offsetHeight
    wrapEl.scrollBy({ top: scrollHeight - wrapHeight, behavior: 'smooth' })
  }

  // enter keyboard event
  async function handleEnter() {
    if (!searchResult.value.length)
      return

    const result = unref(searchResult)
    const index = unref(activeIndex)
    if (result.length === 0 || index < 0)
      return

    const to = result[index]
    handleClose()
    await nextTick()
    go(to.path)
  }

  // close search modal
  function handleClose() {
    searchResult.value = []
    emit('close')
  }

  // enter search
  onKeyStroke('Enter', handleEnter)
  // Monitor keyboard arrow keys
  onKeyStroke('ArrowUp', handleUp)
  onKeyStroke('ArrowDown', handleDown)
  // esc close
  onKeyStroke('Escape', handleClose)

  return { handleSearch, searchResult, keyword, activeIndex, handleMouseenter, handleEnter }
}
