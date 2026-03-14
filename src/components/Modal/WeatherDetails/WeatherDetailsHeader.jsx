import React from 'react';

const WeatherDetailsHeader = ({
  city = 'Montreal',
  temperature = '19\u00B0',
  condition = 'Mostly Clear',
  contentOpacity = 1,
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '74px',
      }}
    >
      <span
        style={{
          position: 'absolute',
          width: '129px',
          height: '41px',
          left: 'calc(50% - 64.5px)',
          top: '0px',
          fontFamily: "'SF Pro Display', -apple-system, sans-serif",
          fontWeight: 400,
          fontSize: '34px',
          lineHeight: '41px',
          textAlign: 'center',
          letterSpacing: '0.374px',
          color: '#FFFFFF',
          whiteSpace: 'nowrap',
          opacity: contentOpacity,
        }}
      >
        {city}
      </span>

      <span
        style={{
          position: 'absolute',
          width: '32px',
          height: '24px',
          left: 'calc(50% - 80px)',
          top: '39px',
          fontFamily: "'SF Pro Display', -apple-system, sans-serif",
          fontWeight: 600,
          fontSize: '20px',
          lineHeight: '24px',
          textAlign: 'center',
          letterSpacing: '0.38px',
          color: 'rgba(235, 235, 245, 0.6)',
          whiteSpace: 'nowrap',
          opacity: contentOpacity,
        }}
      >
        {temperature}
      </span>

      <span
        style={{
          position: 'absolute',
          width: '125px',
          height: '24px',
          left: 'calc(50% - 45.5px)',
          top: '39px',
          fontFamily: "'SF Pro Display', -apple-system, sans-serif",
          fontWeight: 600,
          fontSize: '20px',
          lineHeight: '24px',
          textAlign: 'center',
          letterSpacing: '0.38px',
          color: 'rgba(235, 235, 245, 0.6)',
          whiteSpace: 'nowrap',
          opacity: contentOpacity,
        }}
      >
        {condition}
      </span>
    </div>
  );
};

export default WeatherDetailsHeader;

