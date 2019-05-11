import queryString from 'query-string';
import modelHooks from './modelHooks';
import { getPageContext, setPageContext } from '../../components/EventProxy/PageContext';

export default function searchHooks(props, options = {}) {
  const { modelStatus = {}, requester, dataPool, history } = props;
  const { modelPath } = options;
  const hooks = modelHooks(props, {
    modelPath,
  });
  const searchData = hooks.getSelfModelStatus();

  function onFieldsChange(fields, err) {
    requester.save({
      payload: {
        [modelPath]: {
          ...searchData,
          ...fields,
        },
        searchValidate: err,
      }
    });
  }
  function onRefresh() {
    const pageContext = getPageContext();
    if (pageContext.onListRefresh) {
      pageContext.onListRefresh();
    }
  }
  function onReset() {
    hooks.setSelfModelStatus({});
  }
  function onSubmit(values) {
    const { onListFetch } = getPageContext();
    const cloneValue = { ...values };
    Object.keys(cloneValue).forEach(key => {
      if (typeof cloneValue[key] === 'object' && cloneValue[key].hasOwnProperty('value')) {
        cloneValue[key] = cloneValue[key].value;
      }
    });
    if (onListFetch) {
      onListFetch({}, cloneValue);
    }
  }

  return {
    getSelfModelStatus: hooks.getSelfModelStatus,
    setSelfModelStatus: hooks.setSelfModelStatus,
    save: hooks.save,

    onFieldsChange,
    onRefresh,
    onSubmit,
    onReset,
  }
}