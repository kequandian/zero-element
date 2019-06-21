import React, { useReducer } from 'react';
import PageContext from '@/context/PageContext';
import { useWillUnmount } from '@/utils/hooks/lifeCycle';
import reducer from './reducer';
import { destroyDataPool } from '@/DataPool';
import Reader from '@/Reader';

const { Provider } = PageContext;

export default function ZEle(props) {
  const { namespace, destroy = {} } = props;
  const [pageState] = useReducer(reducer, {
    namespace,
  });

  useWillUnmount(() => {
    let destroyObj = destroy;
    if (destroy && destroy === true) {
      destroyObj = {
        dataPool: true,
      };
    }
    destroyObj.dataPool ? destroyDataPool(namespace) : void 0;
  });
  return <Provider value={pageState}>
    <Reader
      {...props}
    />
  </Provider>
}