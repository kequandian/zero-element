
const handler = {
  get: function (target, name) {
    if (checkEnv()) {
      const v = window[name];
      if (typeof v === 'function') {
        return v.bind(window);
      }
      return v;
    } else {
      return _ => void 0;
    }
  },
  set: function (obj, prop, value) {
    if (checkEnv()) {
      return window[prop] = value;
    } else {
      return _ => void 0;
    }
  }
};

function checkEnv() {
  try {
    if (window) {
      checkEnv = _ => true;
      if (!window.ZEle) {
        window.ZEle = {};
      }
      return true;
    }
  } catch (error) {
    return false;
  }
  checkEnv = _ => false;
}

const win = new Proxy({}, handler);

export default win;