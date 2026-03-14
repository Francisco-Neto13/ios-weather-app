import React from 'react';

const ellipseGradient =
  'conic-gradient(from 180deg at 50% 50%, #612FAB -90.71deg, rgba(97, 47, 171, 0) 50.02deg, #612FAB 129.55deg, rgba(97, 47, 171, 0) 226.06deg, #612FAB 269.29deg, rgba(97, 47, 171, 0) 410.02deg)';

const SearchAddEllipses = () => {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: '0px',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '352px',
          height: '352px',
          left: '5.53px',
          top: '72px',
          background: ellipseGradient,
          filter: 'blur(98.324px)',
          opacity: 0.9,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '365px',
          height: '365px',
          left: '130.53px',
          top: '462px',
          background: ellipseGradient,
          filter: 'blur(101.955px)',
          opacity: 0.9,
        }}
      />
    </div>
  );
};

export default SearchAddEllipses;
