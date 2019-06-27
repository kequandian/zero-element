import { useState, useEffect } from 'react';

const shareStorage = {};

/**
 * 用于在组件之间分享一些纯函数的方法
 *
 * @export
 * @param {object} options 配置
 * - share 分享的 key
 * @returns Hooks, 执行后返回以下组成的数组:
 * - {object} 当前已分享的数据
 * - {function} 设置新的分享
 * - {function} 销毁已有的分享
 */
export default function useShare(options) {
  const { share } = options;

  if (shareStorage[share] === undefined) {
    shareStorage[share] = new Share(share);
  }

  return shareStorage[share].useShare(options);
}

class Share {
  state = {};
  queue = [];
  constructor(share) {
    this.key = share;
  }
  useShare(options) {
    const [, set] = useState();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
      const symbol = Symbol(options.type);

      this.queue.push({
        set,
        symbol,
      });

      return () => {
        this.queue = this.queue.filter(i => i.symbol !== symbol);
      };
    });
    return [
      this.state,
      this.setData.bind(this),
      this.destroyShare.bind(this),
    ]
  }
  getData() {
    return this.state;
  }
  setData(data) {
    this.state = {
      ...this.state,
      ...data,
    }
    this.queue.forEach(i => i.set(this.state));
  }
  destroyShare(...keyList) {
    if (keyList.length === 0) {
      delete shareStorage[this.key];
      this.queue = [];
    } else {
      keyList.forEach(key => {
        delete this.state[key];
      })
    }
  }
}