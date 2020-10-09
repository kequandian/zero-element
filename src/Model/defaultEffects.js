import { query, post, update, remove } from '@/utils/request';
import { get } from '@/config/APIConfig';
import { formatAPI } from '@/utils/format';

// const sleep = ms => new Promise(res => setTimeout(_ => res(), ms));

async function save(key, payload) {
  this[key] = payload;
}

async function fetchList({ API, payload, extraData, dataPath = 'listData' }) {
  const fAPI = formatAPI(API, {
    namespace: this.namespace,
    data: extraData,
  });

  if (process.env.NODE_ENV === 'development') {
    console.log(`fetchList ${fAPI}`, dataPath, payload);
  }

  const { data: result } = await query(fAPI, payload).catch(err => {
    this[dataPath] = { records: [] };
    return {};
  })

  if (result && result.code === 200) {
    this.searchData = payload;
    if (Array.isArray(result.data)) {
      const records = result.data;

      if (!this[dataPath]) {
        this[dataPath] = {};
      }
      this[dataPath].records = records;

    } else {
      const data = result.data;
      this[dataPath] = {
        ...data,
        current: data[get('RESPONSE_FIELD_current')],
        pageSize: data[get('RESPONSE_FIELD_pageSize')],
        total: data[get('RESPONSE_FIELD_total')],
        records: data[get('RESPONSE_FIELD_records')],
      };
    }

  } else {
    this[dataPath] = { records: [] };
  }

  return result;
}

async function deleteOne({ API, payload, extraData }) {
  const fAPI = formatAPI(API, {
    namespace: this.namespace,
    data: extraData,
  });

  const { data: result } = await remove(fAPI, payload);
  if (result && result.code === 200) {
    console.log('删除成功');
  }
  return result;
}

async function fetchOne({ API, payload, extraData }) {
  const fAPI = formatAPI(API, {
    namespace: this.namespace,
    data: extraData,
  });

  const { data: result } = await query(fAPI, payload).catch(err => {
    this.formData = {};
    return {};
  })

  if (result && result.code === 200) {
    this.formData = {
      ...result.data,
    };
  } else {
    this.formData = {};
  }
  return result;
}

async function createForm({ API, payload, options, extraData }) {
  const fAPI = formatAPI(API, {
    namespace: this.namespace,
    data: extraData,
  });

  const { data: result } = await post(fAPI, payload, options);

  if (result && result.code === 200) {
    console.log('添加数据成功');
  }
  return result;
}

async function updateForm({ API, payload, options, extraData }) {
  const fAPI = formatAPI(API, {
    namespace: this.namespace,
    data: extraData,
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
  fetchList,
  deleteOne,
  fetchOne,
  createForm,
  updateForm,

  save,
  setRecord,
};

export default effects;