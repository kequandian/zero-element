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
  useModel() {
    const [, setState] = useState();
    useEffect(() => {
      // 初始订阅，或者取消订阅之后新的订阅
      const index = this.queue.length;
      this.queue.push(setState);
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
        this.state = {
          ...this.getState(),
          ...rst,
        };
        // 触发 state 更新
        this.queue.forEach(setState => setState(this.state));
      }
    } else {
      console.warn(`未定义的方法: ${action}`);
    }
  }
}