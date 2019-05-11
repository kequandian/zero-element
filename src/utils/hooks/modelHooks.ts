
/**
 * 包括 网络请求 在内的，对 model state 修改的 封装
 *
 * @export
 * @param {props} props
 * @param {options} options
 * @returns {modelHooksSet}
 */
declare function modelHooks(props: props, options: options): modelHooksSet;

export default modelHooks;

export interface modelHooksSet {

  /**
   * 获取组件对应的 model state
   *
   * @param {*} defaultValue 若 undefined，则返回的 默认值
   * @memberof modelHooksSet
   */
  getSelfModelStatus(defaultValue);
  /**
   * 保存数据到 model 对应的 state 里面
   * @param data 需要保存的数据
   */
  setSelfModelStatus(data: Object);

  /**
   * 发出网络请求，保存数据
   *
   * @param {('fetchList' | 'fetchOne' | 'createForm' | 'updateForm' | 'deleteOne')} name
   * @param {fetchData} date
   * @returns {Promise<Function>}
   * @memberof modelHooksSet
   */
  fetch(
    name: 'fetchList' | 'fetchOne' | 'createForm' | 'updateForm' | 'deleteOne',
    date: fetchData
  ): Promise<Function>;

  /**
   * 保存数据到 model。
   * 区别于 setSelfModelStatus 的是，save 可保存到任意位置
   *
   * @param {fetchData} date
   * @memberof modelHooksSet
   */
  save(date: saveDate): void;
}

export interface props {
  /**
   * 当前 model 的 state
   */
  modelStatus: Object;
  /**
   * ZeroElement 封装过的 dispatch
   */
  dispatch: Object;
}



export interface options {
  /**
   * 这个组件会把数据保存在 model 的哪个位置
   */
  modelPath: String;
}

export interface fetchData {
  /**
   * 重新指定数据保存在 model 的位置
   */
  MODELPATH?: String;
  /**
   * 直接返回 网络请求 的结果
   */
  DIRECTRETURN?: String;
  /**
   * 修改 网络请求 的 API
   */
  API?: String;
  /**
   * 随请求发送的数据
   */
  payload: Object;
}

export interface saveDate {
  /**
   * 直接保存的数据
   */
  payload: Object;
}