import React from 'react';
import * as valueTypeSet from './valueType';

const valueTypeMap = {
  ...valueTypeSet,
  'defaults': RenderUndefined,
}

export function valueTypeRender(type, config) {
  if (!type) return undefined;
  const MatchComponent = valueTypeMap[type] || valueTypeMap['defaults'];
  return (text, record, index) => <MatchComponent
    {...config}
    data={{
      text,
      record,
      index,
      type,
    }}
  />;
}
function RenderUndefined({ data: { text = '', type } }) {
  console.warn(`未定义的 valueType 类型: ${type}`);
  return text;
}