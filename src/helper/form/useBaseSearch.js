import { useContext } from 'react';
import { useModel } from '@/Model';
import PageContext from '@/context/PageContext';
import useShare from '@/utils/hooks/useShare';
import { useWillUnmount } from '@/utils/hooks/lifeCycle';

export default function useBaseSearch({
  namespace, modelPath = 'searchData'
}, config) {

  const { share } = config;
  const [shareData, setShare, destroyShare] = useShare({
    share,
  });
  const [modelStatus, dispatch] = useModel({
    namespace,
    type: 'useBaseSearch',
  });
  const context = useContext(PageContext);

  useWillUnmount(() => destroyShare('queryData'));

  const searchData = modelStatus[modelPath] || {};

  function onSearch(queryData) {
    const { current, pageSize, onGetList } = shareData;
    if (onGetList) {
      onGetList({
        current,
        pageSize,
        queryData,
      });
    } else {
      console.warn(`请在 conifg 中使用 share 来绑定需要刷新的 Table`);
    }

    onSetSearchData(queryData);
  }

  function onSetSearchData(queryData = {}) {
    setShare({
      queryData: queryData || {},
    });
  }

  function onClearSearch() {
    return dispatch({
      type: 'save',
      payload: {
        [modelPath]: {},
      },
    });
  }

  return {
    loading: modelStatus.load.effects['fetchList'] || false,
    config,
    data: searchData,
    modelStatus,
    context,
    dispatch,
    handle: {
      onSearch,
      onSetSearchData,
      onClearSearch,
    }
  }
}