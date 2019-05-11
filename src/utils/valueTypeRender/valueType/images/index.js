import React, { useState } from 'react';
import { Modal } from 'antd';
import { useDidMount } from '../../../hooks/lifeCycle';
import ImagesView from '../../../../components/BaseElement/ImageView';

export default function valueTypeImages({ data: { text } }) {
  const [url, setUrl] = useState('');
  useDidMount(() => {
    try {
      setUrl(JSON.parse(text)[0]);
    } catch (error) {
      setUrl(text);
    }
  });

  return <ImagesView url={url} />;
}