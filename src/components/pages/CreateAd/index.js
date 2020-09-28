import React from 'react';
import { tabItems } from './createAdHelper';
import { TabComponent } from '../..';

function CreateAD() {
  return (
    <div>
      <TabComponent tabItems={tabItems} />
    </div>
  );
}

export default CreateAD;
