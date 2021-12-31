export const SIDE_BAR_MINI_WIDTH = 48;
export const SIDE_BAR_SHOW_TIT_MINI_WIDTH = 80;

export enum ContentEnum {
  // auto width
  FULL = 'full',
  // fixed width
  FIXED = 'fixed',
}

// menu theme enum
export enum ThemeEnum {
  DARK = 'dark',
  LIGHT = 'light',
}

export enum ThemeStateEnum {
  DARK = 'dark',
  LIGHT = 'light',
  MENU_DARK = 'menuDark',
}

export enum SettingButtonPositionEnum {
  AUTO = 'auto',
  HEADER = 'header',
  FIXED = 'fixed',
}

export enum SessionTimeoutProcessingEnum {
  ROUTE_JUMP,
  PAGE_COVERAGE,
}

/**
 * 权限模式
 */
export enum PermissionModeEnum {
  // role
  ROLE = 'ROLE',
  // black
  BACK = 'BACK',
  // route mapping
  ROUTE_MAPPING = 'ROUTE_MAPPING',
}

//  Route switching animation
export enum RouterTransitionEnum {
  FADE = 'fade',
  FADE_SIDE_RIGHT = 'fade-slide-right',
  FADE_SIDE_LEFT = 'fade-slide-left',
  FADE_TOP = 'fade-top',
  FADE_BOTTOM = 'fade-bottom',
  FADE_SCALE = 'fade-scale',
  ZOOM_OUT = 'zoom-out',
  ZOOM_FADE = 'zoom-fade',
}
