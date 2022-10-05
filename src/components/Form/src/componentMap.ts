import type { Component } from 'vue'
import {
  NAutoComplete,
  NCascader,
  NColorPicker,
  NDatePicker,
  NDivider,
  NDynamicInput,
  NInput,
  NInputGroup,
  NInputGroupLabel,
  NInputNumber,
  NRate,
  NSelect,
  NSlider,
  NSwitch,
  NTimePicker,
  NTransfer,
  NTreeSelect,
  NUpload,
} from 'naive-ui'
import type { ComponentType } from './types/index'

/**
 * Component list, register here to setting it in the form
 */

// import CountdownInput from '/@/components/CountDown/CountdownInput.vue';

const componentMap = new Map<ComponentType, Component>()

componentMap.set('NInput', NInput)
componentMap.set('NDynamicInput', NDynamicInput)
componentMap.set('NInputGroup', NInputGroup)
componentMap.set('NInputGroupLabel', NInputGroupLabel)
componentMap.set('NInputNumber', NInputNumber)
componentMap.set('NAutoComplete', NAutoComplete)

componentMap.set('NSelect', NSelect)
componentMap.set('NSwitch', NSwitch)
componentMap.set('NCascader', NCascader)
componentMap.set('NSlider', NSlider)
componentMap.set('NRate', NRate)
componentMap.set('NTransfer', NTransfer)
componentMap.set('NTreeSelect', NTreeSelect)

componentMap.set('NDatePicker', NDatePicker)
componentMap.set('NTimePicker', NTimePicker)
componentMap.set('NColorPicker', NColorPicker)
// componentMap.set('InputCountDown', CountdownInput);

componentMap.set('NUpload', NUpload)
componentMap.set('NDivider', NDivider)

export function add(compName: ComponentType, component: Component) {
  componentMap.set(compName, component)
}

export function del(compName: ComponentType) {
  componentMap.delete(compName)
}

export { componentMap }
