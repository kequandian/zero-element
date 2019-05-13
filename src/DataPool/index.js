import DataPool from './DataPool';

const pools = {};

function checkDispatch(options) {
  if (typeof options === 'object') {
    const { namespace } = options;
    return getDataPool(namespace);
  }
}

function getDataPool(namespace) {
  if (!pools[namespace]) {
    createDataPool({ namespace });
  }
  return pools[namespace].useDataPool();
}

function createDataPool({ namespace }) {
  pools[namespace] = new DataPool({ namespace });
}

function removeDataPool(namespace) {
  delete pools[namespace];
}

export {
  checkDispatch as useDataPool,
  createDataPool,
  removeDataPool,
}