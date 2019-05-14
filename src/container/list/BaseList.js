/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import useBaseList from '@/helper/list/useBaseList';
import Table from '@/components/Table';

export default function BaseList(props) {
  const { namespace, config } = props;
  const listProps = useBaseList({
    namespace,
    modelPath: 'listData',
  }, config);

  const { onGetList, onDelete } = listProps;
  useEffect(_ => {
    onGetList({});
  }, []);

  return <Table {...listProps} />
}