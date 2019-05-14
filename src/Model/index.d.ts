
/**
 * 使用 model
 *
 * @param {options} options 包含以下属性
 * - namespace 必须
 * @returns {Array} 返回 array, 为 [modelStatus, dispatch]
 */
declare function useModel(options: options): [
  Object,
  dispatch
]

interface options {
  /**
   * model 的命名空间
   */
  namespace: String,
  /**
   * 若 model 未创建，那么将作为新 model 的 state
   */
  state: Object,
  /**
   * 若 model 未创建，那么将作为新 model 的 reducers
   */
  reducers: Object,
  /**
   * 若 model 未创建，那么将作为新 model 的 effects
   */
  effects: Object,
  /**
   * 自动创建的 model 的标识符
   */
  auto: Boolean,
}

/**
 * 调用 model 里面的方法
 *
 * @param {Object} options 接收以下参数
 * - type 必须，调用的方法名
 * - payload 传递的参数
 */
declare function dispatch(options: dispatchOpt): void

interface dispatch {
}

interface dispatchOpt {
  type: String,
  payload: Object,
}


/**
 * 删除指定的 model
 *
 * @param {String} namespace namespace
 */
declare function removeModel(namespace: String): void

export {
  useModel,
  createModel,
  removeModel,
}