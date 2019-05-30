import DataPool from './DataPool';

const pools = {};

function getDataPool(namespace) {
  if (!pools[namespace]) {
    createDataPool({ namespace });
  }
  return pools[namespace].getDataPool();
}

function createDataPool({ namespace }) {
  pools[namespace] = new DataPool({ namespace });
}

function removeDataPool(namespace) {
  delete pools[namespace];
}

export {
  getDataPool,
  createDataPool,
  removeDataPool,
}