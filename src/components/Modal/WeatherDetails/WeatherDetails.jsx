import React, { useEffect, useRef, useState } from 'react';
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
  header = null,
  widgets = {},
}) => {
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStateRef = useRef({
    isDragging: false,
    startY: 0,
    startScrollTop: 0,
    scroller: null,
  });
  const hasForecastSection = Boolean(segmentedControl || forecast);
  const forecastTop = 142;
  const widgetsTop = hasForecastSection ? 376 : contentTopInset;
  const contentHeight = widgetsTop + 880;

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!dragStateRef.current.isDragging || !dragStateRef.current.scroller) return;

      const deltaY = event.clientY - dragStateRef.current.startY;
      dragStateRef.current.scroller.scrollTop = dragStateRef.current.startScrollTop - deltaY;
    };

    const endMouseDrag = () => {
      dragStateRef.current.isDragging = false;
      dragStateRef.current.scroller = null;
      document.body.style.userSelect = '';
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', endMouseDrag);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', endMouseDrag);
    };
  }, []);

  const handleMouseDown = (event) => {
    if (event.button !== 0) return;
    if (event.target.closest('[data-drag-lock="true"]')) return;

    const scroller = containerRef.current;
    if (!scroller) return;

    dragStateRef.current.isDragging = true;
    dragStateRef.current.startY = event.clientY;
    dragStateRef.current.startScrollTop = scroller.scrollTop;
    dragStateRef.current.scroller = scroller;
    document.body.style.userSelect = 'none';
    setIsDragging(true);
  };

  const setScrollerRef = (node) => {
    containerRef.current = node;

    if (scrollRef && typeof scrollRef === 'object') {
      scrollRef.current = node;
    }
  };

  return (
    <div
      className="ios-scroll-hidden"
      ref={setScrollerRef}
      onMouseDown={handleMouseDown}
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
        cursor: isDragging ? 'grabbing' : 'grab',
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
            <WeatherDetailsHeader {...header} />
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
          <MediumWidget {...(widgets?.airQuality ?? {})} />

          <div style={widgetGridRowStyle}>
            <UVIndexWidget {...(widgets?.uvIndex ?? {})} />
            <SunriseWidget {...(widgets?.sunrise ?? {})} />
          </div>

          <div style={widgetGridRowStyle}>
            <WindWidget {...(widgets?.wind ?? {})} />
            <RainfallWidget {...(widgets?.rainfall ?? {})} />
          </div>

          <div style={widgetGridRowStyle}>
            <FeelsLikeWidget {...(widgets?.feelsLike ?? {})} />
            <HumidityWidget {...(widgets?.humidity ?? {})} />
          </div>

          <div style={widgetGridRowStyle}>
            <VisibilityWidget {...(widgets?.visibility ?? {})} />
            <PressureWidget {...(widgets?.pressure ?? {})} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
