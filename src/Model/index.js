import Model from './Model';
import defaultEffects from './defaultEffects';

const models = {};

function checkDispatch(options) {
  if (typeof options === 'object') {
    const { dispatch, modelStatus, namespace } = options;
    if (dispatch && typeof dispatch === 'function') {
      return [
        modelStatus,
        dispatch,
      ];
    } else {
      return getModel(options);
    }
  }
}

function getModel({ namespace, ...rest }) {
  if (!models[namespace]) {
    createModel({ namespace, auto: true });
    console.log('auto create model: ', namespace, models);
  }
  return models[namespace].useModel(rest);
}
function getModelEntity(namespace) {
  return models[namespace].getModel();
}

function createModel({ namespace, state = {}, reducers = {}, effects = {}, auto = false }) {
  models[namespace] = new Model({
    namespace,
    state: {
      listData: {},
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