import React, { Component } from 'react';
import { Input, Select, Radio, Checkbox } from 'antd';
import Number from './Number';
import TextArea from './TextArea';
import Group from './Group';
import Date from './Date';
import contrast from '../../utils/contrast';

export default {
  input: Input,
  select: class SelectWrapped extends Component {
    shouldComponentUpdate(nextProps, nextState) {
      return contrast(this.props, nextProps, ['value', 'options']);
    }
    
    render() {
      const { options = [], ...restProps } = this.props;
      return <Select {...restProps}>
        {options.map((option, i) =>
          <Select.Option value={option.value} key={i}>
            {option.title}
          </Select.Option>)}
      </Select>;
    }
  },
  radio: class RadioWrapped extends Component {
    shouldComponentUpdate(nextProps, nextState) {
      return contrast(this.props, nextProps, ['value', 'options']);
    }

    render() {
      const { options = [], ...restProps } = this.props;
      return <Radio.Group {...restProps}>
        {options.map((option, i) =>
          <Radio value={option.value} key={i}>
            {option.title}
          </Radio>)}
      </Radio.Group>;
    }
  },
  checkbox: class CheckboxWrapped extends Component {
    shouldComponentUpdate(nextProps, nextState) {
      return contrast(this.props, nextProps, ['value', 'options']);
    }

    render() {
      const { options = [], ...restProps } = this.props;
      return <Checkbox.Group
        options={options.map(item => ({
          ...item,
          label: item.title,
        }))}
        {...restProps}
      />;
    }
  },
  number: Number,
  textArea: TextArea,
  group: Group,
  date: Date('date'),
  week: Date('week'),
  month: Date('month'),
  range: Date('range'),
  plain: class Plain extends Component {
    render() {
      return this.props.value || null;
    }
  },
}