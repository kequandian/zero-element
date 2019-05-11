import React from 'react';

const FlexItem = ({ children, style = {}, className = '', flex = '0 1 auto' }) => {
  const defaultStyle = {
    ...style,
    flex,
  }
  const defaultClassName = className;
  return <div style={ defaultStyle } className={ defaultClassName }>
    { children }
  </div>
}
export default FlexItem;