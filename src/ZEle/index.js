import React, { useReducer } from 'react';
import PageContext from '@/context/PageContext';
import { useWillMount, useDidMount, useWillUnmount } from '@/utils/hooks/lifeCycle';
import reducer from './reducer';
import { destroyDataPool } from '@/DataPool';
import Reader from '@/Reader';
import { initExtra, getExtra, destroyExtra } from '@/utils/extraManage';

const { Provider } = PageContext;

export default function ZEle(props) {
  const { namespace, destroy = {} } = props;
  const [pageState, dispatch] = useReducer(reducer, {
    namespace,
    extra: {},
    extraState: {},
  });

  useWillMount(_ => {
    initExtra(namespace, dispatch);
  });
  useWillUnmount(() => {
    let destroyObj = destroy;
    if (destroy && destroy === true) {
      destroyObj = {
        dataPool: true,
        extra: true,
      };
    }
    destroyObj.dataPool ? destroyDataPool(namespace) : void 0;
    destroyObj.extra ? destroyExtra(namespace) : void 0;
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