import React, { useState, useEffect } from 'react';
import { UseLayout, UseItem } from './utils/readConfig';
import { getLocationPathname, getLocationSearch } from '@/utils/location';
import { query } from '@/utils/request';
import global from '@/config/global';


export default function Reader(props) {
  const { namespace, config = {}, ...restProps } = props;
  const { remoteConfig = {} } = window.ZEle || {};

  const [canConfig, setCanConfig] = useState(_ => {
    const { removeConfig = true } = global;
    const pathname = getLocationPathname();
    const searchData = getLocationSearch();
    const matchItem = remoteConfig[pathname];

    if (process.env.NODE_ENV === 'production') {
      if (removeConfig && matchItem) {
        const { search } = matchItem;
        if (search && Array.isArray(search)) {
          const rst = search.every(key => searchData[key] !== undefined);
          if (!rst) return config;
        }
        getRemoteConfig(matchItem);
        return {
          layout: 'Loading',
        };
      }
    }
    return config;
  });

  useEffect(_ => {
    setCanConfig(config);
  }, [config]);

  function getRemoteConfig({ target, path }) {
    console.log(`页面 ${path} 使用了远端配置文件`);
    query(target).then(({ status, data }) => {
      if (status === 200) {
        if (data.code) {
          if (data.code === 200) {
            setCanConfig(data.data);
            return false;
          }
        } else {
          setCanConfig(data);
          return false;
        }
      }
      throw new Error('网络错误');
    })
      .catch(e => {
        if (e.message) {
          console.warn(e.message);
        }
        console.warn(`页面 ${path} 未能正常获取远端配置文件`);
        setCanConfig(config);
      })
  }

  if (typeof canConfig !== 'object') {
    throw new Error('canConfig is invalid');
  }

  return (
    <UseLayout n={canConfig.layout}
      title={canConfig.title}
      {...(canConfig.config || {})}
    >
      {canConfig.items && canConfig.items.map((itemCfg, i) =>
        <UseItem key={i}
          config={itemCfg}
          namespace={itemCfg.namespace || namespace}
          {...restProps}
        />
      )}
    </UseLayout>
  );
}