import queryString from 'query-string';
import modelHooks from './modelHooks';
import { getPageContext, setPageContext } from '../../components/EventProxy/PageContext';

export default function formHooks(props, options = {}) {
  const { modelStatus = {}, requester, dataPool, history, config = {} } = props;
  const { REDIRECT } = config;
  const { modelPath } = options;
  const hooks = modelHooks(props, {
    modelPath,
  });
  const formData = hooks.getSelfModelStatus();

  function onGetData() {
    // const id = dataPool.getToLocation('id') || dataPool.getToRecord('id');
    hooks.fetch('fetchOne', {
      // payload: {
      //   id,
      // }
    });
  }
  function onFieldsChange(fields, err = {}) {
    requester.save({
      payload: {
        [modelPath]: {
          ...formData,
          ...fields
        },
        formValidate: err,
      }
    });
  }
  function fetchSuccess({ code, data = {} }) {
    if (code !== 200) return false;

    const { onModalClose, onListRefresh, pageModalVisible } = getPageContext();
    if (REDIRECT) {
      let path = REDIRECT;
      if (path.indexOf('{')) {
        const keyList = path.match(/\{\w+\}/g);
        keyList && keyList.forEach(key => {
          if (key.indexOf('{') > -1) {
            path = path.replace(key, data[key.replace(/\{|\}/g, '')]);
          }
        });
        path = path;
      }
      history.push(path);
    } else if (REDIRECT === undefined) {
      if (pageModalVisible === true) {
        if (onModalClose) {
          onModalClose();
        }
      }
      if (onListRefresh) {
        onListRefresh();
      }
    }
  }

  return {
    getSelfModelStatus: hooks.getSelfModelStatus,
    setSelfModelStatus: hooks.setSelfModelStatus,
    save: hooks.save,
    createForm: hooks.fetch.bind(this, 'createForm'),
    updateForm: hooks.fetch.bind(this, 'updateForm'),

    onGetData,
    onFieldsChange,

    fetchSuccess,
  }
}