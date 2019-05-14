
/**
 * 在组件将要挂载时调用一次函数
 *
 * @export
 * @param {Function} func 执行的函数
 */
declare function useWillMount(func: Function): void

/**
 * 在组件已挂载时调用一次函数
 *
 * @export
 * @param {Function} func 执行的函数
 */
declare function useDidMount(func: Function): void

/**
 * 在组件将要卸载时调用一次函数
 *
 * @export
 * @param {Function} func 执行的函数
 */
declare function useWillUnmount(func: Function): void


export {
  useWillMount,
  useDidMount,
  useWillUnmount,
}