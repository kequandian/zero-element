import React, { useState } from 'react';
import { InputNumber } from 'antd';
import { saveToItems } from '../../utils';

export default function valueTypeInputNumber(props) {
  const { data, field, options } = props;
  const { text = '/', index } = data;

  function handleChange(value) {
    saveToItems(value, props);
  }
  const value = parseInt(text, 10);

  if (isNaN(value)) {
    return text;
  }

  return <InputNumber
    value={value}
    onChange={handleChange}
  />;
}