import Zele from '@/ZEle';

import { set as APIConfig } from 'zero-element-global/lib/APIConfig';

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