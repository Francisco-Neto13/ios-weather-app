import React from 'react';
import {
  weatherDetailIcons,
  widgetHeaderIconStyle,
  widgetHeaderIconWrapStyle,
  widgetHeaderLabelStyle,
  widgetHeaderRowStyle,
} from './styles/widgetHeaderStyles';
import { compactCompassCardStyle } from './styles/widgetLayoutStyles';

const WindWidget = ({
  icon = weatherDetailIcons.wind,
  speed = 9.7,
  unit = 'km/h',
  direction = 315,
}) => {
  const displaySpeed = speed ?? '--';
  const directionValue = Number.isFinite(direction) ? direction : 0;
  const rad = (deg) => (deg * Math.PI) / 180;
  const cx = 60;
  const cy = 60;
  const r = 44;
  const tipN = {
    x: cx + r * Math.sin(rad(directionValue)),
    y: cy - r * Math.cos(rad(directionValue)),
  };
  const tipS = {
    x: cx - r * 0.6 * Math.sin(rad(directionValue)),
    y: cy + r * 0.6 * Math.cos(rad(directionValue)),
  };
  const sideN = 8;
  const sideS = 6;
  const perpN = {
    x: cx + sideN * Math.cos(rad(directionValue)),
    y: cy + sideN * Math.sin(rad(directionValue)),
  };
  const perpS = {
    x: cx - sideS * Math.cos(rad(directionValue)),
    y: cy - sideS * Math.sin(rad(directionValue)),
  };

  return (
    <div style={compactCompassCardStyle}>
      <div style={widgetHeaderRowStyle}>
        {icon && (
          <div style={widgetHeaderIconWrapStyle}>
            <img src={icon} alt="Wind" style={widgetHeaderIconStyle} />
          </div>
        )}
        <span style={widgetHeaderLabelStyle}>Wind</span>
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: '2px',
        }}
      >
        <svg width="118" height="118" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" stroke="rgba(255,255,255,0.08)" strokeWidth="1" fill="rgba(0,0,0,0.15)" />
          <line x1="60" y1="8" x2="60" y2="16" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <line x1="60" y1="104" x2="60" y2="112" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <line x1="8" y1="60" x2="16" y2="60" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <line x1="104" y1="60" x2="112" y2="60" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <text x="60" y="26" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.35)" fontWeight="600">N</text>
          <text x="60" y="102" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.2)">S</text>
          <text x="20" y="65" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.2)">W</text>
          <text x="100" y="65" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.2)">E</text>
          <polygon
            points={`${tipN.x},${tipN.y} ${perpN.x},${perpN.y} ${cx},${cy} ${perpS.x},${perpS.y}`}
            fill="rgba(255,255,255,0.3)"
          />
          <polygon
            points={`${tipS.x},${tipS.y} ${perpN.x},${perpN.y} ${cx},${cy} ${perpS.x},${perpS.y}`}
            fill="rgba(255,255,255,0.12)"
          />
          <text x="60" y="56" textAnchor="middle" fontSize="22" fill="white" fontWeight="700">{displaySpeed}</text>
          <text x="60" y="70" textAnchor="middle" fontSize="11" fill="rgba(235,235,245,0.5)">{unit}</text>
        </svg>
      </div>
    </div>
  );
};

export default WindWidget;
