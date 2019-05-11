import React from 'react';
import MUITable from 'mui-tables';
import locales from './locales';

const columns = {
  static: [
    {
      name: 'id',
      title: 'Id',
      isRowId: true,
      display: 'false',
      calculateCellDefinition: (entry) => {
        return {
          display: entry.id,
          value: entry.id,
        }
      }
    },
    {
      name: 'title',
      title: 'Title',
      isRowId: true,
      calculateCellDefinition: (entry) => {
        return {
          display: entry.title,
          value: entry.title,
        }
      }
    }
  ]
};

export default function Table({ data = [] }) {
  return <MUITable
    title={'Intro Table'}
    columns={columns}
    data={data}
    loading={false}
    translations={locales}
    toolbar={{
      showDates: true,
      startDate: new Date(Date.now() - 86400 * 1000),
      endDate: new Date(),
      startLabel: '开始时间',
      endLabel: '结束时间',
      handleDateChange: isStart => value => console.log(isStart, value),
    }}
    display={{
      // fixedSearch: true,
      search: false,
      download: true,
    }}
    rows={{
      rowHover: true,
      selectable: true,
    }}
  />
}