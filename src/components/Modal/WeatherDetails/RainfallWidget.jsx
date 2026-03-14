import React from 'react';
import {
  weatherDetailIcons,
  widgetHeaderIconStyle,
  widgetHeaderIconWrapStyle,
  widgetHeaderLabelStyle,
  widgetHeaderRowStyle,
} from './styles/widgetHeaderStyles';
import { secondaryWidgetTextStyle, smallWidgetCardStyle } from './styles/widgetLayoutStyles';

const RainfallWidget = ({
  icon = weatherDetailIcons.rainfall,
  amount = 1.8,
  unit = 'mm',
  period = 'in last hour',
  forecast = '1.2 mm expected in next 24h.',
}) => {
  return (
    <div style={smallWidgetCardStyle}>
      <div style={widgetHeaderRowStyle}>
        {icon && (
          <div style={widgetHeaderIconWrapStyle}>
            <img src={icon} alt="Rainfall" style={widgetHeaderIconStyle} />
          </div>
        )}
        <span style={widgetHeaderLabelStyle}>Rainfall</span>
      </div>

      <div>
        <p style={{ margin: 0, fontSize: '30px', fontWeight: 400, color: '#FFFFFF', lineHeight: 1.1 }}>
          {amount} {unit}
        </p>
        <p style={{ margin: '4px 0 0', fontSize: '16px', fontWeight: 600, color: '#FFFFFF' }}>
          {period}
        </p>
      </div>

      <p style={secondaryWidgetTextStyle}>{forecast}</p>
    </div>
  );
};

export default RainfallWidget;
