import Model from './Model';
import defaultEffects from './defaultEffects';

const models = {};
let prevModels;

function checkDispatch(options) {
  if (typeof options === 'object') {
    const { dispatch, modelStatus, namespace } = options;
    if (dispatch && typeof dispatch === 'function') {
      return [
        modelStatus,
        dispatch,
      ];
    } else {

      // 销毁可回收的 model
      if (namespace !== prevModels && models[prevModels]) {
        if (checkParent(namespace, prevModels) === false && models[prevModels].recyclable === true) {
          removeModel(prevModels);
        }
      }

      return getModel(options);
    }
  }
}

function getModel({ namespace, ...rest }) {
  checkModel(namespace);
  prevModels = namespace;
  return models[namespace].useModel(rest);
}
function getModelEntity(namespace) {
  checkModel(namespace);
  return models[namespace].getModel();
}

function checkModel(namespace) {
  if (!models[namespace]) {
    createModel({ namespace, auto: true });
    console.log('auto create model: ', namespace, models);
  }
}

function createModel({ namespace, state = {}, reducers = {}, effects = {}, auto = false }) {
  models[namespace] = new Model({
    namespace,
    state: {
      listData: {
        records: [],
      },
      formData: {},
      searchData: {},
      load: {
        loading: false,
        effects: {},
      },
      ...state,
    },
    reducers: {
      save({ payload }, { state }) {
        return {
          ...state,
          ...payload
        }
      },
      saveData({ payload }, { state }) {
        const { key, data } = payload;
        return {
          ...state,
          [key]: {
            ...state[key],
            ...data,
          }
        }
      },
      loading({ payload }, { state }) {
        const { loading, effect } = payload;
        return {
          ...state,
          load: {
            loading,
            effects: {
              [effect]: loading,
            }
          }
        }
      },
      ...reducers,
    },
    effects: {
      ...defaultEffects,
      ...effects,
    },
    auto,
  });

  return models[namespace];
}

function removeModel(namespace) {
  delete models[namespace];
}

export {
  checkDispatch as useModel,
  createModel,
  removeModel,
  getModelEntity as getModel,
}

/**
 * 判断两个 namespace 之间是否有父子关系
 * @param {string} name 当前 namespace
 * @param {string} prevName 另一个 namespace
 */
function checkParent(name, prevName) {
  return name.split('_')[0] === prevName.split('_')[0];
}