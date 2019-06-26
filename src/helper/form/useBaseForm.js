import { useContext } from 'react';
import { useModel } from '@/Model';
import { formatAPI } from '@/utils/format';
import { PromiseAPI } from '@/utils/PromiseGen';
import PageContext from '@/context/PageContext';

export default function useBaseForm({
  namespace, modelPath = 'formData',
}, config) {

  const { API = {} } = config;
  const [modelStatus, dispatch] = useModel({
    namespace,
    type: 'useBaseForm',
  });
  const context = useContext(PageContext);

  const formData = modelStatus[modelPath];
  const fAPI = formatAPI(API, {
    namespace,
  });

  function onGetOne({ }) {
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
    const api = fAPI.createAPI;
    return PromiseAPI(api, () => (
      dispatch({
        type: 'createForm',
        API: api,
        MODELPATH: modelPath,
        payload: {
          ...fields,
          ...formData,
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

  function onUpdateForm({ fields }) {
    const api = fAPI.updateAPI;

    return PromiseAPI(api, () => (
      dispatch({
        type: 'updateForm',
        API: api,
        MODELPATH: modelPath,
        payload: {
          ...fields,
          ...formData,
        },
      })
    )
    );
  }

  return {
    config,
    data: formData,
    modelStatus,
    context,
    handle: {
      onGetOne,
      onCreateForm,
      onUpdateForm,
      onClearForm,
    }
  }
}