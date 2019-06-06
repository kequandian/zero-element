import { useContext, useRef } from 'react';
import { useModel } from '@/Model';
import { formatAPI } from '@/utils/format';
import { get } from 'zero-element-global/lib/APIConfig';
import PageContext from '@/context/PageContext';
import { useWillMount, useWillUnmount } from '@/utils/hooks/lifeCycle';
import useShare from '@/utils/hooks/useShare';

export default function useBaseChildren({
  namespace,
  modelPath = 'formData',
  itemsPath = 'items',
  symbol = `useBaseChildren_${modelPath}_${itemsPath}`
}, config) {

  const { API = {}, share } = config;
  const symbolRef = useRef(Symbol('useBaseChildren'));
  const idRef = useRef(0);
  const [, setShare, destroyShare] = useShare({
    share,
    symbol: symbolRef.current,
  });

  const [modelStatus, dispatch] = useModel({
    namespace,
    type: 'useBaseChildren',
    symbol,
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
      }
    });
  }

  function onDelete({ data, options = {} }) {
    dispatch({
      type: 'save',
      payload: {
        ...modelStatus,
        [modelPath]: {
          ...formData,
          [itemsPath]: itemsData.filter(item => {
            if(item.id !== undefined) {
              return item.id !== data.id;
            }
            return item._id !== data._id;
          }),
        }
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
      onDelete,
    }
  }
}