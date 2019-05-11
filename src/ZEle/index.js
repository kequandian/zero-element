import React from 'react';
import { useModel } from '@/Model';
import { useDidMount } from '@/utils/hooks/lifeCycle';
import Reader from '@/Reader';


export default function ZEle(props) {
  const [modelStatus, dispatch] = useModel(props);

  // const pageItemProps = {
  //   onChangePageTitle: handleChangePageTitle,
  // }

  return <div>
    <Reader
      {...props}
    />
  </div>
}