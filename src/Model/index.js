import { createStore, useStore } from 'iostore';
import models from 'iostore/src/stores';
import defaultEffects from './defaultEffects';
import defaultState from './defaultState';

let prevModels = '';
let siblingModels = {};

const pageData = {};

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

  const { namespace } = data;

  // 销毁可回收的 model
  if (namespace !== prevModels && models[prevModels]) {

    const [isFamily, kin] = checkFamily(namespace, prevModels);

    if (isFamily === false) {
      recycleModel(namespace, prevModels);
      recycleModelList(namespace, Object.keys(siblingModels));
    } else if (isFamily) {
      if (kin === 'parent') {
        // 从 子页面 跳转到 父页面 时, 回收 全部子页面
        recycleModelList(namespace, Object.keys(siblingModels));
      } else if (kin !== 'self') {
        siblingModels[namespace] = true;
      }
    }

    prevModels = namespace;
  }

  checkModel(data.namespace);
  return useStore()[data.namespace];
}

function recycleModel(namespace, prevModels) {
  if (models[prevModels]) {
    if (models[prevModels]._recyclable === false) {
      return false;
    }
  } else {
    console.warn(`model ${prevModels} 意外地被提前回收`);
    return false;
  }

  if (namespace === prevModels) {
    console.warn(`正在使用的 model ${namespace} 不应该被回收!`);
    return false;
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(`当前 model %c${namespace}\n%c回收 model %c${prevModels}\n%c当前全部 model`,
      'color: green', '', 'color: red', '', models);
  }
  removeModel(prevModels);
}

function recycleModelList(namespace, prevModelsList) {
  prevModelsList.forEach(removeName => {
    recycleModel(namespace, removeName);
  })
  siblingModels = {};
}

function getModel(namespace) {
  // checkModel(namespace);
  prevModels = namespace;
  return models[namespace];
}

function checkModel(namespace) {

  if (!models[namespace]) {
    createModel({ namespace, auto: true });
    if (process.env.NODE_ENV === 'development') {
      console.log('auto create model: ', namespace, models);
    }
  }
}

function createModel({ namespace, state = {}, effects = {}, auto = false, recyclable = true }) {

  createStore({
    ...JSON.parse(JSON.stringify({
      ...defaultState,
      ...state
    })),
    ...defaultEffects,
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
    console.warn(`pageData ${namespace} is undefined`, pageData);
  }
}
function clearPageData(namespace, key, value = {}) {
  if (pageData[namespace]) {
    pageData[namespace][key] = value;
  }
}

function removeModel(namespace) {
  delete models[namespace];
  delete pageData[namespace];
}

export {
  getModel,
  useModel,
  createModel,

  getPageData,
  setPageData,
  clearPageData,

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