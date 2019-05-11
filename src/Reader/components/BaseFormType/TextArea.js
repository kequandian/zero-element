import React, { Component } from 'react';
import { Input } from 'antd';
import './index.css';

const { TextArea: AntdTextArea } = Input;

export default class TextArea extends Component {
  onChange = (e) => {
    const value = e.target.value;
    const { options = {} } = this.props;
    const { max } = options;

    if (this.props.onChange) {
      this.props.onChange(value.slice(0, max));
    }
  }

  render() {
    const { options = {}, value = '', ...restProps } = this.props;
    const { max = false, ...restOpt } = options;
    const textAreaProps = {
      rows: 3,
      value,
      ...restProps,
      ...restOpt,
    };

    return <div className="Reader-TextArea-box">
      <AntdTextArea {...textAreaProps} onChange={this.onChange} />
      <Tips value={value} max={max} />
    </div>;
  }
};
const Tips = ({ value, max }) => {
  const inputtedStyle = {
    color: getColor(value.length, max),
  }
  return <div className="Reader-TextArea-tips">
    已输入：
  <span style={inputtedStyle}>{value.length}</span>
    {max ? `/${max}` : null}
  </div>
}
function getColor(now, max) {
  if (!max) return '#bfbfbf';
  if (now === max) return 'rgb(255, 0, 0)';
  // 影响性能
  // if (!max) return '#bfbfbf';
  // return `rgb(${255 * (now / max)}, 0, 0)`;
}