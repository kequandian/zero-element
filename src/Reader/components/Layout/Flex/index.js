import React from 'react';
import Flex from './Flex';
import FlexItem from './FlexItem';


export default ({ align, justify, children }) => {
  return <Flex align={align} justify={justify}>
    {React.Children.map(children, (child) => {
      const span = child.props.span || '';
      const style = {};
      const flex = isNaN(Number(span)) ? undefined : Number(span);

      if (flex === undefined) {
        style.width = span;
      }

      return <FlexItem flex={flex} style={style}>
        {child}
      </FlexItem>
    })}
  </Flex>
};