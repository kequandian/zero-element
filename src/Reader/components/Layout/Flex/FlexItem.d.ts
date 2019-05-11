import * as React from 'react';

export interface FlexItemProps {
  flex?: Number;
  style?: React.CSSProperties;
  className?: String;
}

declare class FlexItem extends React.Component<FlexItemProps, any> {
}
export default FlexItem