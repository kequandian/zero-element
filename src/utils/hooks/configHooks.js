import React, { useState, useEffect } from 'react';
import { getPerm, checkPerm } from '../permission';

export default function ConfigProxy(props) {
  const [config, setConfig] = useState({});
  const perm = getPerm();

  useEffect(() => {
    setConfig({
      ...configFilter(props.config),
    });
  }, [props.config, perm]);

  return React.cloneElement(props.children, {
    config,
  });
}

function configFilter(config) {
  const { items = [], ...restConfig } = config;
  const filter = [];
  let status403 = false; // 确保只插入一个 403 组件

  items.forEach((item) => {
    const { config = {} } = item;
    if (config.permission) {
      if (!checkPerm(config.permission, config.location)) {
        if (status403 === false) {
          status403 = true;
          filter.push({
            layout: 'Grid',
            component: '403',
          });
        }
        return false;
      }
    }
    filter.push(item);
  });

  return {
    ...restConfig,
    items: filter,
  }
}