import React, { Component } from 'react';
import { InputNumber } from 'antd';

export default class Number extends Component{
  render(){
    const { options = {}, ...restProps } = this.props;
    const { type, symbol = '￥' } = options;
    const numberProps = {
      ...restProps,
      ...( (typeMap[type] && typeMap[type](symbol)) || {} )
    };
    return <InputNumber {...numberProps} />;
  }
};

const typeMap = {
  currency: (symbol) => {
    return {
      formatter: ( value ) => `${symbol} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      parser: value => value.replace(/\D/g, ''),
      defaultValue: 0,
    }
  },
}