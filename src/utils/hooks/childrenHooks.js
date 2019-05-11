
export default function childrenHooks(props, options = {}) {
  const { modelStatus = {}, requester } = props;
  const { modelPath, itemsPath } = options;
  const formData = modelStatus[modelPath] || {};

  function getSelfModelStatus(defaultValue = []) {
    const match = modelStatus[modelPath];
    if (match === undefined) {
      console.warn(`model state ${modelPath} is undefined`);
      return defaultValue;
    } else {
      return match[itemsPath] && [...match[itemsPath]] || defaultValue;
    }
  }
  function setSelfModelStatus(data) {
    const tempObje = {};
    tempObje[itemsPath] = data;
    requester.save({
      payload: {
        [modelPath]: {
          ...formData,
          ...tempObje,
        }
      }
    });
  }

  return {
    getSelfModelStatus,
    setSelfModelStatus,
  }
}