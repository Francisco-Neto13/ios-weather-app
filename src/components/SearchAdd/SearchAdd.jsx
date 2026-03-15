import React, { useMemo } from 'react';
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
  const trimmedQuery = query.trim();
  const list = useMemo(
    () => (trimmedQuery ? searchResults : savedLocations),
    [trimmedQuery, searchResults, savedLocations]
  );
  const showEmptyState = trimmedQuery && !isSearching && list.length === 0;

  return (
    <div
      style={{
        position: 'absolute',
        inset: '0px',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(168.44deg, #2E335A 1.62%, #1C1B33 95.72%)',
        boxShadow: '40px 60px 150px rgba(59, 38, 123, 0.7)',
        borderRadius: '44px',
        overflow: 'hidden',
        clipPath: 'inset(0 round 44px)',
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
        }}
      >
        {showEmptyState && (
          <div style={{ color: 'rgba(235, 235, 245, 0.7)', fontSize: '15px' }}>
            No results found.
          </div>
        )}
        {list.map((location) => (
          <WeatherWidget
            key={location.key ?? location.city}
            {...location}
            onSelect={() => onSelectLocation?.(location.location ?? location)}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchAdd;
