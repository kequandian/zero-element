import React from 'react';
import { BaseEnter } from '../components/Animation';

import { Render } from 'zero-element-global/lib/baseComponents';
import { Render as RenderLayout } from 'zero-element-global/lib/layout';

export function UseLayout(props) {
  const { n, ...restProps } = props;

  return <RenderLayout n={n} {...restProps} />;
}

export function UseItem(props) {
  const { config } = props;
  const { component } = config;

  return <BaseEnter {...config}>
    <Render n={component} {...props} />
  </BaseEnter>;
}