import type { StyleValue, VNodeChild } from 'vue'
import type { VueTypeValidableDef, VueTypesInterface } from 'vue-types'
import { createTypes } from 'vue-types'

export type VueNode = VNodeChild | JSX.Element

type PropTypes = VueTypesInterface & {
  readonly style: VueTypeValidableDef<StyleValue>
  readonly VNodeChild: VueTypeValidableDef<VueNode>
  // readonly trueBool: VueTypeValidableDef<boolean>;
  readonly stringNumber: VueTypeValidableDef<string | number>
  readonly Date: VueTypeValidableDef<number | Date>
}

const propTypes = createTypes({
  func: undefined,
  bool: undefined,
  string: undefined,
  number: undefined,
  object: undefined,
  integer: undefined,
}) as PropTypes

propTypes.extend([
  {
    name: 'style',
    getter: true,
    type: [String, Object],
    default: undefined,
  },
  {
    name: 'stringNumber',
    getter: true,
    type: [String, Number],
    default: undefined,
  },
  {
    name: 'Date',
    getter: true,
    type: [Number, Date],
    default: undefined,
  },
  {
    name: 'VNodeChild',
    getter: true,
    type: undefined,
  },
])
export { propTypes }
