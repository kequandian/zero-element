/**
 * 获取已设置的 endpoint
 *
 * @export
 * @return {String} String
 */
declare function get(func: Function): String

/**
 * 设置 API 请求的 endpoint
 *
 * @export
 * @param {String} endpoint endpoint 字符串, e.g. "https://example.com:8000"
 */
declare function set(endpoint: String): void

export {
  get,
  set,
}