import React from 'react';

const SunriseWidget = ({
  icon = '/widgets/sunrise.png',
  sunrise = '5:28 AM',
  sunset = '7:25 PM',
  progress = 0.5,
}) => {
  const dotX = progress * 132;
  const dotY = 38 - Math.sin(progress * Math.PI) * 52;

  return (
    <div
      style={{
        boxSizing: 'border-box',
        width: '164px',
        height: '164px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '22px',
        background: '#1f1a32',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: "'SF Pro Display', -apple-system, sans-serif",
        flexShrink: 0,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {icon && (
          <img src={icon} alt="Sunrise" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
        )}
        <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.5px', color: 'rgba(235, 235, 245, 0.6)', textTransform: 'uppercase' }}>
          Sunrise
        </span>
      </div>

      {/* Hora */}
      <p style={{ margin: 0, fontSize: '34px', fontWeight: 400, color: '#FFFFFF', lineHeight: 1 }}>{sunrise}</p>

      {/* Arco + sunset */}
      <div style={{ position: 'relative', height: '40px' }}>
        <svg width="132" height="40" viewBox="0 0 132 40" fill="none" style={{ position: 'absolute', bottom: '14px', left: 0 }}>
          <defs>
            <linearGradient id="sunGradient" x1="0" y1="0" x2="132" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#5B8EF0" />
              <stop offset="100%" stopColor="#C159EC" />
            </linearGradient>
          </defs>
          {/* Arco de fundo */}
          <path d="M0 38 Q66 -10 132 38" stroke="rgba(140,130,210,0.5)" strokeWidth="1.5" fill="none" />
          {/* Arco colorido */}
          <path d="M0 38 Q66 -10 132 38" stroke="url(#sunGradient)" strokeWidth="2" fill="none" />
          {/* Ponto */}
          <circle cx={dotX} cy={dotY} r="4" fill="#FFFFFF" opacity="0.9" />
        </svg>
        <span style={{ position: 'absolute', bottom: 0, left: 0, fontSize: '13px', color: 'rgba(235, 235, 245, 0.6)' }}>
          Sunset: {sunset}
        </span>
      </div>
    </div>
  );
};

export default SunriseWidget;


