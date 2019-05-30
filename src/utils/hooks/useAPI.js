import { useModel } from '@/Model';
import { getDataPool } from '@/DataPool';
import replaceKey from '../replaceKey';

export default function useAPI(API, { namespace }) {
  const [modelStatus] = useModel({ namespace });
  const dataPool = getDataPool(namespace);

  const APIUtils = replaceKey({
    modelStatus,
    dataPool,
  });

  if (typeof API === 'string') {
    return APIUtils.format(API);
  }
  return new Proxy(API, {
    get(target, name) {
      if (target[name] !== undefined) {
        return APIUtils.format(target[name]);
      } else {
        console.warn(`API ${name} is undefined, check your config file`);
        return null;
      }
    }
  });
}