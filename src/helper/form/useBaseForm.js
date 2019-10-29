import { useContext } from 'react';
import { useModel } from '@/Model';
import { formatAPI } from '@/utils/format';
import { PromiseAPI } from '@/utils/PromiseGen';
import PageContext from '@/context/PageContext';

export default function useBaseForm({
  namespace, modelPath = 'formData',
  extraData,
}, config) {

  const { API = {} } = config;
  const [modelStatus, dispatch] = useModel({
    namespace,
    type: 'useBaseForm',
  });
  const context = useContext(PageContext);

  const formData = modelStatus[modelPath] || {};
  const fAPI = formatAPI(API, {
    namespace,
    data: extraData,
  });
  const loading = modelStatus.load.effects['fetchOne'] || modelStatus.load.effects['createForm'] || modelStatus.load.effects['updateForm'] || false;

  function onGetOne({ }) {

    if (loading) {
      return Promise.reject();
    }

    const api = fAPI.getAPI;
    return PromiseAPI(api, () => (
      dispatch({
        type: 'fetchOne',
        API: api,
        MODELPATH: modelPath,
        DIRECTRETURN: false,
        payload: {},
      })
    )
    );
  }

  function onCreateForm({ fields }) {

    if (loading) {
      return Promise.reject();
    }

    const api = fAPI.createAPI;
    return PromiseAPI(api, () => (
      dispatch({
        type: 'createForm',
        API: api,
        MODELPATH: modelPath,
        payload: {
          ...formData,
          ...fields, // 用户输入优先
        },
      })
    )
    );

  }

  function onUpdateForm({ fields }) {

    if (loading) {
      return Promise.reject();
    }

    const api = fAPI.updateAPI;
    return PromiseAPI(api, () => (
      dispatch({
        type: 'updateForm',
        API: api,
        MODELPATH: modelPath,
        payload: {
          ...formData,
          ...fields, // 用户输入优先
        },
      })
    )
    );
  }

  function onClearForm() {
    return dispatch({
      type: 'save',
      payload: {
        [modelPath]: {},
      },
    });
  }

  return {
    loading,
    config,
    data: formData,
    modelStatus,
    context,
    dispatch,
    handle: {
      onGetOne,
      onCreateForm,
      onUpdateForm,
      onClearForm,
    }
  }
}