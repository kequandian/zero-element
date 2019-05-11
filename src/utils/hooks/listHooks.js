import queryString from 'query-string';
import modelHooks from './modelHooks';
import { query, post, update, remove } from '../request';
import { getPageContext } from '../../components/EventProxy/PageContext';
import { message as AntdMessage } from 'antd';

const methodMap = {
  get: query,
  post: post,
  put: update,
  delete: remove,
};

export default function listHooks(props, options = {}) {
  const { modelStatus = {}, requester, dataPool, history } = props;
  const { searchData = {} } = modelStatus;
  const { modelPath } = options;
  const hooks = modelHooks(props, {
    modelPath,
  });
  const { onListRefresh, onModal } = getPageContext();

  function onGetListData({ current, pageSize }, queryData = {}, options = {}) {
    const listData = hooks.getSelfModelStatus();
    const { pageSize: listDataPageSize = 10 } = listData;
    return hooks.fetch('fetchList', {
      payload: {
        current,
        pageSize: pageSize ? pageSize : listDataPageSize,
        ...searchData,
        ...queryData,
      },
      ...options,
    });
  }
  function onTableChange(current, pageSize) {
    onGetListData({
      current,
      pageSize
    });
  }
  function onTableRefresh() {
    const listData = hooks.getSelfModelStatus();
    const { current = 1, pageSize = 10 } = listData;
    onGetListData({
      current,
      pageSize
    });
  }
  function onPath({ record, options = {} }) {
    const { path, queryData = 'id' } = options;
    if (history && path) {
      const queryObj = getSearchObject(queryData, record);
      const searchString = {};
      Object.keys(queryObj).forEach(key => {
        searchString[key] = record[queryObj[key]] || queryObj[key];
      });
      history.push({
        pathname: path,
        search: queryString.stringify(searchString),
      });
    }
  }
  function getSearchObject(queryData, record) {
    if (typeof queryData === 'string') {
      return {
        id: queryData,
      };
    } else if (typeof queryData === 'object') {
      return queryData;
    }
    else if (typeof queryData === 'function') {
      return queryData(record);
    }
    console.error('传入的 queryData 非预期');
    return {};
  }
  function onDelete({ record, options = {} }) {
    dataPool.registerToRecord(record);
    const request = hooks.fetch('deleteOne', {});
    request.then(({ code }) => {
      if (code === 200) {
        // AntdMessage.success('删除成功'); // 在 model 里面有提示
        if (onListRefresh) {
          onListRefresh();
        }
      }
    });
  }
  function onSwitch({ record, options = {} }) {
    const { method, API, message = '操作成功' } = options;

    dataPool.registerToRecord(record);
    const matchMethod = methodMap[method] || methodMap['put'];
    const request = matchMethod(requester.formatAPI(API));
    request.then(({ code }) => {
      if (code === 200) {
        message && AntdMessage.success(message);
        if (onListRefresh) {
          onListRefresh(); // 使用注册进来的刷新方法
        }
      }
    });
  }
  function handleModal({ options = {} }) {
    onModal({ options });
  }
  function handleSaveSelectedRows(selectedRowKeys, selectedRows) {
    const data = hooks.getSelfModelStatus();
    hooks.save({
      payload: {
        [modelPath]: {
          ...data,
          selectedRowKeys,
          selectedRows,
        },
      }
    });
  }
  function onRequest({ record, options = {} }) {
    const { method, API, message = '操作成功' } = options;

    dataPool.registerToRecord(record);
    const matchMethod = methodMap[method] || methodMap['get'];
    const request = matchMethod(requester.formatAPI(API));
    request.then(({ code }) => {
      if (code === 200) {
        message && AntdMessage.success(message);
        if (onListRefresh) {
          onListRefresh(); // 使用注册进来的刷新方法
        }
      }
    });
  }

  return {
    getSelfModelStatus: hooks.getSelfModelStatus,
    setSelfModelStatus: hooks.setSelfModelStatus,
    save: hooks.save,

    onGetListData,
    onTableChange,
    onTableRefresh,
    onSaveSelectedRows: handleSaveSelectedRows,

    onPath,
    onDelete,
    onSwitch,
    onModal: handleModal,
    onRequest,
  }
}