import { useModel, getPageData, setPageData } from '@/Model';
import { useWillUnmount } from '@/utils/hooks/lifeCycle';

export default function useBaseSearch({
  namespace
}, config) {

  const model = useModel({
    namespace,
    type: 'useBaseSearch',
  });

  useWillUnmount(() => {
    setPageData(namespace, 'queryData', {});
  });

  const searchData = model.searchData || {};

  function onSearch(queryData) {
    const { current, pageSize, onGetList } = getPageData(namespace);
    if (onGetList) {
      onGetList({
        current: 1,
        pageSize,
        queryData,
      });
    }

    onSetSearchData(queryData);
  }

  function onSetSearchData(queryData = {}) {
    setPageData(namespace, 'queryData', queryData);
  }

  function onClearSearch() {
    return model.searchData = {};
  }

  return {
    loading: model.loading,
    config,
    data: searchData,
    model,
    handle: {
      onSearch,
      onSetSearchData,
      onClearSearch,
    }
  }
}