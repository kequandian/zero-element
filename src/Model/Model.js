/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

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
      // 初始订阅，或者取消订阅之后新的订阅
      const symbol = Symbol(options.type);
      this.queue.push({
        type: options.type,
        symbol,
        setState,
      });
      return () => {
        // 更新后取消订阅
        this.queue = this.queue.filter(item => item.symbol !== symbol);
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
  update() {
    this.queue.forEach(item => item.setState({}));
  }
  dispatch(data) {
    const { type } = data;

    // reducers
    if (this.reducers[type]) {
      const action = this.reducers[type];
      const rst = action(data, {
        state: this.getState(),
      });
      this.setState(rst);
      // 触发 state 更新
      this.update();
      return;
    }
    // effects
    else if (this.effects[type]) {
      const action = (...arg) => new Promise((res, rej) => {
        this.dispatch({
          type: 'loading',
          payload: {
            loading: true,
            effect: type,
          }
        });
        const rst = this.effects[type](...arg);
        rst.then(res).catch(rej);
      }).finally(_ => {
        this.dispatch({
          type: 'loading',
          payload: {
            loading: false,
            effect: type,
          }
        });
      });

      return action(data, {
        state: this.getState(),
        put: this.dispatch.bind(this),
      });
    }

    console.warn(`未定义的方法: ${type}`);
  }
}