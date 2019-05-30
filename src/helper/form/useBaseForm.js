import { useModel } from '@/Model';
import { formatAPI } from '@/utils/format';
import { PromiseAPI } from '@/utils/PromiseGen';

export default function useBaseForm({ namespace, modelPath = 'formData' }, config) {
  const { API = {} } = config;
  const [modelStatus, dispatch] = useModel({
    namespace,
  });

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
        payload: {
          ...queryData,
          current,
          pageSize,
        },
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

  function onUpdateForm({ fields }) {
    const api = formatAPI.updateAPI;

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
    onGetOne,
    onCreateForm,
    onUpdateForm,
  }
}