import React from 'react';
import { Form, Button } from 'antd';
import * as LayoutSet from '../components/Layout';
import { BaseEnter } from '../components/Animation';

import { getFormItemType } from './getFormItemType';
import { Render } from '@/global/baseComponents';

const FormItem = Form.Item;
let extendsLayout = {};

export function getMainLayout(layoutName) {
  const layoutMap = {
    ...LayoutSet,
    ...extendsLayout,
  };

  if (layoutName === undefined) {
    return layoutMap['Grid'];
  }
  return layoutMap[layoutName] || function (layoutName) {
    console.warn(`未定义的 Layout: ${layoutName}`);
    return <div>未定义的 Layout: {String(layoutName)}</div>
  }.bind(null, layoutName);
}

export function getItem(itemConfig, index, props) {
  const { PREVENTRENDER = false, component, ...restConfig } = itemConfig;

  return <BaseEnter {...restConfig} key={index}>
    {PREVENTRENDER ? null : (<Render n={component} {...props} />)}
  </BaseEnter>
}

export function getFormItem(getFieldDecorator, field) {
  const {
    field: fieldName, label, value, extra = '', span,
    rules = [],
    type,
    ...rest } = field;
  return <FormItem
    key={fieldName}
    label={label === undefined ? fieldName : label}
    // hasFeedback={true}
    extra={extra}
    span={span}
  >
    {getFieldDecorator(fieldName, {
      initialValue: value,
      rules: [
        ...defaultRule(type),
        ...rules,
        // { required: true, message: '该项是必填的' }
      ],
      validateTrigger: 'onBlur',
    })(
      getFormItemType(type, rest)
    )}
  </FormItem>
}

function defaultRule(type) {
  const ruleMap = {
    'email': [{ type: 'email', message: '错误的邮箱格式。正确示例: abc@def.com' }],
    'phone': [{ pattern: /[0-9-()（）]{7,18}/, message: '错误的电话号码格式。应该由 7 到 18 位数字组成' }],
    'mobile': [{ pattern: /0?(13|14|15|17|18)[0-9]{9}/, message: '错误的手机号码格式' }],
  }
  return ruleMap[type] || [];
}

/**
 *
 * 对外暴露的方法，用于添加额外的 Layout 或者覆盖原有的 Layout
 * @export
 * @param {*} extendsObj
 */
export function setLayoutExtends(extendsObj) {
  extendsLayout = {
    ...extendsLayout,
    ...extendsObj,
  };
}