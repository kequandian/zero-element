import win from '@/utils/window';
import qs from 'qs';

function getSearch(location) {
  if (location.search) {
    return location.search.replace('?', '');
  } else {
    return location.hash.split('?')[1] || '';
  }
}

function getPathname(location) {
  return location.pathname;
}

export function getLocationSearch() {
  const { location = {} } = win;
  if (location) {
    return qs.parse(getSearch(location));
  }
  return {};
}

export function getLocationPathname() {
  const { location = {} } = win;
  if (location) {
    return getPathname(location);
  }
  return '';
}