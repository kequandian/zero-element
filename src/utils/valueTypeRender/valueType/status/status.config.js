let statusMap = {
  NORMAL: '正常',
  FORBIDDEN: '禁用',
};

function setStatusMap(newMap){
  statusMap = {
    ...statusMap,
    ...newMap,
  };
}

export default statusMap;
export {
  setStatusMap,
};