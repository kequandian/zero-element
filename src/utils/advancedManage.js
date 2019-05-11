import { LS } from './utils';

export function getChecked(namespace, fieldsConfig) {
  const ListFieldsConfig = LS.get('ListFieldsConfig') || {};
  if (ListFieldsConfig[namespace]) {
    return ListFieldsConfig[namespace];
  } else {
    if (fieldsConfig) {
      const filter = fieldsConfig.map(field => field.field);
      setChecked(namespace, filter);
      return filter;
    }
  }
  return null;
}
export function setChecked(namespace, fieldsConfig) {
  const ListFieldsConfig = LS.get('ListFieldsConfig') || {};
  ListFieldsConfig[namespace] = fieldsConfig;
  LS.set('ListFieldsConfig', ListFieldsConfig);
}