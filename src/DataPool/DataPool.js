/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import window from '@/utils/window';
import qs from 'qs';

export default class DataPool {
  constructor({ namespace }) {
    this.namespace = namespace;
    this.queue = [];
    this.record = {};
    this.location = this.getLocationSearch();
  }
  useDataPool() {
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
    return [{
      record: this.record,
      location: this.location,
    }, {
      setRecord: this.setRecord.bind(this),
      setLocation: this.setLocation.bind(this),
    }
    ];
  }
  dispatchUpdate() {
    this.queue.forEach(setState => setState({}));
  }
  setRecord(data) {
    this.record = data;
    this.dispatchUpdate();
  }
  getLocationSearch() {
    const { location } = window;
    if (location) {
      return qs.parse(location.search.replace('?', ''));
    }
    return {};
  }
  setLocation() {
    this.location = this.getLocationSearch();
    this.dispatchUpdate();
  }
}