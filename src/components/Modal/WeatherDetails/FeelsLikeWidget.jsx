import React from 'react';
import {
  weatherDetailIcons,
  widgetHeaderIconStyle,
  widgetHeaderIconWrapStyle,
  widgetHeaderLabelStyle,
  widgetHeaderRowStyle,
} from './styles/widgetHeaderStyles';
import { secondaryWidgetTextStyle, smallWidgetCardStyle } from './styles/widgetLayoutStyles';

const FeelsLikeWidget = ({
  icon = weatherDetailIcons.feelsLike,
  value = '19\u00B0',
  description = 'Similar to the actual temperature.',
}) => {
  return (
    <div style={smallWidgetCardStyle}>
      <div style={widgetHeaderRowStyle}>
        {icon && (
          <div style={widgetHeaderIconWrapStyle}>
            <img src={icon} alt="Feels Like" style={widgetHeaderIconStyle} />
          </div>
        )}
        <span style={widgetHeaderLabelStyle}>Feels Like</span>
      </div>

      <p style={{ margin: 0, fontSize: '40px', fontWeight: 400, color: '#FFFFFF', lineHeight: 1 }}>
        {value}
      </p>

      <p style={secondaryWidgetTextStyle}>{description}</p>
    </div>
  );
};

export default FeelsLikeWidget;
