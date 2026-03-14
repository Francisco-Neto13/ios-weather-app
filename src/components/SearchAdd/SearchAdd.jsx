import React from 'react';
import SearchAddEllipses from './SearchAddEllipses';
import TopNavigation from './TopNavigation';
import WeatherWidget from './WeatherWidget';

const searchAddWidgetIcons = {
  moonCloudFastWind: '/widgets/big/moon-cloud-fast-wind.png',
  moonCloudMidRain: '/widgets/big/moon-cloud-mid-rain.png',
  sunCloudAngledRain: '/widgets/big/sun-cloud-angled-rain.png',
  sunCloudMidRain: '/widgets/big/sun-cloud-mid-rain.png',
  tornado: '/widgets/big/tornado.png',
};

const savedLocations = [
  {
    city: 'Montreal, Canada',
    temperature: '19°',
    condition: 'Mid Rain',
    highLow: 'H:24°  L:18°',
    icon: searchAddWidgetIcons.moonCloudMidRain,
  },
];

const SearchAdd = ({ onClose }) => {
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
      <TopNavigation onClose={onClose} />

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
        {savedLocations.map((location) => (
          <WeatherWidget key={location.city} {...location} />
        ))}
      </div>
    </div>
  );
};

export default SearchAdd;
