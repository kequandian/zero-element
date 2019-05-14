import { useModel } from '@/Model';
import useAPI from '@/utils/hooks/useAPI';
import { get } from 'zero-element-global/lib/APIConfig';
import { useDataPool } from '@/DataPool';

export default function useBaseList({ namespace, modelPath = 'listData' }, config) {
  const { API = {} } = config;
  const [modelStatus, dispatch] = useModel({
    namespace,
  });
  const [, { setRecord }] = useDataPool({ namespace });

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
    setRecord(record);
    const api = formatAPI.deleteAPI;

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
    onGetList,
    onRefresh,
    onDelete,
  }
}