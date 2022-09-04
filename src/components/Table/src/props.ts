import type { PropType } from 'vue';
import { propTypes } from '/@/utils/propTypes';
import { dataTableProps } from 'naive-ui';
import { BasicColumn } from './types/table';
// import { NDataTable } from 'naive-ui';

export const props = {
  ...dataTableProps,
  title: {
    type: String,
    default: null,
  },
  titleTooltip: {
    type: String,
    default: null,
  },
  size: {
    type: String,
    default: 'medium',
  },
  tableData: {
    type: [Object],
    default: () => [],
  },
  columns: {
    type: [Array] as PropType<BasicColumn[]>,
    default: () => [],
    required: true,
  },
  request: {
    type: Function as PropType<(...arg: any[]) => Promise<any>>,
    default: null,
  },
  rowKey: {
    type: [String, Function] as PropType<string | ((record) => string)>,
    default: undefined,
  },
  pagination: {
    type: [Object, Boolean],
    default: () => {},
  },
  actionColumn: {
    type: Object as PropType<BasicColumn>,
    default: null,
  },
  showAdvanced: propTypes.bool.def(true),
  canResize: propTypes.bool.def(true),
  resizeHeightOffset: propTypes.number.def(0),
};
