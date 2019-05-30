"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PromiseAPI = PromiseAPI;

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