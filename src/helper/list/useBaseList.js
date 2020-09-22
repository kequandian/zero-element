import { useModel, getPageData, setPageData, clearPageData } from '@/Model';
import { get } from '@/config/APIConfig';
import { useWillUnmount } from '@/utils/hooks/lifeCycle';

export default function useBaseList({
  namespace,
  extraData,
  dataPath = 'listData',
}, config) {

  const { API = {} } = config;

  const model = useModel({
    namespace,
    type: 'useBaseList',
  });

  const listData = model[dataPath];
  const { searchData } = model;
  const { current, pageSize, total, records } = listData || {};

  const loading = model.fetchList.loading;

  setPageData(namespace, 'onGetList', onGetList);
  setPageData(namespace, 'current', current);
  setPageData(namespace, 'pageSize', pageSize);
  setPageData(namespace, 'total', total);

  useWillUnmount(() => {
    clearPageData(namespace, 'onGetList', undefined);
    clearPageData(namespace, 'current', undefined);
    clearPageData(namespace, 'pageSize', undefined);
  });

  function onGetList({
    current = get('DEFAULT_current'),
    pageSize = get('DEFAULT_pageSize'),
    queryData = {},
    sorter = {},
  }) {
    const { searchData: searchPD } = getPageData(namespace) || {};
    const { field, order } = sorter;
    const payload = {
      ...searchPD,
      ...searchData,
      ...queryData,
      [get('REQUEST_FIELD_current')]: current,
      [get('REQUEST_FIELD_pageSize')]: pageSize,
    };

    if (field && order) {
      payload[get('REQUEST_FIELD_field')] = field;
      payload[get('REQUEST_FIELD_order')] = order === 'ascend' ?
        get('REQUEST_FIELD_ascend')
        : get('REQUEST_FIELD_descend');
    }

    if (loading) {
      return Promise.reject();
    }

    return model.fetchList({
      API: API.listAPI,
      extraData,
      payload: payload,
      dataPath,
    });
  }

  function onRefresh() {
    onGetList({
      current,
      pageSize,
    });
  }

  function onDelete({ record, options = {} }) {
    // dataPool.setRecord(record); 应该由 handleAction 的上一层调用
    if (API.deleteAPI) {
      model.deleteOne({
        API: API.deleteAPI,
        extraData,
      })
        .then(({ code }) => {
          if (code === 200) {
            onRefresh();
          }
        });
    }
  }

  function onClearList() {
    return model[dataPath] = {
      records: [],
    }
  }

  return {
    loading,
    config,
    data: records,
    model,
    handle: {
      onGetList,
      onRefresh,
      onDelete,
      onClearList,
    }
  }
}