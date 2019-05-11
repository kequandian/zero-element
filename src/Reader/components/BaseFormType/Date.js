import React, { Component } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

const { WeekPicker, MonthPicker, RangePicker } = DatePicker;
const componentMap = {
  'date': DatePicker,
  'week': WeekPicker,
  'month': MonthPicker,
  'range': RangePicker,
};
const formatMap = {
  'date': 'YYYY-MM-DD',
  'week': 'YYYY-W',
  'month': 'YYYY-MM',
  'range': 'YYYY-MM-DD',
}

export default (componentName) => {
  const Match = componentMap[componentName];
  return class DateWrapped extends Component {
    constructor(props) {
      super(props);
      const { value, options = {} } = props;
      const { nowTime = true } = options;
      this.state = {
        originalValue: value,
        value: initTime({
          value,
          nowTime,
          componentName,
        }),
      }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
      if (prevState.originalValue !== nextProps.value) {
        const { value, options = {} } = nextProps;
        const { nowTime = true } = options;
        return {
          originalValue: value,
          value: initTime({
            value,
            nowTime,
            componentName,
          }),
        };
      }
      return null;
    }
    componentDidMount() {
      const { originalValue, value } = this.state;

      // 初始值为空且 nowTime !== false 的情况下，保存当前时间到 model
      if (!originalValue && value) {
        const { onChange, options = {} } = this.props;
        const { format = formatMap[componentName] } = options;
        if (componentName === 'range') {
          onChange(value.map(item => item.format(format)));
        } else {
          onChange(value.format(format));
        }
      }
    }

    onChange = (moment, dateString) => {
      const { onChange, options = {} } = this.props;
      if (onChange) {
        onChange(dateString);
      }
    }
    render() {
      const { options = {}, onBlur, ...restProps } = this.props;
      const { format = formatMap[componentName] } = options;
      const { value } = this.state;
      const props = {
        showToday: true,
        ...restProps,
        value,
        format,
        allowClear: false,
        onChange: this.onChange,
      };

      return <Match {...props} />;
    }
  };
}

function initTime({ value, nowTime, componentName }) {
  if (value instanceof moment) {
    return value;
  }
  if (Array.isArray(value)) {
    if (value[0] instanceof moment) {
      return value;
    } else {
      return [moment(value[0]), moment(value[1])];
    }
  }
  if (value) {
    return moment(value);
  } else {
    return nowTime ?
      componentName === 'range'
        ? [moment(), moment()]
        : moment()
      : undefined;
  }
}