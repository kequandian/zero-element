import { useState, useEffect } from 'react';

export default class Permission {
  constructor({ perm }) {
    this.queue = [];
    this.perm = {};
  }
  usePermission() {
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
    return [
      this.perm,
      {
        setPerm: this.setPerm.bind(this),
        delPerm: this.delPerm.bind(this),
      }
    ];
  }
  dispatchUpdate() {
    this.queue.forEach(setState => setState({}));
  }
  setPerm(perm) {
    this.handlePerm(perm, true);
  }
  delPerm(perm) {
    this.handlePerm(perm, false);
  }
  handlePerm(perm, type) {
    const rst = {};
    if (!Array.isArray(perm)) {
      perm = [perm];
    }
    perm.forEach(key => {
      rst[key] = type;
    });

    this.perm = {
      ...this.perm,
      ...rst,
    };
    this.dispatchUpdate();
  }
}