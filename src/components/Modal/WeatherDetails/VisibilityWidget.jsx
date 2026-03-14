import React from 'react';
import {
  weatherDetailIcons,
  widgetHeaderIconStyle,
  widgetHeaderIconWrapStyle,
  widgetHeaderLabelStyle,
  widgetHeaderRowStyle,
} from './styles/widgetHeaderStyles';
import { secondaryWidgetTextStyle, smallWidgetCardStyle } from './styles/widgetLayoutStyles';

const VisibilityWidget = ({
  icon = weatherDetailIcons.visibility,
  value = '8 km',
  description = 'Similar to the actual temperature.',
}) => {
  return (
    <div style={smallWidgetCardStyle}>
      <div style={widgetHeaderRowStyle}>
        {icon && (
          <div style={widgetHeaderIconWrapStyle}>
            <img src={icon} alt="Visibility" style={widgetHeaderIconStyle} />
          </div>
        )}
        <span style={widgetHeaderLabelStyle}>Visibility</span>
      </div>

      <p style={{ margin: 0, fontSize: '34px', fontWeight: 400, color: '#FFFFFF', lineHeight: 1 }}>
        {value}
      </p>

      <p style={secondaryWidgetTextStyle}>{description}</p>
    </div>
  );
};

export default VisibilityWidget;
