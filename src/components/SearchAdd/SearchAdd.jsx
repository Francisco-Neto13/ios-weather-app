import React, { useEffect, useMemo, useRef, useState } from 'react';
import StatusBar from '../StatusBar/StatusBar';
import SearchAddEllipses from './SearchAddEllipses';
import TopNavigation from './TopNavigation';
import WeatherWidget from './WeatherWidget';

const SearchAdd = ({
  onClose,
  query = '',
  onQueryChange,
  onClearVisibleList,
  searchResults = [],
  savedLocations = [],
  onSelectLocation,
  isSearching = false,
  statusTime,
}) => {
  const listScrollRef = useRef(null);
  const suppressClickRef = useRef(false);
  const suppressClickTimeoutRef = useRef(null);
  const [isDraggingList, setIsDraggingList] = useState(false);
  const dragStateRef = useRef({
    isDragging: false,
    startY: 0,
    startScrollTop: 0,
    scroller: null,
    moved: false,
  });
  const trimmedQuery = query.trim();
  const list = useMemo(
    () => (trimmedQuery ? searchResults : savedLocations),
    [trimmedQuery, searchResults, savedLocations]
  );
  const showEmptyState = trimmedQuery && !isSearching && list.length === 0;

  useEffect(() => {
    return () => {
      if (suppressClickTimeoutRef.current) {
        clearTimeout(suppressClickTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!dragStateRef.current.isDragging || !dragStateRef.current.scroller) return;

      const deltaY = event.clientY - dragStateRef.current.startY;

      if (Math.abs(deltaY) > 4) {
        dragStateRef.current.moved = true;
        suppressClickRef.current = true;
      }

      dragStateRef.current.scroller.scrollTop = dragStateRef.current.startScrollTop - deltaY;
    };

    const endMouseDrag = () => {
      if (dragStateRef.current.moved) {
        suppressClickRef.current = true;

        if (suppressClickTimeoutRef.current) {
          clearTimeout(suppressClickTimeoutRef.current);
        }

        suppressClickTimeoutRef.current = window.setTimeout(() => {
          suppressClickRef.current = false;
          suppressClickTimeoutRef.current = null;
        }, 180);
      }

      dragStateRef.current.isDragging = false;
      dragStateRef.current.scroller = null;
      dragStateRef.current.moved = false;
      document.body.style.userSelect = '';
      setIsDraggingList(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', endMouseDrag);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', endMouseDrag);
    };
  }, []);

  const handleListMouseDown = (event) => {
    if (event.button !== 0) return;

    const scroller = listScrollRef.current;
    if (!scroller) return;

    dragStateRef.current.isDragging = true;
    dragStateRef.current.startY = event.clientY;
    dragStateRef.current.startScrollTop = scroller.scrollTop;
    dragStateRef.current.scroller = scroller;
    dragStateRef.current.moved = false;
    document.body.style.userSelect = 'none';
    setIsDraggingList(true);
  };

  const handleListClickCapture = (event) => {
    if (!suppressClickRef.current) return;

    event.preventDefault();
    event.stopPropagation();
  };

  const handleSelectCard = (location) => {
    if (suppressClickRef.current || dragStateRef.current.moved || isDraggingList) return;
    onSelectLocation?.(location.location ?? location);
  };

  return (
    <div
      style={{
        position: 'absolute',
        inset: '0px',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(168.44deg, #2E335A 1.62%, #1C1B33 95.72%)',
        boxShadow: '40px 60px 150px rgba(59, 38, 123, 0.7)',
        borderRadius: '55px',
        overflow: 'hidden',
        clipPath: 'inset(0 round 55px)',
      }}
    >
      <SearchAddEllipses />
      <StatusBar time={statusTime} />
      <TopNavigation
        onClose={onClose}
        query={query}
        onQueryChange={onQueryChange}
        onClearVisibleList={onClearVisibleList}
        canClearVisibleList={list.length > 0}
        isSearching={isSearching}
      />

      <div
        className="ios-scroll-hidden"
        ref={listScrollRef}
        onMouseDown={handleListMouseDown}
        onClickCapture={handleListClickCapture}
        style={{
          position: 'absolute',
          top: '160px',
          right: '24px',
          bottom: '28px',
          left: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          overflowY: 'auto',
          zIndex: 1,
          cursor: isDraggingList ? 'grabbing' : 'grab',
        }}
      >
        {showEmptyState && (
          <div style={{ color: 'rgba(235, 235, 245, 0.7)', fontSize: '15px' }}>
            No results found.
          </div>
        )}
        {list.map((location) => {
          const { key, ...widgetProps } = location;

          return (
            <WeatherWidget
              key={key ?? location.city}
              {...widgetProps}
              disablePressFeedback={isDraggingList}
              onSelect={() => handleSelectCard(location)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SearchAdd;
