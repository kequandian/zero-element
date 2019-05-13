import React, { useEffect } from 'react';
import baseList from '@/helper/list/baseList';
import Table from '@/components/Table';

export default function BaseList(props) {
  const { namespace, config } = props;
  const listProps = baseList({
    namespace,
    modelPath: 'listData',
  }, config);

  const { getList } = listProps;
  useEffect(_ => {
    getList();
  }, []);
  
  return <Table {...listProps} />
}