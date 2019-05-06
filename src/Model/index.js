import Model from './Model';

const models = {};

function checkDispatch(props) {
  if (typeof props === 'object') {
    const { dispatch, modelStatus, namespace } = props;
    return getModel(namespace);

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
    createModel(namespace);
  }
  return models[namespace].useModel();
}

function createModel(namespace) {
  models[namespace] = new Model(namespace);
  console.log('auto create model',namespace, models);
}

function removeModel(namespace) {
  delete models[namespace];
}

export {
  checkDispatch as useModel,
  createModel,
  removeModel,
}