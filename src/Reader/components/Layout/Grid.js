import React from 'react';
import { Row, Col } from 'antd';

export default ({ children }) => {
  return <Row>
    { React.Children.map( children, (child,index) => {
      return <Col sm={ child.props.span } xs={ 24 }>
        { child }
      </Col>
    } ) }
  </Row>
}