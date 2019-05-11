import Reader from './Reader';
import * as AnimationSet from './components/Animation';
import {
  setBaseComponentExtends,
  setLayoutExtends,

  getMainLayout,
  getItem,
  getFormItem,
} from './utils/readConfig';
import { setFormItemTypeExtends } from './utils/getFormItemType';

export default Reader;

export {
  setBaseComponentExtends,
  setLayoutExtends,
  setFormItemTypeExtends,

  getMainLayout,
  getItem,
  getFormItem,
};
export const Animation = AnimationSet;