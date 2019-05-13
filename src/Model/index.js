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
      return getModel(namespace);
    }
  }
}

function getModel(namespace) {
  if (!models[namespace]) {
    createModel({ namespace });
    console.log('auto create model: ', namespace, models);
  }
  return models[namespace].useModel();
}

function createModel({ namespace, reducers = {}, effects = {} }) {
  models[namespace] = new Model({
    namespace,
    reducers: {
      save({ payload }, { state }) {
        return {
          ...state,
          ...payload
        }
      },
      ...reducers,
    },
    effects: {
      ...defaultEffects,
      ...effects,
    },
  });
}

function removeModel(namespace) {
  delete models[namespace];
}

export {
  checkDispatch as useModel,
  createModel,
  removeModel,
}