
/**
 * 获取 dataPool 的实例
 *
 * @param {String} namespace 命名空间, 一般与 model namespace 相同
 * @return {DataPool} DataPool 实例
 */
declare function getDataPool(namespace: String): DataPool

class DataPool {

  /**
   * 设置当前点击的列表行的数据
   *
   * @param {Object} data rowData
   */
  setRecord(data: Object): void

  /**
   * 自动获取 window.location 更新 location
   *
   */
  setLocation(): void

  /**
   * 获取 window.location 的 search, 支持 hash 路由
   *
   */
  getLocationSearch(): Object

  /**
   * 获取 window.location 的 pathname, 不支持 hash 路由
   *
   */
  getLocationPathname(): string
}

/**
  * 删除指定的 DataPool
  *
  * @param {String} namespace namespace
  */
declare function destroyDataPool(namespace: String): void

export {
  getDataPool,
  DataPool,
  destroyDataPool,
}