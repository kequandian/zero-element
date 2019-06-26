/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

const isPromise = func => {
  if (func instanceof Promise) return true;
  if (typeof func === 'object' && typeof func.then === 'function') return true;
  return false;
}

export default class Model {
  constructor({ namespace, state = {}, reducers = {}, effects = {}, auto }) {
    this.state = state;
    this.queue = [];
    // { demo: _=> {} }
    this.reducers = reducers;
    // { async demo: ({payload}, { state, put }) => await put({type,payload}) }
    this.effects = effects;
    this.namespace = namespace;
    this.auto = auto;
  }
  useModel(options) {
    const [, setState] = useState();
    useEffect(() => {
      const index = this.queue.length;
      // 初始订阅，或者取消订阅之后新的订阅
      this.queue.push({
        type: options.type,
        setState,
      });
      return () => {
        // 更新后取消订阅
        this.queue.splice(index, 1);
      };
    });
    return [this.getState(), this.dispatch.bind(this)];
  }
  getState() {
    return this.state;
  }
  setState(key, data) {
    if (typeof key === 'string') {
      this.state[key] = {
        ...(this.state[key] || {}),
        ...data,
      }
    } else {
      this.state = {
        ...this.getState(),
        ...key,
      }
    }
  }
  getModel() {
    return this;
  }
  dispatch(data) {
    const { type } = data;
    const action = this.reducers[type] || this.effects[type];
    if (action) {
      const rst = action(data, {
        state: this.getState(),
        put: this.dispatch.bind(this),
      });
      if (isPromise(rst)) {
        // effects
        return rst;
      } else {
        // reducers
        this.setState(rst);
        // 触发 state 更新
        const queue = [].concat(this.queue);
        this.queue.length = 0;
        queue.forEach(item => item.setState(this.state));
      }
    } else {
      console.warn(`未定义的方法: ${action}`);
    }
  }
}