

/**
 * 简单的对比函数，用于 shouldComponentUpdate 
 *
 * @export
 * @param {object} props
 * @param {object} nextProps
 * @param {Array} contrastList
 * @returns boolean
 */
export default function contrast(props, nextProps, contrastList) {
  let rst = 0;
  for (let i = 0; i < contrastList.length; i++) {
    const key = contrastList[i];
    if (props[key] === nextProps[key]) {
      rst += 1;
    }
  }
  return !(rst === contrastList.length);
}