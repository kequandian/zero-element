import { useState, useEffect } from 'react';

const sleep = ms => new Promise(res => setTimeout(_ => res(), ms));
const isPromise = func => {
  if (func instanceof Promise) return true;
  if (typeof func === 'object' && typeof func.then === 'function') return true;
  return false;
}

export default class Model {
  constructor(config) {
    this.state = {}
    this.queue = [];
    this.reducers = {
      save() {
        return {
          name: 'XiaoMing',
        }
      }
    };
    this.effects = {
      async test(payload, { state }) {
        console.log(111111, payload, state);
        await sleep(1000);
        console.log('ok!');
      }
    };
    this.namespace = '';
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
  dispatch({ type, payload }) {
    const action = this.reducers[type] || this.effects[type];
    if (action) {
      const rst = action(payload, {
        state: this.getState(),
        // put: this.dispatch,
      });
      if (isPromise(rst)) {
        // rst.then();
      } else {
        this.state = {
          ...this.getState(),
          ...rst,
        };
        // 触发 state 更新
        this.queue.forEach(setState => setState(this.state));
      }
    }
  }
}