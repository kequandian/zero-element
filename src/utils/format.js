import React from 'react';
import { ListOperation, ListFieldsEdit } from '../components/BaseElement';
import { valueTypeRender } from './valueTypeRender';

/**
 *
 * 统一 Table columns 的格式
 * @export
 * @param {array} fields 标准化的 fields
 * @param {array} operation 对该行的操作
 * @param {boolean} NOTREGISTER 不要把 record 注册到 dataPool
 * @returns antd Table columns
 */
export function formatTableFields(fields = [], operation = [], NOTREGISTER = false) {
  let operationCfg = {};
  const rst = fields.map((fieldCfg, i) => {
    const { field, label,
      valueType,
      render = valueTypeRender(valueType, fieldCfg),
      ...rest
    } = fieldCfg;

    if (field === 'operation') {
      operationCfg = fieldCfg;
      return {};
    }

    return {
      dataIndex: field,
      title: label,
      render,
      ...rest,
    };
  }).filter(fieldCfg => fieldCfg.dataIndex);

  if (operation.length > 0) {
    rst.push({
      dataIndex: 'operation',
      align: 'right',
      ...operationCfg, // fixed  width
      title: ListFieldsEdit,
      render: (text, record, index) => {
        if (record.loading) return null;
        return <ListOperation
          text={text}
          record={record}
          index={index}
          operation={operation}
          NOTREGISTER={NOTREGISTER}
        />;
      },
    });
  }
  return rst;
}