import React, { useState } from 'react';
import { Motion, spring, presets } from 'react-motion';
import { useDidMount } from '@/utils/hooks/lifeCycle';

export default function BaseEnter({ children }) {
  const [offsetY, setOffsetY] = useState(20);
  const [opacity, setOpacity] = useState(0);

  useDidMount(_ => {
    setOffsetY(0);
    setOpacity(1);
  });

  return <Motion style={{
    x: spring(offsetY, presets.noWobble),
    opacity: spring(opacity, presets.noWobble),
  }}>
    {interpolatingStyle => {
      const style = {};
      if (interpolatingStyle.x !== 0) {
        style.transform = `translateY(${interpolatingStyle.x}px)`;
        style.opacity = interpolatingStyle.opacity;
      }
      return React.cloneElement(children, {
        style,
      });
    }}
  </Motion>
}