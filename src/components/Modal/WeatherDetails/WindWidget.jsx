import React from 'react';

const WindWidget = ({
  icon = '/widgets/wind.png',
  speed = 9.7,
  unit = 'km/h',
  direction = 315,
}) => {
  const rad = (deg) => (deg * Math.PI) / 180;
  const cx = 60, cy = 60, r = 44;
  const tipN = {
    x: cx + r * Math.sin(rad(direction)),
    y: cy - r * Math.cos(rad(direction)),
  };
  const tipS = {
    x: cx - (r * 0.6) * Math.sin(rad(direction)),
    y: cy + (r * 0.6) * Math.cos(rad(direction)),
  };
  const sideN = 8, sideS = 6;
  const perpN = {
    x: cx + sideN * Math.cos(rad(direction)),
    y: cy + sideN * Math.sin(rad(direction)),
  };
  const perpS = {
    x: cx - sideS * Math.cos(rad(direction)),
    y: cy - sideS * Math.sin(rad(direction)),
  };

  return (
    <div
      style={{
        boxSizing: 'border-box',
        width: '164px',
        height: '164px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '22px',
        background: '#1f1a32',
        padding: '14px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        fontFamily: "'SF Pro Display', -apple-system, sans-serif",
        flexShrink: 0,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {icon && (
          <img src={icon} alt="Wind" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
        )}
        <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.5px', color: 'rgba(235, 235, 245, 0.6)', textTransform: 'uppercase' }}>
          Wind
        </span>
      </div>

      {/* Bússola */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="120" height="120" viewBox="0 0 120 120">
          {/* Círculo de fundo */}
          <circle cx="60" cy="60" r="54" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="rgba(0,0,0,0.15)" />

          {/* Marcações */}
          <line x1="60" y1="8" x2="60" y2="16" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <line x1="60" y1="104" x2="60" y2="112" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <line x1="8" y1="60" x2="16" y2="60" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <line x1="104" y1="60" x2="112" y2="60" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

          {/* Letras cardeais */}
          <text x="60" y="26" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.35)" fontWeight="600">N</text>
          <text x="60" y="102" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.2)">S</text>
          <text x="20" y="65" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.2)">W</text>
          <text x="100" y="65" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.2)">E</text>

          {/* Ponteiro losango norte */}
          <polygon
            points={`${tipN.x},${tipN.y} ${perpN.x},${perpN.y} ${cx},${cy} ${perpS.x},${perpS.y}`}
            fill="rgba(255,255,255,0.3)"
          />
          {/* Ponteiro losango sul */}
          <polygon
            points={`${tipS.x},${tipS.y} ${perpN.x},${perpN.y} ${cx},${cy} ${perpS.x},${perpS.y}`}
            fill="rgba(255,255,255,0.12)"
          />

          {/* Valor em destaque */}
          <text x="60" y="56" textAnchor="middle" fontSize="22" fill="white" fontWeight="700">{speed}</text>
          <text x="60" y="70" textAnchor="middle" fontSize="11" fill="rgba(235,235,245,0.5)">{unit}</text>
        </svg>
      </div>
    </div>
  );
};

export default WindWidget;

