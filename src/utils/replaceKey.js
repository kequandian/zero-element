/**
 *  API 参数化的具体实现
 * @param {object} {model, dataPool} model 和 dataPool
 * - [id] 从 dataPool.location 中替换 id 的值
 * - (id) 从 dataPool.record 中替换 id 的值
 * - {id} 从 model 中替换 id 的值
 */
export default function replaceKey({ model, dataPool }) {
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
        const keyList = string.match(/\{\w+\}|\[\w+\]|\(\w+\)/g);

        keyList && keyList.forEach(key => {
          if (key.indexOf('[') > -1) {
            string = string.replace(key,
              dataPool.getLocationSearch()[key.replace(/\[|\]/g, '')]
            );
          } else if (key.indexOf('(') > -1) {
            string = string.replace(key,
              dataPool.record[key.replace(/\(|\)/g, '')]
            );
          } else if (key.indexOf('{') > -1) {
            string = string.replace(key,
              model.state.formData[key.replace(/\{|\}/g, '')]
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