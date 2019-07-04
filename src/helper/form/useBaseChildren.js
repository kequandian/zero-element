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
  itemsPath = 'items'
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

  function onCreate(data) {
    itemsData.push({
      ...data,
      '_id': idRef.current++,
    });
    dispatch({
      type: 'save',
      payload: {
        ...modelStatus,
        [modelPath]: {
          [itemsPath]: itemsData,
        },
      }
    });
  }

  function onRemoveChild({ record, options = {} }) {

    const temp = itemsData.filter(item => {
      if (item._id !== undefined) {
        return item._id !== record._id;
      }
      return item.id !== record.id;
    });

    dispatch({
      type: 'saveData',
      payload: {
        key: modelPath,
        data: {
          [itemsPath]: temp,
        },
      }
    });
  }

  return {
    config,
    data: itemsData,
    modelStatus,
    context,
    handle: {
      onGetList,
      onCreate,
      onRemoveChild,
    }
  }
}