import React, { useState } from 'react';
import PageContext from '@/context/PageContext';
import { useWillMount, useDidMount, useWillUnmount } from '@/utils/hooks/lifeCycle';
import { removeDataPool } from '@/DataPool';
import Reader from '@/Reader';

const { Provider } = PageContext;

export default function ZEle(props) {
  const { namespace } = props;
  const [pageState, setPageState] = useState({
    namespace,
  });
  useWillUnmount(() => {
    removeDataPool(namespace);
  });

  return <Provider value={pageState}>
    <Reader
      {...props}
    />
  </Provider>
}