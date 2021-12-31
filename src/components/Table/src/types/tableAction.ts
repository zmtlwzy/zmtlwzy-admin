import type { ButtonProps, DropdownOption } from 'naive-ui';
import { RoleEnum } from '/@/enums/roleEnum';

export interface ActionItem extends ButtonProps {
  onClick?: Fn;
  label?: string;
  color?: 'success' | 'error' | 'warning';
  icon?: string;
  popConfirm?: PopConfirm;
  disabled?: boolean;
  divider?: boolean;
  // 权限编码控制是否显示
  auth?: RoleEnum | RoleEnum[] | string | string[];
  // 业务控制是否显示
  ifShow?: boolean | ((action: ActionItem) => boolean);
}

export type dropDownActionItem = DropdownOption & {
  popConfirm?: PopConfirm;
  // 权限编码控制是否显示
  auth?: RoleEnum | RoleEnum[] | string | string[];
  // 业务控制是否显示
  ifShow?: boolean | ((action: dropDownActionItem) => boolean);
};

export interface PopConfirm {
  title: string;
  positiveText?: string;
  negativeText?: string;
  onPositiveClick: (e: MouseEvent) => Promise<boolean> | boolean | any;
  onNegativeClick?: (e: MouseEvent) => Promise<boolean> | boolean | any;
  icon?: string;
  showIcon?: boolean;
}
