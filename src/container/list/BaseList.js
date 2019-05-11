import React, { useEffect } from 'react';
import baseList from '@/helper/list/baseList';
import Table from '@/components/Table';

export default function BaseList(props) {
  const { namespace } = props;
  const listProps = baseList(namespace);
  const { getList } = listProps;
  useEffect(_ => {
    getList();
  }, []);
  console.log(111, props, listProps);
  return <Table {...listProps} />
}