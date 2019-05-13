import Zele from '@/ZEle';

import { set } from '@/global/baseComponents';
import BaseList from '@/container/list/BaseList';

import { set as APIConfig } from '@/global/APIConfig';

set({
  BaseList,
});

APIConfig({
  'DEFAULT_current': 1,
  'DEFAULT_pageSize': 10,
  'FIELD_current': 'current',
  'FIELD_pageSize': 'pageSize',
  'FIELD_total': 'total',
  'FIELD_records': 'records',
  'FIELD_PID': 'pid',
});

export default Zele;