import { query, post, update, remove } from '@/utils/request';
import { get } from '@/config/APIConfig';
// const sleep = ms => new Promise(res => setTimeout(_ => res(), ms));

async function fetchList({ API, payload, DIRECTRETURN, MODELPATH }, { put }) {
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
      const data = result.data;
      await put({
        type: 'save',
        payload: {
          [MODELPATH]: {
            ...data,
            current: data[get('RESPONSE_FIELD_current')],
            pageSize: data[get('RESPONSE_FIELD_pageSize')],
            total: data[get('RESPONSE_FIELD_total')],
            records: data[get('RESPONSE_FIELD_records')],
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

async function deleteOne({ API, payload }) {
  console.log("deleteOne to :", API);
  const { data: result } = await remove(API, payload);
  if (result && result.code === 200) {
    console.log('删除成功');
  }
  return result;
}

async function fetchOne({ API, payload, DIRECTRETURN, MODELPATH }, { put }) {
  console.log("fetchOne to :", API);
  const { data: result } = await query(API, payload);

  if (result && result.code === 200) {
    if (DIRECTRETURN) { // 直接返回请求结果，供程序自行处理以完成其它业务逻辑
      return result;
    }
    await put({
      type: 'save',
      payload: {
        [MODELPATH]: {
          ...result.data,
        },
      }
    })
  } else {
    await put({
      type: 'save',
      payload: {
        [MODELPATH]: {},
      }
    })
  }
  return result;
}

async function createForm({ API, payload, options }, { put }) {
  console.log("createForm to :", API);
  // 如果是下载的 response, 那就使用默认值 { data: {code: 200} }
  const { data: result } = await post(API, payload, options) || { data: { code: 200 } };

  if (result && result.code === 200) {
    console.log('添加数据成功');
  }
  return result;
}

async function updateForm({ API, payload, options }, { put }) {
  console.log("updateForm to :", API);
  // 如果是下载的 response, 那就使用默认值 { data: {code: 200} }
  const { data: result } = await update(API, payload, options) || { data: { code: 200 } };

  if (result && result.code === 200) {
    console.log('修改数据成功');
  }
  return result;
}

const effects = {
  fetchList,
  deleteOne,
  fetchOne,
  createForm,
  updateForm,
};
export default effects;