import { useCallback, useEffect, useRef, useState } from 'react';
import ModalSegmentedControl from './ModalSegmentedControl';
import ModalForecast from './ModalForecast';
import ModalEllipses from './ModalEllipses';
import WeatherDetails from './WeatherDetails/WeatherDetails';
import WeatherDetailsHeader from './WeatherDetails/WeatherDetailsHeader';
import SheetDragHandle from './SheetDragHandle';

const APP_FRAME_HEIGHT = 844;
const MAIN_PANEL_HEIGHT = 702;
const MAIN_PANEL_CLOSED_TOP = 519;
const MAIN_PANEL_OPEN_TOP = 142;
const DETAILS_CLOSED_TOP = APP_FRAME_HEIGHT;
const HEADER_TOP = 52;
const HEADER_REVEAL_DISTANCE = 80;
const DETAILS_CONTENT_TOP_WITH_FORECAST = 142;
const DETAILS_CONTENT_TOP_WITHOUT_FORECAST = 376;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const Modal = ({ onSheetProgress, header, forecast, widgets }) => {
  const [activeTab, setActiveTab] = useState('hourly');
  const [openProgress, setOpenProgress] = useState(0);
  const [isDraggingHandle, setIsDraggingHandle] = useState(false);
  const [isSheetExpanded, setIsSheetExpanded] = useState(false);
  const [detailsViewKey, setDetailsViewKey] = useState(0);

  const progressRef = useRef(0);
  const detailsScrollRef = useRef(null);
  const dragActiveRef = useRef(false);
  const dragStateRef = useRef({
    pointerId: null,
    startY: 0,
    startProgress: 0,
  });

  const updateProgress = useCallback((nextProgress) => {
    const clamped = clamp(nextProgress, 0, 1);
    progressRef.current = clamped;
    setOpenProgress(clamped);
  }, []);

  const handleDragPointerDown = useCallback((event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    event.preventDefault();
    dragStateRef.current.pointerId = event.pointerId;
    dragStateRef.current.startY = event.clientY;
    dragStateRef.current.startProgress = progressRef.current;
    dragActiveRef.current = true;
    setIsDraggingHandle(true);
  }, []);

  const handleDragPointerMove = useCallback((event) => {
    if (!dragActiveRef.current) return;
    if (dragStateRef.current.pointerId !== event.pointerId) return;

    event.preventDefault();

    const deltaYUp = dragStateRef.current.startY - event.clientY;
    const progressDelta = deltaYUp / MAIN_PANEL_CLOSED_TOP;
    updateProgress(dragStateRef.current.startProgress + progressDelta);
  }, [updateProgress]);

  const handleDragPointerEnd = useCallback((event) => {
    if (!dragActiveRef.current) return;
    if (dragStateRef.current.pointerId !== event.pointerId) return;

    const targetProgress = progressRef.current >= 0.45 ? 1 : 0;
    updateProgress(targetProgress);
    setIsSheetExpanded(targetProgress === 1);

    if (targetProgress === 0) {
      setDetailsViewKey((prev) => prev + 1);
    }

    dragActiveRef.current = false;
    dragStateRef.current.pointerId = null;
    setIsDraggingHandle(false);
  }, [updateProgress]);

  useEffect(() => {
    const onPointerMove = (event) => handleDragPointerMove(event);
    const onPointerUp = (event) => handleDragPointerEnd(event);

    window.addEventListener('pointermove', onPointerMove, { passive: false });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, [handleDragPointerEnd, handleDragPointerMove]);

  useEffect(() => {
    onSheetProgress?.(openProgress);
  }, [onSheetProgress, openProgress]);

  useEffect(() => {
    if (openProgress > 0.02) return;
    const detailsScroller = detailsScrollRef.current;
    if (detailsScroller) {
      detailsScroller.scrollTop = 0;
    }
  }, [openProgress]);

  const mainPanelTop = Math.round(
    MAIN_PANEL_CLOSED_TOP - (MAIN_PANEL_CLOSED_TOP - MAIN_PANEL_OPEN_TOP) * openProgress
  );
  const forecastTop = mainPanelTop;
  const headerTrackTop = Math.max(0, forecastTop - 142);
  const headerRevealProgress = clamp(
    (HEADER_REVEAL_DISTANCE - headerTrackTop) / HEADER_REVEAL_DISTANCE,
    0,
    1
  );

  const mainPanelOpacity = clamp(1 - openProgress * 1.2, 0, 1);
  const detailsOpacity = clamp((openProgress - 0.02) * 1.25, 0, 1);
  const headerOpacity = headerRevealProgress;
  const embedForecastInDetails = !isDraggingHandle && (isSheetExpanded || openProgress > 0.985);
  const detailsContentTopInset = embedForecastInDetails
    ? DETAILS_CONTENT_TOP_WITH_FORECAST
    : DETAILS_CONTENT_TOP_WITHOUT_FORECAST;
  const showFloatingForecast = !embedForecastInDetails;
  const detailsTop = Math.round(DETAILS_CLOSED_TOP * (1 - openProgress));

  useEffect(() => {
    if (!embedForecastInDetails) return;
    const detailsScroller = detailsScrollRef.current;
    if (detailsScroller) {
      detailsScroller.scrollTop = 0;
    }
  }, [embedForecastInDetails]);

  const headerBackdropReveal = headerOpacity;
  const headerBackdropHeight = 142 * headerBackdropReveal;
  const headerBackdropTop = forecastTop - headerBackdropHeight;
  const headerTop = headerTrackTop + HEADER_TOP;
  const handleTop = mainPanelTop + 3;
  const headerContentOpacity = clamp((headerOpacity - 0.55) / 0.45, 0, 1);

  return (
    <>
      <div
        className="ios-scroll-hidden"
        style={{
          position: 'absolute',
          width: '390px',
          height: `${MAIN_PANEL_HEIGHT}px`,
          left: '0px',
          top: `${mainPanelTop}px`,
          overflowY: 'scroll',
          borderRadius: '44px',
          background: 'linear-gradient(180deg, rgba(58, 63, 84, 0) 12.37%, rgba(58, 63, 84, 1) 60%)',
          opacity: mainPanelOpacity,
          transition: isDraggingHandle
            ? 'none'
            : 'top 0.4s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.22s ease',
          zIndex: 6,
        }}
      >
        <div style={{ position: 'absolute', width: '286px', height: '9.89px', left: '48px', top: '-9.89px', background: '#E0D9FF', filter: 'blur(5px)' }} />
        <div style={{ position: 'absolute', width: '286px', height: '32px', left: '48px', top: '-33px', background: 'rgba(196, 39, 251, 0.5)', filter: 'blur(30px)' }} />
        <div style={{ position: 'absolute', width: '250px', height: '250px', left: '271px', top: '65px', background: 'conic-gradient(from 180deg at 50% 50%, #612FAB -47.46deg, rgba(97, 47, 171, 0) 50.02deg, #612FAB 129.55deg, rgba(97, 47, 171, 0) 226.06deg, #612FAB 312.54deg, rgba(97, 47, 171, 0) 410.02deg)', filter: 'blur(70px)' }} />
        <div style={{ position: 'absolute', width: '390px', height: '325px', left: '0px', top: '0px', background: 'linear-gradient(167.57deg, rgba(46, 51, 90, 0.26) -4.68%, rgba(28, 27, 51, 0.26) 95.45%)', boxShadow: 'inset 0px 1px 0px rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(25px)', borderRadius: '44px' }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <ModalEllipses />
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          width: '390px',
          height: `${APP_FRAME_HEIGHT}px`,
          left: '0px',
          top: `${detailsTop}px`,
          overflow: 'visible',
          opacity: detailsOpacity,
          transition: isDraggingHandle
            ? 'none'
            : 'top 0.4s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.25s ease',
          zIndex: 10,
          pointerEvents: openProgress > 0.02 ? 'auto' : 'none',
        }}
      >
        <WeatherDetails
          key={detailsViewKey}
          scrollRef={detailsScrollRef}
          showHeader={false}
          contentTopInset={detailsContentTopInset}
          segmentedControl={embedForecastInDetails ? (
            <ModalSegmentedControl activeTab={activeTab} onTabChange={setActiveTab} />
          ) : null}
          forecast={embedForecastInDetails ? (
            <ModalForecast
              activeTab={activeTab}
              onTabChange={setActiveTab}
              hourlyData={forecast?.hourly ?? []}
              weeklyData={forecast?.weekly ?? []}
            />
          ) : null}
          header={header}
          widgets={widgets}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          width: '390px',
          height: `${headerBackdropHeight}px`,
          left: '0px',
          top: `${headerBackdropTop}px`,
          background: '#3d2b58',
          borderRadius: '44px 44px 0px 0px',
          overflow: 'hidden',
          opacity: headerOpacity,
          transition: isDraggingHandle
            ? 'none'
            : 'top 0.4s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.25s ease',
          zIndex: 21,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '352px',
            height: '352px',
            left: '0px',
            top: '0px',
            background:
              'conic-gradient(from 180deg at 50% 50%, #612FAB -90.71deg, rgba(97, 47, 171, 0) 50.02deg, #612FAB 129.55deg, rgba(97, 47, 171, 0) 226.06deg, #612FAB 269.29deg, rgba(97, 47, 171, 0) 410.02deg)',
            filter: 'blur(100px)',
            opacity: 0.42,
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          width: '390px',
          left: '0px',
          top: `${headerTop}px`,
          opacity: headerOpacity,
          transition: isDraggingHandle
            ? 'none'
            : 'top 0.4s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.22s ease',
          zIndex: 22,
          pointerEvents: 'none',
        }}
      >
        <WeatherDetailsHeader contentOpacity={headerContentOpacity} {...header} />
      </div>

      {showFloatingForecast && (
        <div
          style={{
            position: 'absolute',
            width: '390px',
            height: '232px',
            left: '0px',
            top: `${forecastTop}px`,
            transition: isDraggingHandle ? 'none' : 'top 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
            zIndex: 23,
          }}
        >
          <ModalSegmentedControl activeTab={activeTab} onTabChange={setActiveTab} />
          <ModalForecast
            activeTab={activeTab}
            onTabChange={setActiveTab}
            hourlyData={forecast?.hourly ?? []}
            weeklyData={forecast?.weekly ?? []}
          />
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          left: 'calc(50% - 70px)',
          top: `${handleTop}px`,
          width: '140px',
          height: '44px',
          zIndex: 30,
          transition: isDraggingHandle ? 'none' : 'top 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
        }}
      >
        <SheetDragHandle
          isDragging={isDraggingHandle}
          onPointerDown={handleDragPointerDown}
          onPointerUp={handleDragPointerEnd}
          onPointerCancel={handleDragPointerEnd}
        />
      </div>
    </>
  );
};

export default Modal;
