"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = contrast;

/**
 * 简单的对比函数，用于 shouldComponentUpdate 
 *
 * @export
 * @param {object} props
 * @param {object} nextProps
 * @param {Array} contrastList
 * @returns boolean
 */
function contrast(props, nextProps, contrastList) {
  var rst = 0;

  for (var i = 0; i < contrastList.length; i++) {
    var key = contrastList[i];

    if (props[key] === nextProps[key]) {
      rst += 1;
    }
  }

  return !(rst === contrastList.length);
}