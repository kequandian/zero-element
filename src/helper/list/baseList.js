import { useModel } from '@/Model';
import useAPI from '@/utils/hooks/useAPI';

export default function ({ namespace, modelPath }, config) {
  const { API = {} } = config;
  const [modelStatus, dispatch] = useModel({
    namespace,
  });
  const { listData = {} } = modelStatus;
  const { records = [] } = listData;
  const formatAPI = useAPI(API, {
    namespace,
  });
  function getList() {
    const api = formatAPI.listAPI;
    if (formatAPI) {
      dispatch({
        type: 'fetchList',
        API: api,
        MODELPATH: modelPath,
      });
    }
  }
  return {
    data: records,
    modelStatus,
    getList,
  }
}