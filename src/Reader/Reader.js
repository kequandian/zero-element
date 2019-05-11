import React, { Component } from 'react';
import { getMainLayout, getItem } from './utils/readConfig';


export default class Reader extends Component {

  render() {
    const { config = {}, ...restProps } = this.props;
    const MainLayout = getMainLayout(config.layout);
    return (
      <MainLayout key="mainLayout" {...(config.config || {})}>
        {config.items && config.items.map((itemCfg, index) => getItem(itemCfg, index, restProps))}
      </MainLayout>
    );
  }
}