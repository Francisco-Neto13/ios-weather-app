import React from 'react';
import {
  weatherDetailIcons,
  widgetHeaderIconStyle,
  widgetHeaderIconWrapStyle,
  widgetHeaderLabelStyle,
  widgetHeaderRowStyle,
} from './styles/widgetHeaderStyles';
import { mediumWidgetCardStyle } from './styles/widgetLayoutStyles';

const MediumWidget = ({
  icon = weatherDetailIcons.airQuality,
  label = 'Air Quality',
  value = 3,
  description = 'Low Health Risk',
  progress = 0.18,
}) => {
  const displayValue = value ?? '--';
  const displayDescription = description || 'Unavailable';
  const displayProgress = Number.isFinite(progress) ? progress : 0;

  return (
    <div style={mediumWidgetCardStyle}>
      <div style={widgetHeaderRowStyle}>
        {icon && (
          <div style={widgetHeaderIconWrapStyle}>
            <img src={icon} alt={label} style={widgetHeaderIconStyle} />
          </div>
        )}
        <span style={widgetHeaderLabelStyle}>{label}</span>
      </div>

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
          {displayValue} - {displayDescription}
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
              left: `${displayProgress * 100}%`,
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

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '15px', color: 'rgba(235, 235, 245, 0.8)' }}>See more</span>
        <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
          <path
            d="M1 1L7 6.5L1 12"
            stroke="rgba(235,235,245,0.6)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default MediumWidget;
