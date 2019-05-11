const handler = {
  get: function (target, name) {
    if (checkEnv()) {
      return target[name];
    } else {
      return _ => void 0;
    }
  }
};

function checkEnv() {
  try {
    if (window) {
      if (window.localStorage && window.sessionStorage) {
        checkEnv = _ => true;
        return true;
      }
    }
  } catch (error) {
    return false;
  }
  checkEnv = _ => false;
}


const LSUtils = {
  set(key, value) {
    value = typeof (value) === "object" ? JSON.stringify(value) : value;
    localStorage.setItem(key, value);
  },
  get(key) {
    const value = localStorage.getItem(key) || '';
    if ((value === "") || (value.indexOf("{") < 0) && (value.indexOf("[") < 0)) {
      return value;
    } else {
      return JSON.parse(value);
    }
  },
  del(key) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  }
}

const SSUtils = {
  set(key, value) {
    value = typeof (value) === "object" ? JSON.stringify(value) : value;
    sessionStorage.setItem(key, value);
  },
  get(key) {
    const value = sessionStorage.getItem(key) || '';
    if ((value === "") || (value.indexOf("{") < 0) && (value.indexOf("[") < 0)) {
      return value;
    } else {
      return JSON.parse(value);
    }
  },
  del(key) {
    sessionStorage.removeItem(key);
  },
  clear() {
    sessionStorage.clear();
  }
}

const LS = new Proxy(LSUtils, handler);
const SS = new Proxy(SSUtils, handler);

export {
  LS,
  SS,
}