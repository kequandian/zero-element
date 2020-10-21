import { LS, SS } from '../storage';

export function getToken() {
  return SS.get('token') || LS.get('token');
}

export function saveToken({ userName, token, avatar, permissions, remember, extra }) {
  if (remember) {
    if (token) {
      LS.set('token', token);
    }
    if (permissions) {
      LS.set('permissions', permissions);
    }
    if (avatar) {
      LS.set('avatar', avatar);
    }
    if (userName) {
      LS.set('userName', userName);
    }
    if (extra) {
      LS.set('extra', extra);
    }
  }
  else {
    if (token) {
      SS.set('token', token);
    }
    if (permissions) {
      SS.set('permissions', permissions);
    }
    if (avatar) {
      SS.set('avatar', avatar);
    }
    if (userName) {
      SS.set('userName', userName);
    }
    if (extra) {
      SS.set('extra', extra);
    }
  }
}

export function removeToken() {
  SS.clear();

  ['token', 'permissions', 'avatar', 'userName', 'extra'].forEach(key => {
    LS.del(key);
    SS.del(key);
  });
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

export function getUserName() {
  return SS.get('userName') || LS.get('userName');
}

export function getExtra() {
  return SS.get('extra') || LS.get('extra');
}