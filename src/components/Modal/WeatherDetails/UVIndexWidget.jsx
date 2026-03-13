import React from 'react';

const UVIndexWidget = ({
  icon = '/widgets/uv-index.png',
  value = 4,
  description = 'Moderate',
  progress = 0.25,
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
          <img src={icon} alt="UV Index" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
        )}
        <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.5px', color: 'rgba(235, 235, 245, 0.6)', textTransform: 'uppercase' }}>
          UV Index
        </span>
      </div>

      {/* Valor */}
      <div>
        <p style={{ margin: 0, fontSize: '40px', fontWeight: 400, color: '#FFFFFF', lineHeight: 1 }}>{value}</p>
        <p style={{ margin: '4px 0 0', fontSize: '18px', fontWeight: 600, color: '#FFFFFF' }}>{description}</p>
      </div>

      {/* Barra de progresso */}
      <div style={{ position: 'relative', height: '4px', borderRadius: '2px', background: 'rgba(255, 255, 255, 0.15)' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, height: '4px', width: '100%', borderRadius: '2px', background: 'linear-gradient(90deg, #5B8EF0 0%, #C159EC 100%)' }} />
        <div style={{ position: 'absolute', left: `${progress * 100}%`, top: '50%', transform: 'translate(-50%, -50%)', width: '10px', height: '10px', borderRadius: '50%', background: '#FFFFFF', border: '2px solid #5B8EF0' }} />
      </div>
    </div>
  );
};

export default UVIndexWidget;

