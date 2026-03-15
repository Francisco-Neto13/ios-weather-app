import React, { useEffect, useMemo, useRef } from 'react';

const weatherWidgetIcons = {
  moonCloudRain: '/widgets/small/moon-cloud-rain.png',
  moonCloudWind: '/widgets/small/moon-cloud-wind.png',
  sunCloudAngledRain: '/widgets/small/sun-cloud-angled-rain.png',
  sunCloudRain: '/widgets/small/sun-cloud-rain.png',
  tornado: '/widgets/small/tornado.png',
};

const fallbackHourlyData = [
  { hour: '12 AM', icon: weatherWidgetIcons.moonCloudRain, degree: '19°', precipitation: '30%', isActive: false },
  { hour: 'Now', icon: weatherWidgetIcons.moonCloudWind, degree: '19°', precipitation: null, isActive: true },
  { hour: '2 AM', icon: weatherWidgetIcons.moonCloudWind, degree: '18°', precipitation: null, isActive: false },
  { hour: '3 AM', icon: weatherWidgetIcons.moonCloudRain, degree: '19°', precipitation: null, isActive: false },
  { hour: '4 AM', icon: weatherWidgetIcons.moonCloudRain, degree: '19°', precipitation: null, isActive: false },
  { hour: '5 AM', icon: weatherWidgetIcons.sunCloudAngledRain, degree: '19°', precipitation: null, isActive: false },
  { hour: '6 AM', icon: weatherWidgetIcons.sunCloudRain, degree: '19°', precipitation: null, isActive: false },
  { hour: '7 AM', icon: weatherWidgetIcons.sunCloudRain, degree: '19°', precipitation: null, isActive: false },
];

const fallbackWeeklyData = [
  { hour: 'Mon', icon: weatherWidgetIcons.sunCloudAngledRain, degree: '21°', precipitation: '30%', isActive: false },
  { hour: 'Tue', icon: weatherWidgetIcons.sunCloudRain, degree: '19°', precipitation: null, isActive: true },
  { hour: 'Wed', icon: weatherWidgetIcons.moonCloudRain, degree: '18°', precipitation: '25%', isActive: false },
  { hour: 'Thu', icon: weatherWidgetIcons.tornado, degree: '22°', precipitation: '20%', isActive: false },
  { hour: 'Fri', icon: weatherWidgetIcons.sunCloudRain, degree: '20°', precipitation: null, isActive: false },
  { hour: 'Sat', icon: weatherWidgetIcons.moonCloudWind, degree: '17°', precipitation: null, isActive: false },
  { hour: 'Sun', icon: weatherWidgetIcons.sunCloudAngledRain, degree: '23°', precipitation: null, isActive: false },
];

const ForecastCard = ({ hour, icon, degree, precipitation, isActive = false }) => {
  return (
    <div
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '16px 8px',
        gap: '16px',
        width: '60px',
        height: '146px',
        background: isActive ? '#48319D' : 'rgba(72, 49, 157, 0.2)',
        border: `1px solid ${isActive ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.2)'}`,
        boxShadow: '5px 4px 10px rgba(0, 0, 0, 0.25), inset 1px 1px 0px rgba(255, 255, 255, 0.25)',
        borderRadius: '30px',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontFamily: "'SF Pro Display', -apple-system, sans-serif",
          fontWeight: 600,
          fontSize: '15px',
          lineHeight: '20px',
          letterSpacing: '-0.5px',
          color: '#FFFFFF',
          whiteSpace: 'nowrap',
        }}
      >
        {hour}
      </span>

      <div style={{ width: '44px', height: '38px', position: 'relative' }}>
        {precipitation && (
          <span
            style={{
              position: 'absolute',
              width: '30px',
              height: '18px',
              left: '7px',
              top: '22px',
              fontFamily: "'SF Pro Display', -apple-system, sans-serif",
              fontWeight: 600,
              fontSize: '13px',
              lineHeight: '18px',
              textAlign: 'center',
              letterSpacing: '-0.078px',
              color: '#40CBD8',
            }}
          >
            {precipitation}
          </span>
        )}
        {icon && (
          <img
            src={icon}
            alt="weather"
            style={{
              position: 'absolute',
              width: '36px',
              height: '36px',
              left: 'calc(50% - 18px)',
              top: '-6px',
              objectFit: 'contain',
            }}
          />
        )}
      </div>

      <span
        style={{
          fontFamily: "'SF Pro Display', -apple-system, sans-serif",
          fontWeight: 400,
          fontSize: '20px',
          lineHeight: '24px',
          letterSpacing: '0.38px',
          color: '#FFFFFF',
        }}
      >
        {degree}
      </span>
    </div>
  );
};

