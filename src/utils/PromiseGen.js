

/**
 * 使用 Promise 封装 API 调用过程
 *
 * @export
 * @param {Boolean} boolean api 是否为空
 * @param {Function} func 主调用逻辑，需要 return 一个 Promise
 * @param {Object} options 选项
 * @returns {Promise} Promise
 */
export function PromiseAPI(boolean, func, options = {}) {
  const { successMsg, errorMsg } = options;
  return new Promise((res, rej) => {
    if (boolean) {
      func().then(data => {
        const { code, message } = data;
        if (code === 200) {
          res(data);
        } else {
          rej(message);
        }
      }).catch(err => {
        rej(err);;
      });
    } else {
      rej('缺少参数: API');
    }
  })
}