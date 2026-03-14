import React from 'react';
import {
  weatherDetailIcons,
  widgetHeaderIconStyle,
  widgetHeaderIconWrapStyle,
  widgetHeaderLabelStyle,
  widgetHeaderRowStyle,
} from './styles/widgetHeaderStyles';
import { secondaryWidgetTextStyle, smallWidgetCardStyle } from './styles/widgetLayoutStyles';

const HumidityWidget = ({
  icon = weatherDetailIcons.humidity,
  value = '90%',
  description = 'The dew point is 17 right now.',
}) => {
  return (
    <div style={smallWidgetCardStyle}>
      <div style={widgetHeaderRowStyle}>
        {icon && (
          <div style={widgetHeaderIconWrapStyle}>
            <img src={icon} alt="Humidity" style={widgetHeaderIconStyle} />
          </div>
        )}
        <span style={widgetHeaderLabelStyle}>Humidity</span>
      </div>

      <p style={{ margin: 0, fontSize: '40px', fontWeight: 400, color: '#FFFFFF', lineHeight: 1 }}>
        {value}
      </p>

      <p style={secondaryWidgetTextStyle}>{description}</p>
    </div>
  );
};

export default HumidityWidget;
