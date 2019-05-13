import React, { useEffect } from 'react';
import baseList from '@/helper/list/baseList';
import Table from '@/components/Table';

export default function BaseList(props) {
  const { namespace, config } = props;
  const listProps = baseList({
    namespace,
    modelPath: 'listData',
  }, config);

  const { onGetList, onDelete } = listProps;
  useEffect(_ => {
    onGetList({});
  }, []);

  return <Table {...listProps} />
}