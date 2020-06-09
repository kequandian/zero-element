const actionSet = {};

function set(obj) {
  Object.keys(obj).forEach(key => {
    actionSet[key] = obj[key];
  });
}

function get(name) {
  if (name === undefined) return actionSet;
  return actionSet[name];
}

export {
  get,
  set,
}