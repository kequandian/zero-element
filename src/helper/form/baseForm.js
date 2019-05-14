import { useModel } from '@/Model';
import useAPI from '@/utils/hooks/useAPI';
import { get } from '@/global/APIConfig';
import { useDataPool } from '@/DataPool';

export default function baseForm({ namespace, modelPath = 'formData' }, config) {
  const { API = {} } = config;
  const [modelStatus, dispatch] = useModel({
    namespace,
  });

  const formData = modelStatus[modelPath];
  const formatAPI = useAPI(API, {
    namespace,
  });

  function onGetOne({ }) {
    const api = formatAPI.getAPI;
    if (api)
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
      });
  }

  function onCreateForm({ fields }) {
    const api = formatAPI.createAPI;

    if (api) {
      dispatch({
        type: 'createForm',
        API: api,
        MODELPATH: modelPath,
        payload: {
          ...fields,
          ...formData,
        },
      }).then(({ code }) => {
        if (code === 200) {
          console.log('创建成功');
        }
      });
    }
  }

  function onUpdateForm({ fields }) {
    const api = formatAPI.updateAPI;

    if (api) {
      dispatch({
        type: 'updateForm',
        API: api,
        MODELPATH: modelPath,
        payload: {
          ...fields,
          ...formData,
        },
      }).then(({ code }) => {
        if (code === 200) {
          console.log('更新成功');
        }
      });
    }
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