import React, { useState } from 'react';

const DEFAULT_BIG_ICON = '/widgets/big/moon-cloud-mid-rain.png';

const WeatherWidget = ({
  city = 'Montreal, Canada',
  temperature = '19\u00B0',
  condition = 'Mid Rain',
  highLow = 'H:24\u00B0  L:18\u00B0',
  icon = DEFAULT_BIG_ICON,
  onSelect,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const isInteractive = typeof onSelect === 'function';

  return (
    <button
      type="button"
      aria-label={`Select ${city}`}
      disabled={!isInteractive}
      style={{
        position: 'relative',
        width: '342px',
        height: '184px',
        padding: 0,
        border: 'none',
        background: 'transparent',
        flexShrink: 0,
        borderRadius: '22px',
        overflow: 'hidden',
        boxSizing: 'border-box',
        cursor: isInteractive ? 'pointer' : 'default',
        textAlign: 'left',
        transform: isPressed && isInteractive ? 'scale(0.985)' : 'scale(1)',
        filter: isPressed && isInteractive ? 'brightness(1.04)' : 'brightness(1)',
        transition: 'transform 0.16s ease, filter 0.16s ease',
      }}
      onPointerDown={() => setIsPressed(true)}
      onPointerUp={() => setIsPressed(false)}
      onPointerLeave={() => setIsPressed(false)}
      onPointerCancel={() => setIsPressed(false)}
      onClick={onSelect}
    >
      <svg
        width="342"
        height="175"
        viewBox="0 0 342 175"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', left: '0px', top: '0px' }}
      >
        <path
          d="M0 66.383C0 31.5888 0 14.1918 11.326 5.1838C22.6519 -3.82418 39.6026 0.0913375 73.5041 7.92237L307.903 62.0672C324.259 65.8452 332.436 67.7342 337.218 73.7465C342 79.7588 342 88.1519 342 104.938V130.943C342 151.685 342 162.056 335.556 168.5C329.113 174.943 318.742 174.943 298 174.943H44C23.2582 174.943 12.8873 174.943 6.44365 168.5C0 162.056 0 151.685 0 130.943V66.383Z"
          fill="url(#weatherWidgetGradient)"
        />
        <defs>
          <linearGradient
            id="weatherWidgetGradient"
            x1="0"
            y1="127.943"
            x2="354.142"
            y2="127.943"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#5936B4" />
            <stop offset="1" stopColor="#362A84" />
          </linearGradient>
        </defs>
      </svg>

      {icon ? (
        <img
          src={icon}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: '160px',
            height: '160px',
            left: '178px',
            top: '-12px',
            objectFit: 'contain',
          }}
        />
      ) : null}

      <span
        style={{
          position: 'absolute',
          left: '20px',
          top: '57px',
          fontFamily: "'SF Pro Display', -apple-system, sans-serif",
          fontWeight: 400,
          fontSize: '64px',
          lineHeight: '41px',
          letterSpacing: '0.374px',
          color: '#FFFFFF',
        }}
      >
        {temperature}
      </span>

      <div
        style={{
          position: 'absolute',
          left: '20px',
          top: '124px',
          width: '184px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0px',
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: "'SF Pro Text', -apple-system, sans-serif",
            fontWeight: 400,
            fontSize: '13px',
            lineHeight: '18px',
            letterSpacing: '-0.078px',
            color: 'rgba(235, 235, 245, 0.6)',
          }}
        >
          {highLow}
        </p>
        <p
          title={city}
          style={{
            margin: 0,
            fontFamily: "'SF Pro Text', -apple-system, sans-serif",
            fontWeight: 400,
            fontSize: '15px',
            lineHeight: '18px',
            letterSpacing: '-0.078px',
            color: '#FFFFFF',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {city}
        </p>
      </div>

      <span
        title={condition}
        style={{
          position: 'absolute',
          left: '230px',
          top: '142px',
          width: '88px',
          fontFamily: "'SF Pro Text', -apple-system, sans-serif",
          fontWeight: 400,
          fontSize: '13px',
          lineHeight: '18px',
          letterSpacing: '-0.078px',
          textAlign: 'right',
          color: '#FFFFFF',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {condition}
      </span>
    </button>
  );
};

export default WeatherWidget;
