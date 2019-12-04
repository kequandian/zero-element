import { useContext, useRef, useEffect } from 'react';
import { useModel } from '@/Model';
import { formatAPI } from '@/utils/format';
import { get } from 'zero-element-global/lib/APIConfig';
import { PromiseAPI } from '@/utils/PromiseGen';
import PageContext from '@/context/PageContext';
import { useWillMount, useWillUnmount } from '@/utils/hooks/lifeCycle';
import useShare from '@/utils/hooks/useShare';

export default function useBaseList({
  namespace, modelPath = 'listData',
  extraData
}, config) {

  const { API = {}, share } = config;
  const [shareData, setShare, destroyShare] = useShare({
    share,
  });

  const [modelStatus, dispatch] = useModel({
    namespace,
    type: 'useBaseList',
  });
  const context = useContext(PageContext);

  const listData = modelStatus[modelPath];
  const { current, pageSize, records } = listData;

  const fAPI = useRef();
  fAPI.current = formatAPI(API, {
    namespace,
    data: extraData,
  });
  const loading = modelStatus.load.effects['fetchList'] || false;

  useWillMount(_ => {
    if (share) {
      setShare({
        onGetList,
      });
    }
  });

  useEffect(_ => {
    if (share) {
      const { current, pageSize } = listData;
      setShare({
        current,
        pageSize,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [share, listData]);

  useWillUnmount(() => destroyShare('onGetList'));

  function onGetList({
    current = get('DEFAULT_current'),
    pageSize = get('DEFAULT_pageSize'),
    queryData = {}
  }) {
    const { queryData: qD } = shareData;

    if (loading) {
      return Promise.reject();
    }

    const api = fAPI.current.listAPI;
    return PromiseAPI(api, () => (
      dispatch({
        type: 'fetchList',
        API: api,
        MODELPATH: modelPath,
        DIRECTRETURN: false,
        payload: {
          ...qD,
          ...queryData,
          [get('REQUEST_FIELD_current')]: current,
          [get('REQUEST_FIELD_pageSize')]: pageSize,
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
    const api = fAPI.current.deleteAPI;

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

  function onClearList() {
    return dispatch({
      type: 'save',
      payload: {
        [modelPath]: {},
      },
    });
  }

  return {
    loading,
    config,
    data: records,
    modelStatus,
    context,
    dispatch,
    handle: {
      onGetList,
      onRefresh,
      onDelete,
      onClearList,
    }
  }
}