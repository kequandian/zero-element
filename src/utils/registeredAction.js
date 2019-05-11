import { getPageContext, addToListener } from '../components/EventProxy/PageContext';

export default function registeredAction(config = {}) {
  addToListener((pageContext) => {
    const { requester } = pageContext;
    requester.save({
      payload: {
        ZEleAction: actionProxy(config),
      },
    });
  });
}

function actionProxy(config) {
  const actionMap = {};

  config.items && config.items.forEach((item, i) => {
    if (item.config && item.config.actions) {
      const actions = item.config.actions;
      actions.forEach(action => {
        const { key, ...restConfig } = action;
        if (key) {
          actionMap[key] = match(restConfig);
        }
      });
    }
  });

  return (key) => {
    if (key === undefined) {
      return getPageContext();
    }
    if (actionMap[key]) {
      actionMap[key]();
    } else {
      console.warn(`未注册的 action: ${key}，请在 config 中 指定 key 来注册`);
    }
  };
}
function match(config) {
  const { type, options } = config;
  if (type === 'modal') {
    return getPageContext().onModal.bind(this, { options });
  }
  return () => console.warn(`未知的 action type: ${type}`);
}