import React from 'react';
import { TabPanelProps } from './TabPanel.types';

export const TabPanel: React.FC<TabPanelProps> = ({ value, index, children }) => {
  if (index !== value) {
    return (<></>);
  }

  return (
    <>
      {children}
    </>
  );
};
