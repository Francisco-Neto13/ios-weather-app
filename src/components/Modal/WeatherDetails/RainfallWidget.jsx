import React from 'react';

const RainfallWidget = ({
  icon = '/widgets/rainfall.png',
  amount = 1.8,
  unit = 'mm',
  period = 'in last hour',
  forecast = '1.2 mm expected in next 24h.',
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
          <img src={icon} alt="Rainfall" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
        )}
        <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.5px', color: 'rgba(235, 235, 245, 0.6)', textTransform: 'uppercase' }}>
          Rainfall
        </span>
      </div>

      {/* Valor */}
      <div>
        <p style={{ margin: 0, fontSize: '30px', fontWeight: 400, color: '#FFFFFF', lineHeight: 1.1 }}>
          {amount} {unit}
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '16px', fontWeight: 600, color: '#FFFFFF' }}>
          {period}
        </p>
      </div>

      {/* Previsão */}
      <p style={{ margin: 0, fontSize: '13px', color: 'rgba(235, 235, 245, 0.6)', lineHeight: 1.4 }}>
        {forecast}
      </p>
    </div>
  );
};

export default RainfallWidget;

