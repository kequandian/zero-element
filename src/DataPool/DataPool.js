import window from '@/utils/window';
import qs from 'qs';

function getSearch(location) {
  if(location.search) {
    return location.search.replace('?', '');
  } else {
    return location.hash.split('?')[1] || '';
  }
}
function getPathname(location) {
  return location.pathname;
}

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
    const { location = {} } = window;
    if (location) {
      return qs.parse(getSearch(location));
    }
    return {};
  }
  getLocationPathname() {
    const { location = {} } = window;
    if (location) {
      return getPathname(location);
    }
    return '';
  }
  setLocation() {
    this.location = this.getLocationSearch();
  }
}