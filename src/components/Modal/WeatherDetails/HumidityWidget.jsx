import React from 'react';

const HumidityWidget = ({
  icon = '/widgets/humidity.png',
  value = '90%',
  description = 'The dew point is 17 right now.',
}) => {
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
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {icon && (
          <img src={icon} alt="Humidity" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
        )}
        <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.5px', color: 'rgba(235, 235, 245, 0.6)', textTransform: 'uppercase' }}>
          Humidity
        </span>
      </div>

      {/* Valor */}
      <p style={{ margin: 0, fontSize: '40px', fontWeight: 400, color: '#FFFFFF', lineHeight: 1 }}>
        {value}
      </p>

      {/* Descrição */}
      <p style={{ margin: 0, fontSize: '13px', color: 'rgba(235, 235, 245, 0.6)', lineHeight: 1.4 }}>
        {description}
      </p>
    </div>
  );
};

export default HumidityWidget;

