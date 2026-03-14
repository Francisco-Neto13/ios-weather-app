import React from 'react';
import {
  weatherDetailIcons,
  widgetHeaderIconStyle,
  widgetHeaderIconWrapStyle,
  widgetHeaderLabelStyle,
  widgetHeaderRowStyle,
} from './styles/widgetHeaderStyles';
import { compactGaugeCardStyle } from './styles/widgetLayoutStyles';

const PressureWidget = ({
  icon = weatherDetailIcons.pressure,
  value = 1013,
  unit = 'hPa',
  min = 950,
  max = 1050,
}) => {
  const progress = (value - min) / (max - min);
  const startAngle = -220;
  const endAngle = 40;
  const angle = startAngle + progress * (endAngle - startAngle);

  const polarToCartesian = (cx, cy, r, deg) => {
    const rad = (deg * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

  const tickCount = 36;
  const ticks = Array.from({ length: tickCount }, (_, i) => {
    const tickAngle = -220 + (i / (tickCount - 1)) * 260;
    const outer = polarToCartesian(60, 60, 44, tickAngle);
    const inner = polarToCartesian(60, 60, i % 3 === 0 ? 36 : 39, tickAngle);
    const isActive = tickAngle <= angle;
    return { outer, inner, isActive };
  });

  const needle = polarToCartesian(60, 60, 38, angle);

  return (
    <div style={compactGaugeCardStyle}>
      <div style={widgetHeaderRowStyle}>
        {icon && (
          <div style={widgetHeaderIconWrapStyle}>
            <img src={icon} alt="Pressure" style={widgetHeaderIconStyle} />
          </div>
        )}
        <span style={widgetHeaderLabelStyle}>Pressure</span>
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: '4px',
        }}
      >
        <svg width="132" height="132" viewBox="0 0 120 120">
          {ticks.map((tick, i) => (
            <line
              key={i}
              x1={tick.outer.x}
              y1={tick.outer.y}
              x2={tick.inner.x}
              y2={tick.inner.y}
              stroke={tick.isActive ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)'}
              strokeWidth={i % 3 === 0 ? 1.5 : 1}
              strokeLinecap="round"
            />
          ))}
          <line
            x1="60"
            y1="60"
            x2={needle.x}
            y2={needle.y}
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="60" cy="60" r="3" fill="white" />
          <text x="60" y="57" textAnchor="middle" fontSize="18" fill="white" fontWeight="700">
            {value}
          </text>
          <text x="60" y="72" textAnchor="middle" fontSize="11" fill="rgba(235,235,245,0.5)">
            {unit}
          </text>
        </svg>
      </div>
    </div>
  );
};

export default PressureWidget;
