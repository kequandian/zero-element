import { useModel, getPageData, setPageData, clearPageData } from '@/Model';
import { useWillUnmount } from '@/utils/hooks/lifeCycle';

export default function useBaseSearch({
  namespace
}, config) {

  const model = useModel({
    namespace,
    type: 'useBaseSearch',
  });
  const { searchData } = model;

  useWillUnmount(() => {
    clearPageData(namespace, 'searchData');
  });

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
    setPageData(namespace, 'searchData', queryData);
  }

  function onClearSearch() {
    clearPageData(namespace, 'searchData');
    return model.save('searchData', {});
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