import React from 'react';
import baseTypeSet from '../components/BaseFormType';

let extendsFormItemType = {};

export function getFormItemType(type, props) {
  // props : placeholder styles className ...
  const typeMap = {
    ...baseTypeSet,
    ...extendsFormItemType,
  };
  const MatchType = typeMap[type] || typeMap['input'];
  return <MatchType {...props} />;
}
export function setFormItemTypeExtends(extendsObj) {
  extendsFormItemType = {
    ...extendsFormItemType,
    ...extendsObj,
  };
}