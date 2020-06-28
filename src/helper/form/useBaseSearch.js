import { useModel } from '@/Model';
import { useWillUnmount } from '@/utils/hooks/lifeCycle';

export default function useBaseSearch({
  namespace
}, config) {

  const model = useModel({
    namespace,
    type: 'useBaseSearch',
  });

  useWillUnmount(() => {
    model.setPageData('queryData', {});
  });

  const searchData = model.searchData || {};

  function onSearch(queryData) {
    const { current, pageSize, onGetList } = model._pageData;
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
    model.setPageData('queryData', queryData);
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