import React, { Component } from 'react';
import './index.css';

export default class Group extends Component{
  render(){
    const { id } = this.props;
    return <div className="Reader-Group">
      { id }
    </div>;
  }
};