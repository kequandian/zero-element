import { getPageContext } from '../../components/EventProxy/PageContext';

function saveToItems(value, props) {
  const { data, field, options } = props;
  const { index } = data;
  const { requester, dataPool } = getPageContext();
  const formData = dataPool.getToFormAll();
  const { itemsField } = options;
  const items = [...formData[itemsField]];

  items[index][field] = value;

  requester.save({
    payload: {
      'formData': {
        ...dataPool.getToFormAll(),
        [itemsField]: [
          ...items
        ],
      },
    }
  });
}
export {
  saveToItems,
}