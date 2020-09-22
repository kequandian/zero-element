import win from "./window";
import _ from 'lodash';

/**
 *  API 参数化的具体实现
 * @param {object}
 * - [id] 从 locationData 中替换 id 的值
 * - (id) 从 model.record 中替换 id 的值
 * - {id} 从 pageData.formData 中替换 id 的值
 * - <id> 从传入的 data 中替换 id 的值
 * - !#id#! 从 window.ZEle 中替换 id 的值
 */
export default function replaceKey({ model, locationData, formData = {}, data = {}, placeholder }) {
  function handleReplace(str, key, value) {
    let v = value;
    if (!v && v !== 0) {
      v = placeholder;
    }
    return str.replace(key, v);
  }

  return {
    format: function format(string) {
      if (!string) {
        if (string === undefined) {
          console.error('API 未定义');
          return {};
        };
        return string;
      };
      if (typeof (string) === 'string') {
        const keyList =
          string.match(/\{\w+(.\w+)*\}|\[\w+\]|\(\w+(.\w+)*\)|\<\w+(.\w+)*\>|\!\#\w+(.\w+)*\#\!/g);

        keyList && keyList.forEach(key => {
          if (key.indexOf('[') > -1) {
            string = handleReplace(string, key,
              locationData[key.replace(/\[|\]/g, '')]
            );
          } else if (key.indexOf('(') > -1) {
            string = handleReplace(string, key,
              getDeepValue(model.record, key.replace(/\(|\)/g, ''))
            );
          } else if (key.indexOf('{') > -1) {
            string = handleReplace(string, key,
              getDeepValue(formData, key.replace(/\{|\}/g, ''))
            );
          } else if (key.indexOf('<') > -1) {
            string = handleReplace(string, key,
              getDeepValue(data, key.replace(/\<|\>/g, ''))
            );
          } else if (key.indexOf('!#') > -1) {
            const pureKey = key.replace(/\!\#|\#\!/g, '');

            string = handleReplace(string, key,
              win.ZEle[pureKey]
            );
          }
        });

      } else {
        if (string.lenght !== undefined) {
          const [...ary] = string;
          ary.forEach((item, i) => ary[i] = format(item));
          return ary;
        } else {
          const { ...obj } = string
          Object.keys(obj).forEach(key => {
            const rst = format(obj[key]);
            if (rst === 'undefined' || rst === undefined) {
              // 没有值的字段，直接去掉
              delete obj[key];
            } else {
              obj[key] = format(obj[key]);
            }
          });
          return obj;
        }
      }
      return string;
    }
  }
}

function getDeepValue(data, key) {
  return _.get(data, key);
}