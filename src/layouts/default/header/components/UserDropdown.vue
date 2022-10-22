<script lang="tsx">
import { type DropdownOption, NAvatar, NDropdown } from 'naive-ui'
import { useUserStore } from '/@/store/modules/user'
// import { useHeaderSetting } from '/@/composables/setting/useHeaderSetting';
import { useI18n } from '/@/composables/web/useI18n'
// import { useDesign } from '/@/composables/web/useDesign';
import { useGo } from '/@/composables/web/usePage'
import headerImg from '/@/assets/images/header.jpg'

enum MenuEvents {
  LOGOUT,
  AccountCenter,
  AccountSetting,
}

export default defineComponent({
  name: 'UserDropdown',
  setup() {
    // const { prefixCls } = useDesign('header-user-dropdown');
    const go = useGo()
    const { t } = useI18n()
    const userStore = useUserStore()

    const getUserInfo = computed(() => {
      const { realName = '', avatar, desc } = userStore.getUserInfo || {}
      return { realName, avatar: avatar || headerImg, desc }
    })

    const dropMenuList: DropdownOption[] = [
      {
        key: MenuEvents.AccountCenter,
        label: t('layout.header.accountCenter'),
        iconName: 'i-ant-design-user-outlined',
      },
      {
        key: MenuEvents.AccountSetting,
        label: t('layout.header.accountSetting'),
        iconName: 'i-ant-design-setting-outline',
      },
      {
        type: 'divider',
        key: 'd1',
      },
      {
        key: MenuEvents.LOGOUT,
        label: t('layout.header.dropdownItemLoginOut'),
        iconName: 'i-ion-power-outline ',
      },
    ]

    //  login out
    function handleLoginOut() {
      userStore.confirmLoginOut()
    }

    function handleMenuClick(e: MenuEvents) {
      switch (e) {
        case MenuEvents.LOGOUT:
          handleLoginOut()
          break
        case MenuEvents.AccountCenter:
          go('/account/center')
          break
        case MenuEvents.AccountSetting:
          go('/account/setting')
          break
      }
    }

    function renderIcon(option: DropdownOption) {
      return <i class={`${option.iconName} z-1 text-4`} />
    }

    return () => {
      return (
          <NDropdown
            options={dropMenuList}
            trigger="click"
            onSelect={handleMenuClick}
            render-label={({ label }) => label}
            render-icon={renderIcon}
            width="trigger"
          >
            <div class="app-layout-header-anction-icon">
              <NAvatar
                class="mr-3"
                src={getUserInfo.value.avatar}
                objectFit="cover"
                round
                size={24}
              />
              <span class="text-14px text-$text-color">{getUserInfo.value.realName}</span>
            </div>
          </NDropdown>
      )
    }
  },
})
</script>
