<template>
  <n-form v-bind="getBindValue" ref="formElRef" :model="formModel" class="mt-2">
    <n-grid v-bind="getGrid">
      <template v-for="schema in getSchema" :key="schema.field">
        <n-gi v-if="getShow(schema)" v-bind="getGridItem(schema)">
          <n-form-item
            :label="schema.label"
            :path="getFormItemPath(schema.field)"
            v-bind="schema.formItemProps"
          >
            <!--标签名右侧温馨提示-->
            <template v-if="schema.subLabel || schema.labelMessage" #label>
              {{ schema.label }}
              <n-text v-if="schema.subLabel" :depth="3" class="mr-2">{{ schema.subLabel }}</n-text>
              <n-tooltip
                v-if="schema.labelMessage"
                trigger="hover"
                :style="schema.labelMessageStyle"
              >
                <template #trigger>
                  <i-ant-design-question-circle-outlined
                    class="text-18px cursor-pointer text-$app-text-color-3"
                  />
                </template>
                {{ schema.labelMessage }}
              </n-tooltip>
            </template>

            <!--判断插槽-->
            <template v-if="schema.slot">
              <slot
                :name="schema.slot"
                :model="formModel"
                :field="schema.field"
                :value="get(formModel, schema.field)"
              ></slot>
            </template>

            <!--NCheckbox-->
            <template v-else-if="schema.component === 'NCheckbox'">
              <n-checkbox-group v-model:value="formModel[schema.field as string]">
                <n-space>
                  <n-checkbox
                    v-for="item in schema?.componentProps?.options"
                    :key="item.value"
                    :value="item.value"
                    :label="item.label"
                  />
                </n-space>
              </n-checkbox-group>
            </template>

            <!--NRadioGroup-->
            <template v-else-if="schema.component === 'NRadioGroup'">
              <n-radio-group v-model:value="formModel[schema.field as string]">
                <n-space v-bind="schema?.componentProps?.spaceProps">
                  <n-radio
                    v-for="item in schema?.componentProps?.options"
                    :key="item.value"
                    :value="item.value"
                    >{{ item.label }}</n-radio
                  >
                </n-space>
              </n-radio-group>
            </template>

            <!--NRadioButtonGroup-->
            <template v-else-if="schema.component === 'NRadioButtonGroup'">
              <n-radio-group v-model:value="formModel[schema.field as string]">
                <n-radio-button
                  v-for="item in schema?.componentProps?.options"
                  :key="item.value"
                  :value="item.value"
                  >{{ item.label }}</n-radio-button
                >
              </n-radio-group>
            </template>

            <!--NInputGroup-->
            <template v-else-if="schema.component === 'NInputGroup'">
              <n-input-group>
                <template v-for="item in schema.childrens" :key="item.filed">
                  <component
                    v-bind="getComponentProps(item)"
                    :is="getComp(item)"
                    :value="get(formModel, item.field ?? schema.field)"
                    @update:value="set(formModel, item.field ?? schema.field, $event)"
                    :class="{
                      isFull: (item.isFull ?? schema.isFull) != false && getProps.isFull,
                    }"
                  >
                    {{ item?.defaultSlot }}
                  </component>
                </template>
              </n-input-group>
            </template>

            <!--动态渲染表单组件-->
            <component
              v-else
              v-bind="getComponentProps(schema)"
              :is="getComp(schema)"
              :value="get(formModel, schema.field)"
              @update:value="set(formModel, schema.field, $event)"
              :class="{ isFull: schema.isFull != false && getProps.isFull }"
            />

            <!--组件后面的内容-->
            <template v-if="schema.suffix">
              <slot
                :name="schema.suffix"
                :model="formModel"
                :field="schema.field"
                :value="get(formModel, schema.field)"
              ></slot>
            </template>
          </n-form-item>
        </n-gi>
      </template>
      <!--提交 重置 展开 收起 按钮-->
      <n-gi
        v-if="getProps.showActionButtonGroup"
        :span="isInline ? '' : 24"
        :suffix="isInline ? true : false"
        #="{ overflow }"
      >
        <n-space
          align="center"
          :justify="isInline ? 'end' : 'start'"
          :style="{
            'margin-left': `${isInline ? 12 : getProps.labelWidth}px`,
            'margin-bottom': '24px',
          }"
        >
          <n-button
            v-if="getProps.showSubmitButton"
            v-bind="getSubmitBtnOptions"
            @click="handleSubmit"
            >{{ getProps.submitButtonText ?? t('common.queryText') }}</n-button
          >
          <n-button
            v-if="getProps.showResetButton"
            v-bind="getResetBtnOptions"
            @click="resetFields"
            >{{ getProps.resetButtonText ?? t('common.resetText') }}</n-button
          >
          <n-button
            v-if="isInline && getProps.showAdvancedButton"
            type="primary"
            text
            icon-placement="right"
            @click="unfoldToggle"
          >
            <template #icon>
              <n-icon v-if="overflow" size="14" class="unfold-icon">
                <i-ant-design-down-outlined />
              </n-icon>
              <n-icon v-else size="14" class="unfold-icon">
                <i-ant-design-up-outlined />
              </n-icon>
            </template>
            {{ overflow ? '展开' : '收起' }}
          </n-button>
        </n-space>
      </n-gi>
    </n-grid>
  </n-form>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, computed, unref, onMounted, watch } from 'vue';
  import { asyncComputed } from '@vueuse/core';
  import type { Ref } from 'vue';
  import type { GridProps, FormItemRule, GridItemProps } from 'naive-ui';
  import { cloneDeep, set, get } from 'lodash-es';
  import { createPlaceholderMessage, setComponentRuleType } from './helper';
  import { useFormEvents } from './hooks/useFormEvents';
  import { useFormValues } from './hooks/useFormValues';
  import { basicProps } from './props';
  import type { FormSchema, FormProps, FormActionType } from './types/form';
  import { isBoolean, isNull, isArray, isString, isFunction } from '/@/utils/is';
  import { deepMerge } from '/@/utils';
  import { useI18n } from '/@/composables/web/useI18n';
  import { useBreakpoint } from '/@/composables/event/useBreakpoint';
  import { ComponentType } from './types';
  import { componentMap } from './componentMap';

  export default defineComponent({
    name: 'BasicForm',
    props: {
      ...basicProps,
    },
    emits: ['reset', 'submit', 'register'],
    setup(props, { emit, attrs }) {
      const { t } = useI18n();
      const { smaller, sizeEnum } = useBreakpoint();

      const defaultFormModel = ref<Recordable>({});
      const formModel = reactive<Recordable>({});
      // const formModel = ref<Recordable>({});
      const propsRef = ref<Partial<FormProps>>({});
      const schemaRef = ref<Nullable<FormSchema[]>>(null);
      const formElRef = ref<Nullable<FormActionType>>(null);
      const gridCollapsed = ref(false);
      const isUpdateDefaultRef = ref(false);
      const labelPlacementRef = asyncComputed(() => (smaller(sizeEnum.MD).value ? 'top' : 'left'));
      const getProps = computed((): FormProps => {
        const formProps = Object.assign({}, props, unref(propsRef));
        const rulesObj: any = {
          rules: {},
        };
        const schemas = formProps.schemas || [];
        schemas.forEach((item) => {
          const rules = handleRules(item);
          set(rulesObj.rules, item.field, rules);
        });
        return { ...formProps, ...unref(rulesObj) };
      });

      const getContext = computed(() => {
        const { schemas } = unref(getProps);
        return {
          schemas,
          model: unref(formModel),
        };
      });

      function getFormItemPath(field: FormSchema['field']) {
        if (isArray(field)) {
          return field.join('.');
        } else if (isString(field)) {
          return field;
        }
      }

      function getPlaceholderMessage(schema: FormSchema) {
        const { rulesMessageJoinLabel, label, component } = schema;
        const { rulesMessageJoinLabel: globalRulesMessageJoinLabel } = props;

        const joinLabel = Reflect.has(schema, 'rulesMessageJoinLabel')
          ? rulesMessageJoinLabel
          : globalRulesMessageJoinLabel;

        return `${createPlaceholderMessage(component)}${joinLabel ? label ?? '' : ''}`;
      }

      function getComp(schema: FormSchema) {
        const { component } = schema;
        let componentName: ComponentType;
        switch (component) {
          case 'NInputTextarea':
            componentName = 'NInput';
            break;
          case 'NInputPassword':
            componentName = 'NInput';
            break;
          case 'NDateRangePicker':
            componentName = 'NDatePicker';
            break;
          case 'NDatetimeRangePicker':
            componentName = 'NDatePicker';
            break;
          default:
            componentName = component!;
        }
        return componentMap.get(componentName);
      }

      function getComponentProps(schema: FormSchema) {
        const { component, componentProps } = schema;
        let preset: any = {};
        switch (component) {
          case null:
          case undefined:
            break;
          case 'NInputTextarea':
            preset = {
              type: 'textarea',
            };
            break;
          case 'NInputPassword':
            preset = {
              type: 'password',
            };
            break;
          case 'NDateRangePicker':
            preset = {
              type: 'daterange',
            };
            break;
          case 'NDatetimeRangePicker':
            preset = {
              type: 'datetimerange',
            };
            break;
        }

        const compProps = componentProps ?? {};
        return {
          clearable: true,
          placeholder: getPlaceholderMessage(schema),
          disabled: getDisabled(schema),

          ...preset,
          ...compProps,
        };
      }

      function getDisabled(schema: FormSchema): boolean {
        const { disabled } = schema;
        const { disabled: globalDisabled } = unref(getProps);

        return isFunction(disabled)
          ? disabled(getContext.value)
          : disabled ?? globalDisabled ?? false;
      }

      function getShow(schema: FormSchema): boolean {
        const { show = true } = schema;
        if (isFunction(show)) {
          return show(getContext.value);
        }
        return show;
      }

      const getResetBtnOptions = computed(() => {
        return Object.assign(
          {
            size: props.size,
            type: 'default',
          },
          propsRef.value.resetButtonOptions
        );
      });

      const getSubmitBtnOptions = computed(() => {
        return Object.assign(
          {
            size: props.size,
            type: 'primary',
          },
          propsRef.value.submitButtonOptions
        );
      });

      const isInline = computed(() => {
        return unref(getProps).inline;
      });

      const getGrid = computed((): GridProps => {
        const { gridProps } = unref(getProps);
        return {
          responsive: 'screen',
          collapsed: isInline.value ? gridCollapsed.value : false,
          cols: 1,
          ...gridProps,
        };
      });

      function getGridItem(schema: FormSchema): GridItemProps {
        const { giProps } = schema;
        const { giProps: globalGiProps } = unref(getProps);
        return {
          span: 1,
          ...globalGiProps,
          ...giProps,
        };
      }

      const getBindValue = computed(() => {
        const { labelPlacement, ...Props } = unref(getProps);
        return {
          ...attrs,
          ...props,
          ...Props,
          labelPlacement: labelPlacement ?? labelPlacementRef.value,
        } as Recordable;
      });

      const getSchema = computed((): FormSchema[] => {
        const schemas: FormSchema[] = unref(schemaRef) || (unref(getProps).schemas as any);
        for (const schema of schemas) {
          const { defaultValue } = schema;
          // handle date type
          // dateItemType.includes(component as string)
          if (defaultValue) {
            schema.defaultValue = defaultValue;
          }
        }
        return schemas as FormSchema[];
      });

      const { handleFormValues, initDefault } = useFormValues({
        defaultFormModel,
        getSchema,
        formModel,
      });

      const { handleSubmit, validate, resetFields, getFieldsValue, clearValidate, setFieldsValue } =
        useFormEvents({
          emit,
          getProps,
          formModel,
          getSchema,
          formElRef: formElRef as Ref<FormActionType>,
          defaultFormModel,
          handleFormValues,
        });

      function unfoldToggle() {
        gridCollapsed.value = !gridCollapsed.value;
      }

      async function setProps(formProps: Partial<FormProps>): Promise<void> {
        propsRef.value = deepMerge(unref(propsRef) || {}, formProps);
      }

      function handleRules(schema: FormSchema): FormItemRule[] {
        const {
          rules: defRules = [],
          show,
          required,
          component,
          // componentProps,
          // dynamicRules,
        } = schema;

        // if (isFunction(dynamicRules)) {
        //   return dynamicRules(unref(getValues)) as ValidationRule[];
        // }

        let rules = cloneDeep(defRules) as FormItemRule[];
        const defaultTrigger = ['blur', 'input'];
        const defaultMsg = getPlaceholderMessage(schema);

        function validator(rule: any, value: any) {
          const msg = rule.message || defaultMsg;
          if (value === undefined || isNull(value)) {
            // 空值
            return Promise.reject(msg);
          }
          if (Array.isArray(value) && value.length === 0) {
            // 数组类型
            return Promise.reject(msg);
          }
          if (typeof value === 'string' && value.trim() === '') {
            // 空字符串
            return Promise.reject(msg);
          }
          if (
            typeof value === 'object' &&
            Reflect.has(value, 'checked') &&
            Reflect.has(value, 'halfChecked') &&
            Array.isArray(value.checked) &&
            Array.isArray(value.halfChecked) &&
            value.checked.length === 0 &&
            value.halfChecked.length === 0
          ) {
            // 非关联选择的tree组件
            return Promise.reject(msg);
          }
          return Promise.resolve();
        }

        // const getRequired = isFunction(required) ? required(unref(getValues)) : required;

        if ((!rules || rules.length === 0) && required) {
          rules = [{ required, validator, trigger: defaultTrigger }];
        }

        const requiredRuleIndex: number = rules.findIndex(
          (rule) => Reflect.has(rule, 'required') && !Reflect.has(rule, 'validator')
        );

        if (requiredRuleIndex !== -1) {
          const rule = rules[requiredRuleIndex];
          if (isBoolean(show) && !show) {
            rule.required = false;
          }
          if (component) {
            if (!Reflect.has(rule, 'type')) {
              setComponentRuleType(rule, component);
            }

            rule.message = rule.message || defaultMsg;
            rule.trigger = defaultTrigger;

            if (component.includes('NInput')) {
              rule.whitespace = true;
            }
          }
        }

        // Maximum input length rule check
        const characterInx = rules.findIndex((val) => val.max);
        if (characterInx !== -1 && !rules[characterInx].validator) {
          rules[characterInx].message =
            rules[characterInx].message ||
            t('component.form.maxTip', [rules[characterInx].max] as Recordable);
        }
        return rules;
      }

      const formActionType: Partial<FormActionType> = {
        getFieldsValue,
        setFieldsValue,
        resetFields,
        validate,
        clearValidate,
        setProps,
        submit: handleSubmit,
      };

      watch(
        () => getSchema.value,
        (schema) => {
          if (unref(isUpdateDefaultRef)) {
            return;
          }
          if (schema?.length) {
            initDefault();
            isUpdateDefaultRef.value = true;
          }
        }
      );

      onMounted(() => {
        initDefault();
        emit('register', formActionType);
      });

      return {
        t,
        get,
        set,
        formElRef,
        formModel,
        getGrid,
        getGridItem,
        getProps,
        getShow,
        getFormItemPath,
        getBindValue,
        getSchema,
        getSubmitBtnOptions,
        getResetBtnOptions,
        handleSubmit,
        resetFields,
        isInline,
        getComponentProps,
        getComp,
        unfoldToggle,
        componentMap,
      };
    },
  });
</script>

<style lang="less" scoped>
  .isFull {
    width: 100%;
    justify-content: flex-start;
  }
  .unfold-icon {
    display: flex;
    align-items: center;
    height: 100%;
    margin-left: -3px;
  }
</style>
