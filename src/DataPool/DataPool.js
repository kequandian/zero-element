import window from '@/utils/window';
import qs from 'qs';

export default class DataPool {
  constructor({ namespace }) {
    this.namespace = namespace;
    this.record = {};
    this.location = this.getLocationSearch();
  }
  getDataPool() {
    return this;
  }
  setRecord(data) {
    this.record = data;
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
  }
}