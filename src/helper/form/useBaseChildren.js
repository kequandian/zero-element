import { useRef } from 'react';
import { useModel } from '@/Model';
import { formatAPI } from '@/utils/format';
import { get } from '@/config/APIConfig';
import { useWillMount, useWillUnmount } from '@/utils/hooks/lifeCycle';

export default function useBaseChildren({
  namespace,
  itemsPath = 'items',
  extraData,
}, config) {

  const { API = {} } = config;
  const idRef = useRef(0);

  const model = useModel({
    namespace,
    type: 'useBaseChildren',
  });

  const formData = model.formData;

  const itemsData = formData[itemsPath] || [];

  const fAPI = formatAPI(API, {
    namespace,
    data: extraData,
  });

  useWillMount(_ => {
    model.setPageData('onGetChildrenList', onGetList);
  });
  useWillUnmount(() => {
    model.setPageData('onGetChildrenList', undefined);
  });

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
    model.save('formData', {
      ...formData,
      [itemsPath]: itemsData,
    });
  }
  /**
   * 添加多个子项
   * @param {array} data 
   */
  function onCreateList(data) {
    if (!Array.isArray(data)) return false;
    itemsData.push(...data);
    model.save('formData', {
      ...formData,
      [itemsPath]: itemsData,
    });
  }
  function onEdit(index, data) {
    itemsData[index] = data;
    model.save('formData', {
      ...formData,
      [itemsPath]: itemsData,
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

    model.save('formData', {
      ...formData,
      [itemsPath]: itemsData,
    });
  }

  return {
    config,
    data: itemsData,
    model,
    handle: {
      onGetList,
      onCreate,
      onCreateList,
      onEdit,
      onRemoveChild,
    }
  }
}