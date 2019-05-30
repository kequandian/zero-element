import { useModel } from '@/Model';
import useAPI from '@/utils/hooks/useAPI';
import { get } from 'zero-element-global/lib/APIConfig';
import { getDataPool } from '@/DataPool';

import replaceKey from '@/utils/replaceKey';

export default function useBaseList({ namespace, modelPath = 'listData' }, config) {
  const { API = {} } = config;
  const [modelStatus, dispatch] = useModel({
    namespace,
  });
  const dataPool = getDataPool(namespace);

  const listData = modelStatus[modelPath];
  const { current, pageSize, records = [] } = listData;
  const formatAPI = useAPI(API, {
    namespace,
  });

  function onGetList({
    current = get('DEFAULT_current'),
    pageSize = get('DEFAULT_pageSize'),
    queryData = {}
  }) {
    const api = formatAPI.listAPI;
    if (api) {
      dispatch({
        type: 'fetchList',
        API: api,
        MODELPATH: modelPath,
        DIRECTRETURN: false,
        payload: {
          ...queryData,
          current,
          pageSize,
        },
      });
    }
  }

  function onRefresh() {
    onGetList({
      current,
      pageSize,
    });
  }

  function onDelete({ record, options = {} }) {
    dataPool.setRecord(record);
    // const api = formatAPI.deleteAPI;
    const a = replaceKey({
      modelStatus,
      dataPool,
    });
    const api = a.format(API.deleteAPI)

    if (api) {
      dispatch({
        type: 'deleteOne',
        API: api,
        MODELPATH: modelPath,
      }).then(({ code }) => {
        if (code === 200) {
          onRefresh();
        }
      });
    }
  }

  return {
    config,
    data: records,
    modelStatus,
    handle: {
      onGetList,
      onRefresh,
      onDelete,
    }
  }
}