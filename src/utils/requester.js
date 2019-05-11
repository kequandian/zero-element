import replaceKey from './replaceKey';
import { getPageContext } from '../components/EventProxy/PageContext';

/**
 * 操作 model status 的工具
 *
 * @export
 * @param {object} props
 * @param {object} dataPool
 * @returns
 */
export default function requester(props, dataPool) {
  const { namespace } = props;
  const pageContext = getPageContext();
  let dispatch;
  if (typeof pageContext.dispatch === 'function') {
    dispatch = pageContext.dispatch;
  } else if (typeof props.dispatch === 'function'){
    dispatch = props.dispatch;
  } else{
    throw new Error(`请传入有效的 dispatch`);
  }

  let APISet = {};
  const replaceAPIKey = replaceKey(dataPool);

  function requestProxy(type, payload) {
    return dispatch({
      type: `${namespace}/${type}`,
      ...payload,
    })
  }
  function getFormatAPI(key) {
    const API = APISet[key];
    if (API !== undefined) {
      return replaceAPIKey.format(API);
    } else {
      throw new Error(`${key} is undefined, check your config file`);
    }
  }
  function generalFetch(effects, APIName, args) {
    const { payload, ...rest } = args;
    const options = {
      payload,
      ...rest,
    };
    if (options.API !== undefined) {
      options.API = replaceAPIKey.format(API);
    } else {
      options.API = getFormatAPI(APIName)
    }
    if (!options.API) {
      return new Promise((res, rej) => rej()).catch(err => void err);
    }
    return requestProxy(effects, options);
  }

  return {
    setAPI: (key, API) => {
      if (key instanceof Object) {
        APISet = {
          ...APISet,
          ...key,
        };
        console.log('设置 API Set :', APISet);
        return APISet;
      }
      console.log(`设置 API ${key} = ${API}`);
      return APISet[key] = API;
    },
    getAPI: (key) => {
      if (key === undefined) return APISet;
      return getFormatAPI(key);
    },
    formatAPI: (API) => {
      return replaceAPIKey.format(API);
    },
    save: ({ payload, ...rest }) => {
      requestProxy('save', {
        payload,
        ...rest,
      });
    },

    fetchList: (options) => {
      return generalFetch('fetchList', 'listAPI', options);
    },
    fetchOne: (options) => {
      return generalFetch('fetchOne', 'getAPI', options);
    },
    createForm: (options) => {
      return generalFetch('createForm', 'createAPI', options);
    },
    updateForm: (options) => {
      return generalFetch('updateForm', 'updateAPI', options);
    },
    deleteOne: (options) => {
      return generalFetch('deleteOne', 'deleteAPI', options);
    },
    deleteBatch: (options) => {
      return generalFetch('deleteBatch', 'deleteBatchAPI', options);
    },
  };
}