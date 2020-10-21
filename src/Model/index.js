import { createStore, useStore } from 'iostore';
import models from 'iostore/src/stores';
import defaultEffects from './defaultEffects';
import defaultState from './defaultState';
import devUtils from './devUtils';

let refs = {};

const pageData = {};

devUtils({
  refs,
  pageData,
  models,
});

function useModel(options) {
  let data = options;

  if (typeof options === 'object' && options.namespace) {
  } else if (typeof options === 'string') {
    data = {
      namespace: options,
    };
  } else {
    throw new Error('params namespace is required');
  }

  const { namespace, ref } = data;

  if (ref) {
    setRef(namespace, ref);
  }
  // 销毁可回收的 model
  const autoCreateModels = Object.keys(models).filter(key => models[key]._auto);

  const loseRef = [];

  autoCreateModels.forEach(ns => {
    if (!checkRef(ns)) {

      if (namespace !== ns && models[ns] && models[namespace] && models[namespace]._auto) {
        const [isFamily, kin] = checkFamily(ns, namespace);

        if (isFamily === false) {
          loseRef.push(ns);
        } else if (isFamily) {
          if (kin === 'parent') {
          } else if (kin !== 'self' && kin !== 'sibling') {
            loseRef.push(ns);
          }
        }
      }
    }
  });

  recycleModelList(loseRef);

  checkModel(data.namespace);
  return useStore()[data.namespace];
}

function recycleModel(namespace) {

  if (models[namespace]) {
    if (checkRef(namespace)) {
      return false;
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`回收 model %c${namespace}%c\n当前全部 model`,
        'color: red', '', models);
    }
    removeModel(namespace);
  }
}

function recycleModelList(prevModelsList) {
  prevModelsList.forEach(namespace => {
    recycleModel(namespace);
  })
}

function getModel(namespace) {
  // checkModel(namespace);
  return models[namespace];
}

function checkModel(namespace) {

  if (!models[namespace]) {
    createModel({ namespace, auto: true });
    if (process.env.NODE_ENV === 'development') {
      console.log(`auto create model: %c${namespace}%c\n当前全部 model`, 'color: green', '', models);
    }
  }
}

function createModel({
  namespace,
  state = {}, effects = {},
  auto = false, recyclable = true,
  useDefault = true
}) {

  createStore({
    ...JSON.parse(JSON.stringify({
      ...(useDefault ? defaultState : {}),
      ...state
    })),
    ...(useDefault ? defaultEffects : {}),
    ...effects,
    namespace,
    _auto: auto,
    _recyclable: recyclable,
  });
  pageData[namespace] = {};

  return models[namespace];
}

function getPageData(namespace) {
  return pageData[namespace];
}
function setPageData(namespace, key, value) {
  if (pageData[namespace]) {
    pageData[namespace][key] = value;
  } else {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`pageData ${namespace} is undefined`, pageData);
    }
  }
}
function clearPageData(namespace, key, value = {}) {
  if (pageData[namespace]) {
    pageData[namespace][key] = value;
  }
}

function setRef(namespace, ref) {
  if (!refs[namespace]) {
    refs[namespace] = [];
  }
  refs[namespace] = refs[namespace].filter(r => r.current);
  refs[namespace].push(ref);
}
function checkRef(namespace) {

  if (Array.isArray(refs[namespace])) {
    return refs[namespace].some(r => r.current);
  }
  return false;
}

function removeModel(namespace) {
  delete models[namespace];
  delete pageData[namespace];
  delete refs[namespace];
}

export {
  getModel,
  useModel,
  createModel,

  getPageData,
  setPageData,
  clearPageData,

  setRef,

  removeModel,
}

/**
 * 判断两个 namespace 之间的亲属关系
 * @param {string} name 当前 namespace
 * @param {string} prevName 另一个 namespace
 * @returns {array} [ 是否亲属, 具体的亲属关系: parent 还是 child 抑或是 sibling ]
 */
function checkFamily(name, prevName) {
  const isFamily = name.split('_')[0] === prevName.split('_')[0];
  let kin = null;

  if (isFamily) {
    const nextIncludePrev = name.indexOf(prevName) > -1;
    const prevIncludeNext = prevName.indexOf(name) > -1;

    if (nextIncludePrev) {
      if (prevIncludeNext) {
        kin = 'self';
      } else {
        kin = 'child';
      }
    } else if (prevIncludeNext) {
      kin = 'parent';
    } else {
      kin = 'sibling';
    }
  }

  return [
    isFamily,
    kin,
  ]
}