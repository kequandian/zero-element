import { useContext } from 'react';
import { useModel } from '@/Model';
import PageContext from '@/context/PageContext';
import useShare from '@/utils/hooks/useShare';

export default function useBaseSearch({
  namespace, modelPath = 'searchData'
}, config) {

  const { share } = config;
  const [shareData] = useShare({
    share,
  });
  const [modelStatus, dispatch] = useModel({
    namespace,
    type: 'useBaseSearch',
  });
  const context = useContext(PageContext);

  const searchData = modelStatus[modelPath] || {};

  function onSearch(options) {
    const { onGetList } = shareData;
    if (onGetList) {
      onGetList(options);
    } else {
      console.warn(`请在 conifg 中使用 share 来绑定需要刷新的 Table`);
    }
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
    handle: {
      onSearch,
      onClearSearch,
    }
  }
}