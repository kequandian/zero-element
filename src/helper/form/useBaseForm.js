import { useModel } from '@/Model';
import { PromiseAPI } from '@/utils/PromiseGen';

export default function useBaseForm({
  namespace,
}, config) {

  const { API = {} } = config;
  const model = useModel({
    namespace,
    type: 'useBaseForm',
  });

  const formData = model.formData || {};
  const loading = model.loading;

  function onGetOne({ }) {

    if (loading) {
      return Promise.reject();
    }

    return PromiseAPI(api, () => (
      model.fetchOne({
        API: API.getAPI,
        payload: {},
      })
    )
    );
  }

  function onCreateForm({ fields, options }) {

    if (loading) {
      return Promise.reject();
    }

    return PromiseAPI(api, () => (
      model.createForm({
        API: API.createAPI,
        options, // request options
        payload: {
          ...formData,
          ...fields, // 用户输入优先
        },
      })
    )
    );

  }

  function onUpdateForm({ fields, options }) {

    if (loading) {
      return Promise.reject();
    }

    return PromiseAPI(api, () => (
      model.updateForm({
        API: API.updateAPI,
        options, // request options
        payload: {
          ...formData,
          ...fields, // 用户输入优先
        },
      })
    )
    );
  }

  function onClearForm() {
    return model.save('formData', {});
  }

  return {
    loading,
    config,
    data: formData,
    model,
    handle: {
      onGetOne,
      onCreateForm,
      onUpdateForm,
      onClearForm,
    }
  }
}