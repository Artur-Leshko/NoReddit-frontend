import React from 'react';

import { Select, SelectKinds, } from '../Inputs/Inputs';
import './sort.scss';

export const Sort = ({ title, className = '', items, selectedItemName, onItemChange, }) => {

  return (
    <div className={'sort ' + className}>
      <div className='sort__title'>{title}</div>
      <Select
        kind={SelectKinds.INFO}
        items={items}
        selectedItemName={selectedItemName}
        onItemChange={onItemChange}
      />
    </div>
  );
};
