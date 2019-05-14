import Zele from '@/ZEle';

import { set } from 'zero-element-global/lib/baseComponents';
import BaseList from '@/container/list/BaseList';

import { set as APIConfig } from 'zero-element-global/lib/APIConfig';

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