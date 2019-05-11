import React from 'react';
import './index.css';

const Flex = (props) => {
  const {
    align = 'center', justify = 'space-between',
    style = {}, className = '',
    children,
  } = props;
  const defaultStyle = {
    ...style,
    alignItems: align,
    justifyContent: justify,
  }
  const defaultClassName = `Zele-Layout-flex ${className}`;
  
  return <div style={defaultStyle} className={defaultClassName}>
    {children}
  </div>
}
export default Flex;