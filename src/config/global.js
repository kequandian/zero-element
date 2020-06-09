
const global = {};

function set(obj) {
  Object.keys(obj).forEach(key => {
    global[key] = obj[key];
  });
}

export default global;

export {
  set,
}