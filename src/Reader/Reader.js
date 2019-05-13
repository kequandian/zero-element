import React from 'react';
import { UseLayout, UseItem } from './utils/readConfig';


export default function Reader(props) {
  const { namespace, config = {}, ...restProps } = props;

  return (
    <UseLayout n={config.layout} {...(config.config || {})}>
      {config.items && config.items.map((itemCfg, i) =>
        <UseItem key={i}
          config={itemCfg}
          namespace={itemCfg.namespace || namespace}
          {...restProps}
        />
      )}
    </UseLayout>
  );
}