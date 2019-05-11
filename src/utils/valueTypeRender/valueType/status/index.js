import config from './status.config';

export default function valueTypeStatus(props) {
  const { options = {}, data: { text = '' } } = props;
  const { statusMap = {} } = options;
  return statusMap[text] || config[text] || text;
}