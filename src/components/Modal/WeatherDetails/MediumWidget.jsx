import React from 'react';

const MediumWidget = ({
  icon = '/widgets/air-quality.png',
  label = 'Air Quality',
  value = 3,
  description = 'Low Health Risk',
  progress = 0.18,
}) => {
  return (
    <div
      style={{
        boxSizing: 'border-box',
        width: '342px',
        height: '158px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '22px',
        background: '#1f1a32',
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontFamily: "'SF Pro Display', -apple-system, sans-serif",
        flexShrink: 0,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {/* Espaço para ícone PNG */}
        {icon && (
          <img
            src={icon}
            alt={label}
            style={{ width: '16px', height: '16px', objectFit: 'contain' }}
          />
        )}
        <span
          style={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.5px',
            color: 'rgba(235, 235, 245, 0.6)',
            textTransform: 'uppercase',
          }}
        >
          {label}
        </span>
      </div>

      {/* Valor + barra de progresso */}
      <div>
        <p
          style={{
            margin: '0 0 10px',
            fontSize: '22px',
            fontWeight: 600,
            color: '#FFFFFF',
            letterSpacing: '-0.3px',
          }}
        >
          {value} — {description}
        </p>
        <div
          style={{
            position: 'relative',
            height: '4px',
            borderRadius: '2px',
            background: 'rgba(255, 255, 255, 0.15)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '4px',
              width: '100%',
              borderRadius: '2px',
              background: 'linear-gradient(90deg, #5B8EF0 0%, #C159EC 100%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: `${progress * 100}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#FFFFFF',
              border: '2px solid #5B8EF0',
            }}
          />
        </div>
      </div>

      {/* See more */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '15px', color: 'rgba(235, 235, 245, 0.8)' }}>See more</span>
        <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
          <path d="M1 1L7 6.5L1 12" stroke="rgba(235,235,245,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
};

export default MediumWidget;

