
/**
 * 操作 localStorage 对象的工具
 *
 */
declare namespace LS {
  /**
   * 从 localStorage 里面获取值
   *
   * @param {String} key key
   * @returns {(String | Object)} 对应的 value
   */
  function get(key: String): String | Object
  /**
   * 设置 localStorage 的值
   *
   * @param {string} key key
   * @param {(String | Object)} data 对应的 value
   */
  function set(key: string, data: String | Object): void
  /**
   * 从 localStorage 里面删除值
   *
   * @param {String} key key
   */
  function del(key: String): void
  /**
   * 清空 localStorage
   *
   */
  function clear(): void
}

/**
 * 操作 sessionStorage 对象的工具
 * 
 */
declare namespace SS {
  /**
   * 从 sessionStorage 里面获取值
   *
   * @param {String} key key
   * @returns {(String | Object)} 对应的 value
   */
  function get(key: String): String | Object
  /**
   * 设置 sessionStorage 的值
   *
   * @param {string} key key
   * @param {(String | Object)} data 对应的 value
   */
  function set(key: string, data: String | Object): void
  /**
   * 从 sessionStorage 里面删除值
   *
   * @param {String} key key
   */
  function del(key: String): void
  /**
   * 清空 sessionStorage
   *
   */
  function clear(): void
}

export {
  LS,
  SS,
}