const ModalForecast = ({ activeTab = 'hourly', hourlyData = [], weeklyData = [] }) => {
  const hourlyScrollRef = useRef(null);
  const weeklyScrollRef = useRef(null);
  const dragStateRef = useRef({
    isDragging: false,
    startX: 0,
    startScrollLeft: 0,
    scroller: null,
  });

  const resolvedHourlyData = useMemo(
    () => (hourlyData.length ? hourlyData : fallbackHourlyData),
    [hourlyData]
  );
  const resolvedWeeklyData = useMemo(
    () => (weeklyData.length ? weeklyData : fallbackWeeklyData),
    [weeklyData]
  );

  const endMouseDrag = () => {
    dragStateRef.current.isDragging = false;
    dragStateRef.current.scroller = null;
    document.body.style.userSelect = '';
  };

  const handleMouseMove = (event) => {
    if (!dragStateRef.current.isDragging || !dragStateRef.current.scroller) return;

    const deltaX = event.clientX - dragStateRef.current.startX;
    dragStateRef.current.scroller.scrollLeft = dragStateRef.current.startScrollLeft - deltaX;
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', endMouseDrag);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', endMouseDrag);
    };
  }, []);

  useEffect(() => {
    if (activeTab === 'hourly' && hourlyScrollRef.current) {
      hourlyScrollRef.current.scrollLeft = 0;
    }

    if (activeTab === 'weekly' && weeklyScrollRef.current) {
      weeklyScrollRef.current.scrollLeft = 0;
    }
  }, [activeTab]);

  const startMouseDrag = (event, scroller) => {
    if (!scroller) return;

    dragStateRef.current.isDragging = true;
    dragStateRef.current.startX = event.clientX;
    dragStateRef.current.startScrollLeft = scroller.scrollLeft;
    dragStateRef.current.scroller = scroller;
    document.body.style.userSelect = 'none';
  };

  const commonScrollStyle = {
    width: '371px',
    height: '180px',
    overflowX: 'auto',
    overflowY: 'hidden',
    flexShrink: 0,
    WebkitOverflowScrolling: 'touch',
    touchAction: 'pan-x',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    cursor: 'grab',
  };

  return (
    <div
      style={{
        position: 'absolute',
        width: '371px',
        height: '146px',
        left: '20px',
        top: '69px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '742px',
          height: '180px',
          transform: activeTab === 'hourly' ? 'translateX(0px)' : 'translateX(-371px)',
          transition: 'transform 0.3s ease',
        }}
      >
        <div
          ref={hourlyScrollRef}
          className="ios-scroll-hidden"
          style={commonScrollStyle}
          onMouseDown={(event) => startMouseDrag(event, event.currentTarget)}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: '12px',
              width: 'max-content',
              height: '146px',
              paddingRight: '20px',
            }}
          >
            {resolvedHourlyData.map((item, i) => (
              <ForecastCard key={`hourly-${i}`} {...item} />
            ))}
          </div>
        </div>

        <div
          ref={weeklyScrollRef}
          className="ios-scroll-hidden"
          style={commonScrollStyle}
          onMouseDown={(event) => startMouseDrag(event, event.currentTarget)}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: '12px',
              width: 'max-content',
              height: '146px',
              paddingRight: '20px',
            }}
          >
            {resolvedWeeklyData.map((item, i) => (
              <ForecastCard key={`weekly-${i}`} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalForecast;



