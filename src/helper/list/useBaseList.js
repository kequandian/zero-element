import { useModel } from '@/Model';
import { formatAPI } from '@/utils/format';
import { get } from 'zero-element-global/lib/APIConfig';
import { getDataPool } from '@/DataPool';

export default function useBaseList({ namespace, modelPath = 'listData' }, config) {
  const { API = {} } = config;
  const [modelStatus, dispatch] = useModel({
    namespace,
  });
  const dataPool = getDataPool(namespace);

  const listData = modelStatus[modelPath];
  const { current, pageSize, records = [] } = listData;
  const fAPI = formatAPI(API, {
    namespace,
  });

  function onGetList({
    current = get('DEFAULT_current'),
    pageSize = get('DEFAULT_pageSize'),
    queryData = {}
  }) {
    const api = fAPI.listAPI;
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
    // dataPool.setRecord(record); 应该由 handleAction 的上一层调用
    const api = fAPI.deleteAPI;

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