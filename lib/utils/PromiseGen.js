"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PromiseAPI = PromiseAPI;

/**
 * 使用 Promise 封装 API 调用过程
 *
 * @export
 * @param {Boolean} boolean api 是否为空
 * @param {Function} func 主调用逻辑，需要 return 一个 Promise
 * @param {Object} options 选项
 * @returns {Promise} Promise
 */
function PromiseAPI(_boolean, func) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var successMsg = options.successMsg,
      errorMsg = options.errorMsg;
  return new Promise(function (res, rej) {
    if (_boolean) {
      func().then(function (data) {
        var code = data.code,
            message = data.message;

        if (code === 200) {
          res(data);
        } else {
          rej(message);
        }
      });
    } else {
      rej('缺少参数: API');
    }
  });
}