import React from 'react';
import TabBarBack from './TabBarBack.jsx';
import TabBarFront from './TabBarFront.jsx';

const TabBar = ({ onOpenSearch }) => {
  return (
    <div
      className="relative w-[390px]"
      style={{ height: '100px', overflow: 'visible' }}
    >
      <TabBarBack onOpenSearch={onOpenSearch} />
      <TabBarFront />
    </div>
  );
};

export default TabBar;