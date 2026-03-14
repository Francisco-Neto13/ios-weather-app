import React from 'react';
import {
  weatherDetailIcons,
  widgetHeaderIconStyle,
  widgetHeaderIconWrapStyle,
  widgetHeaderLabelStyle,
  widgetHeaderRowStyle,
} from './styles/widgetHeaderStyles';
import { secondaryWidgetTextStyle, smallWidgetCardStyle } from './styles/widgetLayoutStyles';

const UVIndexWidget = ({
  icon = weatherDetailIcons.uvIndex,
  value = 4,
  description = 'Moderate',
  progress = 0.25,
}) => {
  return (
    <div style={smallWidgetCardStyle}>
      <div style={widgetHeaderRowStyle}>
        {icon && (
          <div style={widgetHeaderIconWrapStyle}>
            <img src={icon} alt="UV Index" style={widgetHeaderIconStyle} />
          </div>
        )}
        <span style={widgetHeaderLabelStyle}>UV Index</span>
      </div>

      <div>
        <p style={{ margin: 0, fontSize: '40px', fontWeight: 400, color: '#FFFFFF', lineHeight: 1 }}>{value}</p>
        <p
          style={{
            ...secondaryWidgetTextStyle,
            margin: '4px 0 0',
            fontSize: '18px',
            fontWeight: 600,
            color: '#FFFFFF',
            lineHeight: 1.2,
          }}
        >
          {description}
        </p>
      </div>

      <div style={{ position: 'relative', height: '4px', borderRadius: '2px', background: 'rgba(255, 255, 255, 0.15)' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, height: '4px', width: '100%', borderRadius: '2px', background: 'linear-gradient(90deg, #5B8EF0 0%, #C159EC 100%)' }} />
        <div style={{ position: 'absolute', left: `${progress * 100}%`, top: '50%', transform: 'translate(-50%, -50%)', width: '10px', height: '10px', borderRadius: '50%', background: '#FFFFFF', border: '2px solid #5B8EF0' }} />
      </div>
    </div>
  );
};

export default UVIndexWidget;
