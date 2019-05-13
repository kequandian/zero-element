import { useModel } from '@/Model';
import { useDataPool } from '@/DataPool';
import replaceKey from '../replaceKey';

export default function useAPI(API, { namespace }) {
  const [modelStatus] = useModel({ namespace });
  const [dataPool] = useDataPool({ namespace });
  const APIUtils = replaceKey({
    modelStatus,
    dataPool,
  });

  if (typeof API === 'string') {
    return APIUtils.format(API);
  }
  return new Proxy(API, {
    get(target, name) {
      return APIUtils.format(target[name]);
    }
  });
}