import { useContext, useRef } from 'react';
import { useModel, getModel } from '@/Model';
import { formatAPI } from '@/utils/format';
import { get } from 'zero-element-global/lib/APIConfig';
import PageContext from '@/context/PageContext';
import { useWillMount, useWillUnmount } from '@/utils/hooks/lifeCycle';
import useShare from '@/utils/hooks/useShare';

export default function useBaseChildren({
  namespace,
  modelPath = 'formData',
  itemsPath = 'items',
  extraData,
}, config) {

  const { API = {}, share } = config;
  const idRef = useRef(0);
  const [, setShare, destroyShare] = useShare({
    share,
  });

  const model = getModel(namespace);
  const modelStatus = model.state;
  const [, dispatch] = useModel({
    namespace,
    type: 'useBaseChildren',
  });
  const context = useContext(PageContext);

  const formData = modelStatus[modelPath];

  const itemsData = formData[itemsPath] || [];

  const fAPI = formatAPI(API, {
    namespace,
    data: extraData,
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
    console.warn('TODO', api);
  }

  /**
   * 添加单个子项
   * @param {object} data 
   */
  function onCreate(data) {
    if (Object.keys(data).length === 0) return false;
    itemsData.push({
      ...data,
      '_id': idRef.current++,
    });
    dispatch({
      type: 'save',
      payload: {
        [modelPath]: {
          ...formData,
          [itemsPath]: itemsData,
        },
      }
    });
  }
  /**
   * 添加多个子项
   * @param {array} data 
   */
  function onCreateList(data) {
    if (!Array.isArray(data)) return false;
    itemsData.push(...data);
    dispatch({
      type: 'save',
      payload: {
        [modelPath]: {
          ...formData,
          [itemsPath]: itemsData,
        },
      }
    });
  }
  function onEdit(index, data) {
    itemsData[index] = data;
    dispatch({
      type: 'save',
      payload: {
        [modelPath]: {
          ...formData,
          [itemsPath]: itemsData,
        },
      }
    });
  }

  // 是通过对原 Array 直接修改，故不能用 filter 等返回新 Array 的方式来实现
  function onRemoveChild({ record, options = {} }) {

    const index = itemsData.findIndex(item => {
      if (item._id !== undefined) {
        return item._id === record._id;
      }
      return item.id === record.id;
    });

    if (index > -1) {
      itemsData.splice(index, 1);
    }

    dispatch({
      type: 'save',
      payload: {
        [modelPath]: {
          ...formData,
          [itemsPath]: itemsData,
        },
      }
    });
  }

  return {
    config,
    data: itemsData,
    modelStatus,
    context,
    dispatch,
    handle: {
      onGetList,
      onCreate,
      onCreateList,
      onEdit,
      onRemoveChild,
    }
  }
}