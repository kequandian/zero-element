import React from 'react';
import { BaseEnter } from '../components/Animation';

import { Render } from '@/config/container';
import { Render as RenderLayout } from '@/config/layout';

export function UseLayout(props) {
  const { n = 'Empty', ...restProps } = props;

  return <RenderLayout n={n} {...restProps} />;
}

export function UseItem(props) {
  const { namespace, config, ...restProps } = props;
  const { layout, component, config: itemCfg, ...restCfg } = config;

  return <BaseEnter {...config}>
    <UseLayout n={layout} config={itemCfg} namespace={namespace} {...restCfg}>
      <Render n={component}
        namespace={namespace}
        config={itemCfg}
        {...restProps}
      />
    </UseLayout>
  </BaseEnter>;
}