import { createStore, useStore } from 'iostore';
import models from 'iostore/src/stores';
import defaultEffects from './defaultEffects';
import defaultState from './defaultState';

let prevModels = '';
const pageData = {};

function useModel(options) {
  let data = options;

  if (typeof options === 'object' && options.namespace) {
    const { namespace } = options;

    // 销毁可回收的 model
    if (namespace !== prevModels && models[prevModels]) {
      if (checkParent(namespace, prevModels) === false && models[prevModels]._recyclable === true) {
        if (process.env.NODE_ENV === 'development') {
          console.log(`创建了新的 model ${namespace}, 回收 model ${prevModels}`);
        }
        removeModel(prevModels);
      }
    }

  } else if (typeof options === 'string') {
    data = {
      namespace: options,
    };
  } else {
    throw new Error('params namespace is required');
  }

  checkModel(data.namespace);
  return useStore()[data.namespace];
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
      console.warn('auto create model: ', namespace, models);
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

  removeModel,
}

/**
 * 判断两个 namespace 之间是否有父子关系
 * @param {string} name 当前 namespace
 * @param {string} prevName 另一个 namespace
 * @returns {boolean} name 是 prevName 的父关系
 */
function checkParent(name, prevName) {
  return name.split('_')[0] === prevName.split('_')[0]
    && name.indexOf(prevName) > -1;
}