
const config = {};

function set(obj) {
  Object.keys(obj).forEach(key => {
    config[key] = obj[key];
  })
}

function get() {
  return config;
}

export {
  set,
  get,
};