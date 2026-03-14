import React from 'react';
import WeatherDetailsHeader from './WeatherDetailsHeader';
import MediumWidget from './MediumWidget';
import UVIndexWidget from './UVIndexWidget';
import SunriseWidget from './SunriseWidget';
import WindWidget from './WindWidget';
import RainfallWidget from './RainfallWidget';
import FeelsLikeWidget from './FeelsLikeWidget';
import HumidityWidget from './HumidityWidget';
import VisibilityWidget from './VisibilityWidget';
import PressureWidget from './PressureWidget';
import { widgetGridRowStyle } from './styles/widgetLayoutStyles';

const WeatherDetails = ({
  scrollRef = null,
  showHeader = true,
  contentTopInset = 16,
  segmentedControl = null,
  forecast = null,
}) => {
  const hasForecastSection = Boolean(segmentedControl || forecast);
  const forecastTop = 142;
  const widgetsTop = hasForecastSection ? 402 : contentTopInset;
  const contentHeight = widgetsTop + 880;

  return (
    <div
      className="ios-scroll-hidden"
      ref={scrollRef}
      style={{
        boxSizing: 'border-box',
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#3d2b58',
        boxShadow: '-40px 60px 150px rgba(59, 38, 123, 0.7)',
        borderRadius: '44px',
        overflowY: 'auto',
        overflowX: 'hidden',
        overflowAnchor: 'none',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          minHeight: `${contentHeight}px`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '250px',
            height: '250px',
            left: '191px',
            top: '38px',
            background:
              'conic-gradient(from 180deg at 50% 50%, #612FAB -90.71deg, rgba(97, 47, 171, 0) 50.02deg, #612FAB 129.55deg, rgba(97, 47, 171, 0) 226.06deg, #612FAB 269.29deg, rgba(97, 47, 171, 0) 410.02deg)',
            filter: 'blur(69.8324px)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'absolute',
            width: '425px',
            height: '425px',
            left: '43px',
            top: '284px',
            background:
              'conic-gradient(from 180deg at 50% 50%, #612FAB -90.71deg, rgba(97, 47, 171, 0) 50.02deg, #612FAB 129.55deg, rgba(97, 47, 171, 0) 226.06deg, #612FAB 269.29deg, rgba(97, 47, 171, 0) 410.02deg)',
            filter: 'blur(100px)',
            pointerEvents: 'none',
          }}
        />

        {showHeader && (
          <div
            style={{
              position: 'absolute',
              top: '52px',
              left: '0px',
              width: '390px',
            }}
          >
            <WeatherDetailsHeader />
          </div>
        )}

        {hasForecastSection && (
          <div
            style={{
              position: 'absolute',
              left: '0px',
              top: `${forecastTop}px`,
              width: '390px',
              height: '232px',
            }}
          >
            {segmentedControl}
            {forecast}
          </div>
        )}

        <div
          style={{
            position: 'absolute',
            left: '24px',
            top: `${widgetsTop}px`,
            width: '342px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            paddingBottom: '40px',
          }}
        >
          <MediumWidget />

          <div style={widgetGridRowStyle}>
            <UVIndexWidget />
            <SunriseWidget />
          </div>

          <div style={widgetGridRowStyle}>
            <WindWidget />
            <RainfallWidget />
          </div>

          <div style={widgetGridRowStyle}>
            <FeelsLikeWidget />
            <HumidityWidget />
          </div>

          <div style={widgetGridRowStyle}>
            <VisibilityWidget />
            <PressureWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;

