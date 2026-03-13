import React from 'react';

const VisibilityWidget = ({
  icon = '/widgets/visibility.png',
  value = '8 km',
  description = 'Similar to the actual temperature.',
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {icon && (
          <img src={icon} alt="Visibility" style={{ width: '16px', height: '16px', objectFit: 'contain' }} />
        )}
        <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.5px', color: 'rgba(235, 235, 245, 0.6)', textTransform: 'uppercase' }}>
          Visibility
        </span>
      </div>

      <p style={{ margin: 0, fontSize: '34px', fontWeight: 400, color: '#FFFFFF', lineHeight: 1 }}>
        {value}
      </p>

      <p style={{ margin: 0, fontSize: '13px', color: 'rgba(235, 235, 245, 0.6)', lineHeight: 1.4 }}>
        {description}
      </p>
    </div>
  );
};

export default VisibilityWidget;

