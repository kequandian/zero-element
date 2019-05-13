import { query, post, update, remove } from '@/utils/request';
// const sleep = ms => new Promise(res => setTimeout(_ => res(), ms));

async function fetchList({ API, payload, DIRECTRETURN = false, MODELPATH = 'listData' }, { put }) {
  console.log("fetchList to :", API, MODELPATH);

  const { data: result } = await query(API, payload);
  if (result && result.code === 200) {
    if (DIRECTRETURN) { // 直接返回请求结果，供程序自行处理以完成其它业务逻辑
      return result;
    }
    if (Array.isArray(result.data)) {
      const records = result.data;
      await put({
        type: 'save',
        payload: {
          [MODELPATH]: {
            records,
          },
        }
      })
    } else {
      const { records, size: pageSize, ...rest } = result.data;
      await put({
        type: 'save',
        payload: {
          [MODELPATH]: {
            ...rest,
            pageSize,
            records,
          },
        }
      })
    }
  } else {
    await put({
      type: 'save',
      payload: {
        [MODELPATH]: { records: [] },
      }
    })
  }
  return result;

}

const effects = {
  fetchList,
};
export default effects;