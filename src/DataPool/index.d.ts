
/**
 * 使用 DataPool
 *
 * @param {options} options 包含以下属性
 * - namespace 必须，一般与 model namespace 相同
 * @return {Array} 返回 array, 为 [ { record, location }, { setRecord, setLocation } ]
 */
declare function useDataPool(options: options): [
  Object,
  { setRecord, setLocation }
]

interface options {
  /**
   * DataPool 的命名空间
   */
  namespace: String,
}

/**
 * 删除指定的 DataPool
 *
 * @param {String} namespace namespace
 */
declare function removeDataPool(namespace: String): void


/**
 * 设置当前点击的列表行的数据
 *
 * @param {Object} data rowData
 */
declare function setRecord(data: Object): void

/**
 * 自动获取 window.location 更新 location
 *
 */
declare function setLocation(): void

export {
  useDataPool,
  removeDataPool,
  setRecord,
  setLocation,
}