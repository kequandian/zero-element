import { useContext } from 'react';
import { useModel } from '@/Model';
import { formatAPI } from '@/utils/format';
import { get } from 'zero-element-global/lib/APIConfig';
import { PromiseAPI } from '@/utils/PromiseGen';
import PageContext from '@/context/PageContext';
import { useWillMount, useWillUnmount } from '@/utils/hooks/lifeCycle';
import useShare from '@/utils/hooks/useShare';

export default function useBaseList({
  namespace, modelPath = 'listData'
}, config) {

  const { API = {}, share } = config;
  const [, setShare, destroyShare] = useShare({
    share,
  });

  const [modelStatus, dispatch] = useModel({
    namespace,
    type: 'useBaseList',
  });
  const context = useContext(PageContext);

  const listData = modelStatus[modelPath];
  const { current, pageSize, records = [] } = listData;
  const fAPI = formatAPI(API, {
    namespace,
  });

  useWillMount(_ => {
    if (share) {
      setShare({
        onGetList,
      });
    }
  });
  useWillUnmount(() => destroyShare('onGetList'));

  function onGetList({
    current = get('DEFAULT_current'),
    pageSize = get('DEFAULT_pageSize'),
    queryData = {}
  }) {
    const api = fAPI.listAPI;
    return PromiseAPI(api, () => (
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
      })
    )
    );
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
    loading: modelStatus.load.effects['fetchList'] || false,
    config,
    data: records,
    modelStatus,
    context,
    handle: {
      onGetList,
      onRefresh,
      onDelete,
    }
  }
}