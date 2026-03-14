import React, { useEffect, useState } from 'react';

const SignalIcon = () => (
  <svg width="19" height="12" viewBox="0 0 19 12" fill="none" aria-hidden="true">
    <rect x="0" y="7" width="3" height="5" rx="1" fill="#FFFFFF" />
    <rect x="5" y="5" width="3" height="7" rx="1" fill="#FFFFFF" />
    <rect x="10" y="3" width="3" height="9" rx="1" fill="#FFFFFF" />
    <rect x="15" y="1" width="3" height="11" rx="1" fill="#FFFFFF" />
  </svg>
);

const WifiIcon = () => (
  <svg width="17" height="12" viewBox="0 0 17 12" fill="none" aria-hidden="true">
    <path
      d="M1 4.25C5.67 0.8 11.33 0.8 16 4.25"
      stroke="#FFFFFF"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.95"
    />
    <path
      d="M3.4 7C6.6 4.65 10.4 4.65 13.6 7"
      stroke="#FFFFFF"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.95"
    />
    <circle cx="8.5" cy="9.6" r="1.25" fill="#FFFFFF" />
  </svg>
);

const BatteryIcon = () => (
  <svg width="27" height="13" viewBox="0 0 27 13" fill="none" aria-hidden="true">
    <rect x="1" y="1" width="23" height="11" rx="3" stroke="#FFFFFF" strokeOpacity="0.4" />
    <rect x="3" y="3" width="19" height="7" rx="2" fill="#FFFFFF" />
    <rect x="25" y="4" width="2" height="5" rx="1" fill="#FFFFFF" fillOpacity="0.45" />
  </svg>
);

const formatDeviceTime = (date = new Date()) => {
  let hours = date.getHours() % 12;
  if (hours === 0) hours = 12;
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

const StatusBar = ({ time }) => {
  const [deviceTime, setDeviceTime] = useState(formatDeviceTime());

  useEffect(() => {
    if (time) return undefined;
    const tick = () => setDeviceTime(formatDeviceTime());
    tick();
    const interval = setInterval(tick, 30 * 1000);
    return () => clearInterval(interval);
  }, [time]);

  const displayTime = time ?? deviceTime;

  return (
    <div
      style={{
        position: 'absolute',
        left: '0px',
        right: '0px',
        top: '6px',
        height: '47px',
        zIndex: 24,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '164px',
          height: '32px',
          left: 'calc(50% - 82px)',
          top: '-2px',
          background: '#000000',
          visibility: 'hidden',
        }}
      />

      <div
        style={{
          position: 'absolute',
          width: '54px',
          height: '21px',
          left: '27px',
          top: '14px',
          borderRadius: '24px',
        }}
      >
        <span
          style={{
            position: 'absolute',
            width: '54px',
            height: '20px',
            left: '0px',
            top: '1px',
            fontFamily: "'SF Pro Text', -apple-system, sans-serif",
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '17px',
            lineHeight: '22px',
            textAlign: 'center',
            letterSpacing: '-0.408px',
            color: '#FFFFFF',
          }}
        >
          {displayTime}
        </span>
      </div>

      <div
        style={{
          position: 'absolute',
          right: '27px',
          top: '19px',
          display: 'flex',
          alignItems: 'center',
          gap: '7px',
        }}
      >
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </div>
    </div>
  );
};

export default StatusBar;
