import React from 'react';
import {
  weatherDetailIcons,
  widgetHeaderIconStyle,
  widgetHeaderIconWrapStyle,
  widgetHeaderLabelStyle,
  widgetHeaderRowStyle,
} from './styles/widgetHeaderStyles';
import { secondaryWidgetTextStyle, smallWidgetCardStyle } from './styles/widgetLayoutStyles';

const SunriseWidget = ({
  icon = weatherDetailIcons.sunrise,
  sunrise = '5:28 AM',
  sunset = '7:25 PM',
  progress = 0.5,
}) => {
  const displaySunrise = sunrise || '--';
  const displaySunset = sunset || '--';
  const displayProgress = Number.isFinite(progress) ? progress : 0;
  const dotX = displayProgress * 132;
  const dotY = 38 - Math.sin(displayProgress * Math.PI) * 52;

  return (
    <div style={{ ...smallWidgetCardStyle, overflow: 'hidden' }}>
      <div style={widgetHeaderRowStyle}>
        {icon && (
          <div style={widgetHeaderIconWrapStyle}>
            <img src={icon} alt="Sunrise" style={widgetHeaderIconStyle} />
          </div>
        )}
        <span style={widgetHeaderLabelStyle}>Sunrise</span>
      </div>

      <p style={{ margin: 0, fontSize: '34px', fontWeight: 400, color: '#FFFFFF', lineHeight: 1 }}>
        {displaySunrise}
      </p>

      <div style={{ position: 'relative', height: '40px' }}>
        <svg width="132" height="40" viewBox="0 0 132 40" fill="none" style={{ position: 'absolute', bottom: '14px', left: 0 }}>
          <circle cx={dotX} cy={dotY} r="4" fill="#FFFFFF" opacity="0.9" />
        </svg>
        <span style={{ ...secondaryWidgetTextStyle, position: 'absolute', bottom: 0, left: 0 }}>
          Sunset: {displaySunset}
        </span>
      </div>
    </div>
  );
};

export default SunriseWidget;
