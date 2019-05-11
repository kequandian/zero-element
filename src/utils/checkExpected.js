
/**
 * 检测该行数据的字段的值 是否符合预期
 *
 * @param {*} record
 * @param {*} options
 * @returns
 */

import { checkPerm } from './permission';

const rulesMap = {
  'IS_NOT_NULL': (value) => {
    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        return value.length !== 0;
      }
      return Object.keys(value || {}).length !== 0;
    }
    return value === 0 ? true : Boolean(value);
  }
};
export default function checkExpected(record = {}, options = {}) {
  const { expectedField, expectedValue, permission, location } = options;

  // 若需要检测权限
  if (permission) {
    if (checkPerm(permission, location) === false) {
      return false;
    }
  }
  if (!expectedField) return true; // 没有预期就是什么都凑合


  const fieldList = expectedField instanceof Array ? expectedField : [expectedField];
  const valueList = expectedValue instanceof Array ? expectedValue : [expectedValue];
  return fieldList.every((fields, i) => {
    const values = valueList[i];
    if (Array.isArray(fields)) {
      return fields.some(field => {
        const recordValue = record[field];
        return extendsExpectedValue(values, recordValue);
      })
    } else {
      const recordValue = record[fields];
      return extendsExpectedValue(values, recordValue);
    }
  });
}


/**
 *
 *
 * @param {*} expectedValue 预期的值
 * @param {*} recordValue 列表的数据对应的字段的值
 * @returns Boolean
 */
function judge(expectedValue, recordValue) {
  // 若不是简单的相等关系的话
  if (recordValue !== expectedValue) {
    // 先看看 expectedValue 是不是预设关键字
    if (rulesMap[expectedValue]) {
      if (!rulesMap[expectedValue](recordValue)) {
        return false;
      }
    } else {
      // 再看看 expectedValue 是不是传入了正则表达式
      // ^\/[\S\s]+\/[gimy]*$   预期匹配字符串： '/test ok/g'
      const regexCheck = new RegExp(/^\/[\S\s]+\/[gimy]*$/, 'g');
      if (!regexCheck.test(expectedValue)) {
        return false;
      }
      const valueSplit = expectedValue.split('/');
      const ExpectedRegex = new RegExp(valueSplit[1], valueSplit[2]);
      if (!ExpectedRegex.test(recordValue)) {
        return false;
      }
    }
  }
  return true;
}

/**
 * 仅仅是用来处理 expectedValue 为数组的情况下，减少代码重复而已
 *
 * @param {*} values
 * @param {*} recordValue
 * @returns Boolean
 */
function extendsExpectedValue(values, recordValue) {
  if (Array.isArray(values)) {
    return values.some(value => judge(value, recordValue));
  } else {
    return judge(values, recordValue);
  }
}