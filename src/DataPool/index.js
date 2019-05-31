import DataPool from './DataPool';

const pools = {};

function getDataPoolEntity(namespace) {
  if (!pools[namespace]) {
    createDataPool({ namespace });
  }
  return pools[namespace].getDataPool();
}

function createDataPool({ namespace }) {
  pools[namespace] = new DataPool({ namespace });
}

function destroyDataPool(namespace) {
  delete pools[namespace];
}

export {
  getDataPoolEntity as getDataPool,
  createDataPool,
  destroyDataPool,
}