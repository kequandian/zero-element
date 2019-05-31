import React, { useReducer } from 'react';
import PageContext from '@/context/PageContext';
import { useWillMount, useDidMount, useWillUnmount } from '@/utils/hooks/lifeCycle';
import reducer from './reducer';
import { destroyDataPool } from '@/DataPool';
import Reader from '@/Reader';
import { initExtra, getExtra, destroyExtra } from '@/utils/extraManage';

const { Provider } = PageContext;

export default function ZEle(props) {
  const { namespace } = props;
  const [pageState, dispatch] = useReducer(reducer, {
    namespace,
    extra: {},
  });

  useWillMount(_ => {
    initExtra(namespace, dispatch);
  });
  useWillUnmount(() => {
    destroyDataPool(namespace);
    destroyExtra(namespace);
  });

  return <Provider value={pageState}>
    <Reader
      {...props}
    />
    <div>
      {pageState.extra.modal}
    </div>
  </Provider>
}