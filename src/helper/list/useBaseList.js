import { useRef, useEffect } from 'react';
import { useModel } from '@/Model';
import { formatAPI } from '@/utils/format';
import { get } from '@/config/APIConfig';
import { PromiseAPI } from '@/utils/PromiseGen';
import { useWillMount, useWillUnmount } from '@/utils/hooks/lifeCycle';

export default function useBaseList({
  namespace,
  extraData
}, config) {

  const { API = {} } = config;

  const model = useModel({
    namespace,
    type: 'useBaseList',
  });

  const listData = model.listData;
  const { current, pageSize, records } = listData;

  const fAPI = useRef();
  fAPI.current = formatAPI(API, {
    namespace,
    data: extraData,
  });
  const loading = model.loading;

  useWillMount(_ => {
    if (model) {
      model.setPageData('onGetList', onGetList);
    }
  });

  useEffect(_ => {
    const { current, pageSize } = listData;
    model.setPageData('current', current);
    model.setPageData('pageSize', pageSize);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listData]);

  useWillUnmount(() => {
    model.setPageData('onGetList', undefined);
    model.setPageData('current', undefined);
    model.setPageData('pageSize', undefined);
  });

  function onGetList({
    current = get('DEFAULT_current'),
    pageSize = get('DEFAULT_pageSize'),
    queryData = {},
    sorter = {},
  }) {
    const { queryData: qD } = model._pageData;
    const { field, order } = sorter;
    const payload = {
      ...qD,
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

    const api = fAPI.current.listAPI;
    return PromiseAPI(api, () => (
      model.fetchList({
        // API: api,
        API: API.listAPI,
        payload: payload,
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
      model.deleteOne({
        // API: api,
        API: API.deleteAPI,
      })
        .then(({ code }) => {
          if (code === 200) {
            onRefresh();
          }
        });
    }
  }

  function onClearList() {
    return model.listData = {
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