
export default function modelHooks(props, options = {}) {
  const { modelStatus = {}, requester } = props;
  const { modelPath } = options;

  function getSelfModelStatus(defaultValue) {
    const match = modelStatus[modelPath];
    if (match === undefined) {
      if (modelPath.indexOf('children') === -1) {
        console.warn(`model state ${modelPath} is undefined`);
      }
      return defaultValue;
    }
    else if (match instanceof Object) {
      if (defaultValue !== undefined) {
        if (Array.isArray(match) && match.length === 0) {
          return defaultValue;
        }
        if (Object.keys(match).length === 0) {
          return defaultValue;
        }
        return match;
      }
    }
    return match;
  }
  function setSelfModelStatus(data) {
    requester.save({
      payload: {
        [modelPath]: {
          ...data,
        }
      }
    });
  }
  function fetch(name, data) {
    return requester[name]({
      MODELPATH: modelPath,
      ...data,
    });
  }

  return {
    getSelfModelStatus,
    setSelfModelStatus,
    fetch,
    save: fetch.bind(this, 'save'),
  }
}