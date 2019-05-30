
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
}

/**
  * 删除指定的 DataPool
  *
  * @param {String} namespace namespace
  */
 declare function removeDataPool(namespace: String): void

export {
  getDataPool,
  DataPool,
  removeDataPool,
}