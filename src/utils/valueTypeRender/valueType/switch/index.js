import React, { useState } from 'react';
import { Switch } from 'antd';
import { saveToItems } from '../../utils';

export default function valueTypeSwitch(props) {
  const { data, field, options } = props;
  const { text, index } = data;

  function handleChange(value) {
    saveToItems(value, props);
  }

  return <Switch
    checked={text}
    onChange={handleChange}
  />;
}