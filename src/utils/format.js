import { getModel } from '@/Model';
import { getDataPool } from '@/DataPool';
import replaceKey from './replaceKey';

export function formatAPI(API, { namespace, data }) {
  const model = getModel(namespace);
  const dataPool = getDataPool(namespace);

  const APIUtils = replaceKey({
    model,
    dataPool,
    data,
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