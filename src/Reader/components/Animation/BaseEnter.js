import React, { useState } from 'react';
import { Motion, spring, presets } from 'react-motion';
import { useDidMount } from '@/utils/hooks/lifeCycle';

export default function BaseEnter({ children }) {
  const [offsetY, setOffsetY] = useState(20);
  useDidMount(_ => {
    setOffsetY(0);
  });

  return <Motion style={{ x: spring(offsetY, presets.noWobble) }}>
    {interpolatingStyle => {
      const style = {};
      if (interpolatingStyle.x !== 0) {
        style.transform = `translateY(${interpolatingStyle.x}px)`
      }
      return (
        <div style={style}>
          {children}
        </div>
      )
    }}
  </Motion>
}