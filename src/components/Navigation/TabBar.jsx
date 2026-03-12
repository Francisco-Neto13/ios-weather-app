import React from 'react';
import TabBarBack from './TabBarBack';
import TabBarFront from './TabBarFront.jsx';

const TabBar = () => {
  return (
    <div
      className="relative w-[390px]"
      style={{ height: '100px', overflow: 'visible' }}
    >
      <TabBarBack />
      <TabBarFront />
    </div>
  );
};

export default TabBar;