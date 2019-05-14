import React from 'react';

/**
 * 使用 Permission
 *
 * @param {options} options 可选以下属性
 * - namespace 默认 global
 * @return {Array} 返回 array, 为 [ permObj, { setPerm, delPerm } ]
 */
declare function usePermission(options: options): [
  Object,
  { setPerm, delPerm }
]

interface options {
  /**
   * Permission 的命名空间
   */
  namespace: String,
}

/**
 * 删除指定的 Permission
 *
 * @param {String} namespace namespace
 */
declare function removePermission(namespace: String): void


/**
 * 设置单个权限
 *
 * @param {String} perm 权限名
 */
declare function setPerm(perm: String): void

/**
 * 设置多个权限
 *
 * @param {Array} perm 权限名组成的数组
 */
declare function setPerm(perm: Array): void

/**
 * 移除单个权限
 *
 * @param {String} perm 权限名
 */
declare function delPerm(perm: String): void

/**
 * 移除多个权限
 *
 * @param {Array} perm 权限名组成的数组
 */
declare function delPerm(perm: Array): void

export {
  usePermission,
  removePermission,
  setPerm,
  delPerm,
}

interface Perm {
  /**
   * 检测的权限名
   */
  perm: String,
  /**
   * 检测不通过显示的组件
   */
  rej: React.ReactNode,
  /**
   * 权限所在的命名空间，默认 global
   */
  namespace: String,
  /**
   * 检测通过显示的组件
   */
  children: React.ReactNode,
}
declare class Perm extends React.Component<Perm> {
}
export default Perm