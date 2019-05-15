import React from 'react';
import { BaseEnter } from '../components/Animation';

import { Render } from 'zero-element-global/lib/baseComponents';
import { Render as RenderLayout } from 'zero-element-global/lib/layout';

export function UseLayout(props) {
  const { n, ...restProps } = props;

  return <RenderLayout n={n} {...restProps} />;
}

export function UseItem(props) {
  const { namespace, config } = props;
  const { layout, component, config: itemCfg, ...restCfg } = config;

  return <BaseEnter {...config}>
    <UseLayout n={layout} config={itemCfg} {...restCfg}>
      <Render n={component} namespace={namespace} config={itemCfg} />
    </UseLayout>
  </BaseEnter>;
}