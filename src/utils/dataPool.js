import queryString from 'query-string';
import { getPageContext, setPageContext } from '../components/EventProxy/PageContext';

export default function dataPool(props) {
  const { location, dispatch, namespace } = props;
  let modelStatus = props.modelStatus || {};
  const pool = {
    location: queryString.parse(location.search.replace('?', '')),
    record: {}, // List 的当前操作行
  };

  return {
    register: (newModelStatus) => {
      modelStatus = newModelStatus;
    },

    getToLocation(key) {
      return pool.location[key];
    },
    clearLocation() {
      pool.location = {};
    },

    registerToRecord(obj) {
      pool.record = obj;
    },
    getToRecord(key) {
      return pool.record[key];
    },
    clearRecord() {
      pool.record = {};
    },

    getToForm(key) {
      const pageContext = getPageContext();
      const { pageData = {} } = pageContext;
      const { formData = {} } = pageData;

      return formData[key];
    },
    getToFormAll(modelPath = 'formData') {

      return modelStatus[modelPath];
    },
    clearForm(dataPath = 'formData') {
      const pageContext = getPageContext();
      const { pageData = {} } = pageContext;
      setPageContext('pageData', {
        ...pageData,
        [dataPath]: {},
        formValidate: {},
      });
    },
    getToFormAllErr() {

      return modelStatus.formValidate || {};
    },

    getToSearchAll(modelPath = 'searchData') {

      return modelStatus[modelPath];
    },
    clearSearch(modelPath = 'searchData') {
      dispatch({
        type: `${namespace}/save`,
        payload: {
          [modelPath]: {},
          searchValidate: {},
        },
      });
    },

    getAll() {
      const pageContext = getPageContext();
      const { pageData = {} } = pageContext;

      return { modelStatus, pool, pageData };
    },
  }
}