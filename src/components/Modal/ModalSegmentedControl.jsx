import React from 'react';

const ModalSegmentedControl = ({ activeTab = 'hourly', onTabChange }) => {
  return (
    <div
      style={{
        position: 'absolute',
        width: '390px',
        height: '49px',
        left: '0px',
        top: '0px',
        borderRadius: '0px',
        overflow: 'visible',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '111px',
          height: '20px',
          left: '32px',
          top: '55%',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
        }}
        onClick={() => onTabChange?.('hourly')}
      >
        <span
          style={{
            display: 'block',
            width: '111px',
            height: '20px',
            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '15px',
            lineHeight: '20px',
            letterSpacing: '-0.5px',
            color: 'rgba(235, 235, 245, 0.6)',
          }}
        >
          Hourly Forecast
        </span>
      </div>

      <div
        style={{
          position: 'absolute',
          width: '115px',
          height: '20px',
          left: '243px',
          top: '55%',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
        }}
        onClick={() => onTabChange?.('weekly')}
      >
        <span
          style={{
            display: 'block',
            width: '115px',
            height: '20px',
            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '15px',
            lineHeight: '20px',
            textAlign: 'right',
            letterSpacing: '-0.5px',
            color: 'rgba(235, 235, 245, 0.6)',
          }}
        >
          Weekly Forecast
        </span>
      </div>

      <div
        style={{
          position: 'absolute',
          width: '390px',
          height: '1px',
          left: '0px',
          bottom: '0px',
          background: 'rgba(255, 255, 255, 0.3)',
          mixBlendMode: 'overlay',
          boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.2)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          width: '390px',
          height: '5px',
          left: '0px',
          top: '40px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '111px',
            height: '3px',
            left: activeTab === 'hourly' ? '25px' : '243px',
            top: '0px',
            background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)',
            transition: 'left 0.3s ease',
          }}
        />
      </div>

    </div>
  );
};

export default ModalSegmentedControl;
