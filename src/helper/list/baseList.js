import { useModel } from '@/Model';

import { set } from '@/utils/request/endpoint';

export default function (namespace) {
  const [modelStatus, dispatch] = useModel({
    namespace,
  });
  const { listData = {} } = modelStatus;
  const { records = [] } = listData;
  function getList() {
    set('http://127.0.0.1:8080');
    dispatch({
      type: 'fetchList',
      API: '/api/generate/sql',
    });
  }
  return {
    data: records,
    modelStatus,
    getList,
  }
}