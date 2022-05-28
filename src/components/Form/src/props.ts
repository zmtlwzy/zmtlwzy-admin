import type { StyleValue, PropType } from 'vue';
import { FormSchema } from './types/form';
import type { FormItemProps, ButtonProps, GridProps, GridItemProps } from 'naive-ui';
import { propTypes } from '/@/utils/propTypes';

export const basicProps = {
  disabled: propTypes.bool.def(false),
  // 简化 rules 配置，为 true 则转化成 [{required:true}]
  require: propTypes.bool.def(false),
  // 检验信息是否加上label的文本
  rulesMessageJoinLabel: propTypes.bool.def(true),
  // 标签宽度  固定宽度
  labelWidth: propTypes.stringNumber.def(80),
  // 表单配置规则
  schemas: {
    type: [Array] as PropType<FormSchema[]>,
    default: () => [],
  },
  // 是否展示为行内表单
  inline: propTypes.bool.def(false),
  // 大小
  size: propTypes.string.def('medium'),
  // 标签位置
  labelPlacement: propTypes.string,
  // 组件是否width 100%
  isFull: propTypes.bool.def(true),
  // 是否显示操作按钮（查询/重置）
  showActionButtonGroup: propTypes.bool.def(true),
  // 显示重置按钮
  showResetButton: propTypes.bool.def(true),
  // 重置按钮配置
  resetButtonOptions: Object as PropType<Partial<ButtonProps>>,
  // 显示确认按钮
  showSubmitButton: propTypes.bool.def(true),
  // 确认按钮配置
  submitButtonOptions: Object as PropType<Partial<ButtonProps>>,
  // 展开收起按钮
  showAdvancedButton: propTypes.bool.def(true),
  // 确认按钮文字
  submitButtonText: propTypes.string,
  // 重置按钮文字
  resetButtonText: propTypes.string,
  // grid 配置
  gridProps: Object as PropType<GridProps>,
  // gi配置
  giProps: Object as PropType<GridItemProps>,
  // formItem配置
  formItemProps: Object as PropType<FormItemProps>,
  // grid 样式
  baseGridStyle: Object as PropType<StyleValue>,
  // 是否折叠
  collapsed: propTypes.bool.def(false),
  // 默认展示的行数
  collapsedRows: propTypes.number.def(1),
};
