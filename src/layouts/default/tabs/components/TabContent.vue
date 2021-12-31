<script lang="tsx">
  import { PropType, reactive, nextTick, shallowRef, defineComponent, computed, unref } from 'vue';
  import type { RouteLocationNormalized } from 'vue-router';
  import type { PopoverTrigger } from 'naive-ui';

  import { NDropdown } from 'naive-ui';

  import { TabContentProps, MenuEventEnum } from '../types';

  import { useDesign } from '/@/composables/web/useDesign';
  import { useI18n } from '/@/composables/web/useI18n';
  import { useTabDropdown } from '../useTabDropdown';
  import getCommonCls from './useExtra';

  export default defineComponent({
    name: 'TabContent',
    props: {
      tabItem: {
        type: Object as PropType<RouteLocationNormalized>,
        default: null,
      },
      isExtra: Boolean,
    },
    setup(props) {
      const { prefixCls } = useDesign('multiple-tabs-content');
      const { t } = useI18n();
      const pos = reactive({
        x: 0,
        y: 0,
      });
      const showDropdown = shallowRef<boolean>(false);

      const getTitle = computed(() => {
        const { tabItem: { meta } = {} } = props;
        return meta && t(meta.title as string);
      });

      const getIsTabs = computed(() => !props.isExtra);

      const X = computed(() => (unref(getIsTabs) ? pos.x : undefined));
      const Y = computed(() => (unref(getIsTabs) ? pos.y : undefined));
      const Show = computed(() => (unref(getIsTabs) ? unref(showDropdown) : undefined));
      const ClickOutsize = computed(() => (unref(getIsTabs) ? clickOutside : undefined));

      const getTrigger = computed((): PopoverTrigger => (unref(getIsTabs) ? 'manual' : 'click'));
      const getPlacement = computed(() => (unref(getIsTabs) ? 'bottom-start' : 'bottom-end'));

      const { getDropMenuList, handleMenuEvent, handleContextMenu } = useTabDropdown(
        props as TabContentProps,
        getIsTabs
      );

      async function handleContext(e: MouseEvent) {
        if (props.tabItem) {
          e.preventDefault();
          showDropdown.value = false;
          await nextTick();
          pos.x = e.clientX;
          pos.y = e.clientY;
          showDropdown.value = true;
          handleContextMenu(props.tabItem)(e);
        }
      }

      function handleClick(e: MouseEvent) {
        if (props.tabItem) {
          handleContextMenu(props.tabItem)(e);
        }
      }

      function clickOutside() {
        showDropdown.value = false;
      }

      function onHandleSelect(key: MenuEventEnum) {
        handleMenuEvent(key);
        clickOutside();
      }

      return () => {
        const { wrapperClass, iconClass } = getCommonCls();
        return (
          <>
            {unref(getIsTabs) && (
              <div class={`${prefixCls}__info py-1 pl-2`} onContextmenu={handleContext}>
                <span>{unref(getTitle)}</span>
              </div>
            )}

            <NDropdown
              x={unref(X)}
              y={unref(Y)}
              show={unref(Show)}
              onSelect={onHandleSelect}
              onClickoutside={unref(ClickOutsize)}
              options={unref(getDropMenuList)}
              trigger={unref(getTrigger)}
              placement={unref(getPlacement)}
            >
              {!unref(getIsTabs) && (
                <span class={unref(wrapperClass)} onClick={handleClick}>
                  <i-fluent-options-48-regular class={`${iconClass}`} />
                </span>
              )}
            </NDropdown>
          </>
        );
      };
    },
  });
</script>
