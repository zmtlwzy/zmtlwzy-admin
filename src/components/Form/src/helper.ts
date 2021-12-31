import type { FormItemRule } from 'naive-ui';
import { ComponentType } from './types/index';
/**
 * @description: 生成placeholder
 */
export function createPlaceholderMessage(component?: ComponentType) {
  if (!component) return '';

  if (
    ['NPicker', 'NSelect', 'NCheckbox', 'NRadio', 'NSwitch', 'NDatePicker', 'NTimePicker'].includes(
      component
    )
  ) {
    return '请选择';
  }
  return '请输入';
}

const DATE_TYPE = ['DatePicker', 'MonthPicker', 'WeekPicker', 'TimePicker'];

function genType() {
  return [...DATE_TYPE, 'RangePicker'];
}

export function setComponentRuleType(
  rule: FormItemRule,
  component: ComponentType,
  valueFormat = true
) {
  switch (component) {
    case 'NDatePicker':
    case 'NTimePicker':
      rule.type = valueFormat ? 'string' : 'object';
      break;
    case 'NUpload':
    case 'NCheckboxGroup':
    case 'NDateRangePicker':
      rule.type = 'array';
      break;
    case 'NInputNumber':
      rule.type = 'number';
      break;
  }
}

/**
 * 时间字段
 */
export const dateItemType = genType();

export function defaultType(component: ComponentType) {
  if (component === 'NInput') return '';
  if (component === 'NInputNumber') return null;
  return ['NSelect', 'NCheckbox', 'NRadio', 'NSwitch', 'NDatePicker', 'NTimePicker'].includes(
    component
  )
    ? ''
    : undefined;
}
