import { getModel, getPageData } from '@/Model';
import { getLocationSearch } from '@/utils/location';
import replaceKey from './replaceKey';

export function formatAPI(API, { namespace, data, placeholder = 'undefined' }) {
  const model = getModel(namespace);
  const { formData, ...pageData } = getPageData(namespace) || {};

  const locationData = getLocationSearch();

  const APIUtils = replaceKey({
    model,
    locationData,
    formData,
    data: {
      ...pageData,
      ...data,
    },
    placeholder,
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