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
          width: '240px',
          height: '41px',
          left: 'calc(50% - 120px)',
          top: '0px',
          fontFamily: "'SF Pro Display', -apple-system, sans-serif",
          fontWeight: 400,
          fontSize: '34px',
          lineHeight: '41px',
          textAlign: 'center',
          letterSpacing: '0.374px',
          color: '#FFFFFF',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          opacity: contentOpacity,
        }}
        title={city}
      >
        {city}
      </span>

      <div
        style={{
          position: 'absolute',
          width: '220px',
          height: '24px',
          left: 'calc(50% - 110px)',
          top: '39px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          opacity: contentOpacity,
        }}
      >
        <span
          style={{
            flexShrink: 0,
            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '24px',
            textAlign: 'center',
            letterSpacing: '0.38px',
            color: 'rgba(235, 235, 245, 0.6)',
            whiteSpace: 'nowrap',
          }}
        >
          {temperature}
        </span>
        <span
          style={{
            minWidth: 0,
            fontFamily: "'SF Pro Display', -apple-system, sans-serif",
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '24px',
            textAlign: 'center',
            letterSpacing: '0.38px',
            color: 'rgba(235, 235, 245, 0.6)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          title={condition}
        >
          {condition}
        </span>
      </div>
    </div>
  );
};

export default WeatherDetailsHeader;

