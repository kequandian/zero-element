
const config = {};

function set(obj) {
  Object.keys(obj).forEach(key => {
    config[key] = obj[key];
  })
}

function get(key) {
  return config[key];
}

export {
  set,
  get,
};