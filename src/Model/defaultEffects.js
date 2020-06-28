import { query, post, update, remove } from '@/utils/request';
import { get } from '@/config/APIConfig';
import { formatAPI } from '@/utils/format';

// const sleep = ms => new Promise(res => setTimeout(_ => res(), ms));

async function save({ key, payload }) {
  this[key] = payload;
}
async function setPageData({ key, payload }) {
  this._pageData[key] = payload;
}

async function fetchList({ API, payload }) {
  const fAPI = formatAPI(API, {
    namespace: this.namespace,
    data: this._pageData,
  });

  if (process.env.NODE_ENV === 'development') {
    console.log(`fetchList ${fAPI}`, payload);
  }

  const { data: result } = await query(fAPI, payload);
  if (result && result.code === 200) {
    if (Array.isArray(result.data)) {
      const records = result.data;
      this.records = records;

    } else {
      const data = result.data;
      this.records = {
        ...data,
        current: data[get('RESPONSE_FIELD_current')],
        pageSize: data[get('RESPONSE_FIELD_pageSize')],
        total: data[get('RESPONSE_FIELD_total')],
        records: data[get('RESPONSE_FIELD_records')],
      };
    }

  } else {
    this.records = { records: [] };
  }

  return result;
}

async function deleteOne({ API, payload }) {
  const fAPI = formatAPI(API, {
    namespace: this.namespace,
    data: this._pageData,
  });

  const { data: result } = await remove(fAPI, payload);
  if (result && result.code === 200) {
    console.log('删除成功');
  }
  return result;
}

async function fetchOne({ API, payload }) {
  const fAPI = formatAPI(API, {
    namespace: this.namespace,
    data: this._pageData,
  });

  const { data: result } = await query(fAPI, payload);

  if (result && result.code === 200) {
    this.formData = {
      ...result.data,
    };
  } else {
    this.formData = {};
  }
  return result;
}

async function createForm({ API, payload, options }) {
  const fAPI = formatAPI(API, {
    namespace: this.namespace,
    data: this._pageData,
  });

  const { data: result } = await post(fAPI, payload, options);

  if (result && result.code === 200) {
    console.log('添加数据成功');
  }
  return result;
}

async function updateForm({ API, payload, options }) {
  const fAPI = formatAPI(API, {
    namespace: this.namespace,
    data: this._pageData,
  });

  const { data: result } = await update(fAPI, payload, options);

  if (result && result.code === 200) {
    console.log('修改数据成功');
  }
  return result;
}

function setRecord(payload) {
  this.record = payload;
}

const effects = {
  save,
  setPageData,

  fetchList,
  deleteOne,
  fetchOne,
  createForm,
  updateForm,

  setRecord,
};

export default effects;