
const handler = {
  get: function (target, name) {
    if (checkEnv()) {
      return window[name];
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