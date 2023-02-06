
/**
 * 发起 GET 网络请求
 *
 * @export
 * @param {String} api 请求的 api
 * @param {Object} params 请求的 query object
 * @return {Promise} Promise
 */
declare function query(api: String, params: Object): Promise

/**
 * 发起 POST 网络请求
 *
 * @export
 * @param {String} api 请求的 api
 * @param {Object} data 请求的 body object
 * @return {Promise} Promise
 */
declare function post(api: String, data: Object): Promise

/**
 * 发起 PUT 网络请求
 *
 * @export
 * @param {String} api 请求的 api
 * @param {Object} data 请求的 body object
 * @param {Object} headers 请求头
 * @return {Promise} Promise
 */
declare function update(api: String, data: Object, headers: Object): Promise

/**
 * 发起 DELETE 网络请求
 *
 * @export
 * @param {String} api 请求的 api
 * @return {Promise} Promise
 */
declare function remove(api: String): Promise

export {
  query,
  post,
  update,
  remove,
}