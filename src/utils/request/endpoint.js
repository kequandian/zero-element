import { LS, SS } from '@/utils/storage';
import window from '@/utils/window';

export function get() {
  const winZEle = window.ZEle;
  if (winZEle.endpoint) {
    return winZEle.endpoint;
  }
  return SS.get('endpoint') || LS.get('endpoint');
}

export function set(endpoint, type) {
  if (type === undefined) {
    window.ZEle.endpoint = endpoint;
  }
}