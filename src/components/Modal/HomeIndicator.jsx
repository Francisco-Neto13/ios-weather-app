import React from 'react';

const HomeIndicator = () => {
  return (
    <div
      style={{
        position: 'absolute',
        width: '390px',
        height: '20px',
        left: '0px',
        top: '10px',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '48px',
          height: '5px',
          left: 'calc(50% - 24px)',
          top: '0px',
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '10px',
        }}
      />
    </div>
  );
};

export default HomeIndicator;
