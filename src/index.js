import React from 'react';
import { useModel } from './Model';

export default (props) => {
  const [modelStatus, dispatch] = useModel(props);
  
  return <div>
    TestTestTest
    name: {modelStatus.name}
    <button onClick={() => dispatch({
      type: 'test',
      payload: {
        demo: 123456
      }
    })}>Click test</button>
    <button onClick={() => dispatch({
      type: 'save',
      payload: {
        demo: 123456
      }
    })}>Click save</button>
  </div>
}