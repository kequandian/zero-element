import win from '@/utils/window';

export default function (data) {
  const handler = {
    get: function (target, name) {
      if (name === 'info') {
        return data;
      }
    },
    set: function (obj, prop, value) {
      return undefined;
    }
  };
  win.zele = new Proxy({}, handler);
}