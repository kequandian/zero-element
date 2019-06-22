import { LS, SS } from '../storage';

export function getToken() {
  return SS.get('token') || LS.get('token');
}

export function saveToken({ account, token, avatar, permissions, remember }) {
  if (remember) {
    LS.set('token', token);
    LS.set('permissions', permissions);
    LS.set('avatar', avatar);
  }
  else {
    SS.set('token', token);
    SS.set('permissions', permissions);
    SS.set('avatar', avatar);
  }
}

export function removeToken() {
  SS.clear();

  ['token', 'permissions', 'avatar'].forEach(key => {
    LS.del(key);
  })
}

export function getAccount() {
  const token = SS.get('token') || LS.get('token');
  if (token === undefined || token === null) {
    return null;
  }

  if (token.split('\.').length !== 3) {
    try {
      const str = new Buffer(token, 'base64').toString();
      const jsonObject = JSON.parse(str);
      return jsonObject.login_name;
    }
    catch (e) {
    }
    return null;
  }
  const str = new Buffer(token.split('\.')[1], 'base64').toString();
  return str.split(',')[2].split(':')[1].replace(/\"/g, "");
}

export function getUserId() {
  const token = SS.get('token') || LS.get('token');
  if (token === undefined || token === null) {
    return null;
  }

  if (token.split('\.').length !== 3) {
    try {
      const str = new Buffer(token, 'base64').toString();
      const jsonObject = JSON.parse(str);
      return jsonObject.login_name;
    }
    catch (e) {
    }
    return null;
  }
  const str = new Buffer(token.split('\.')[1], 'base64').toString();
  return str.split(',')[1].split(':')[1].replace(/\"/g, "");
}
export function setAvatar(avatar) {
  SS.set('avatar', avatar);
  LS.set('avatar', avatar);
}

export function getAvatar() {
  return SS.get('avatar') || LS.get('avatar');
}