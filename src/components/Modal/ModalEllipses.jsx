import React from 'react';

const ModalEllipses = () => {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          width: '250px',
          height: '250px',
          left: '191px',
          top: '38px',
          background: 'conic-gradient(from 180deg at 50% 50%, #612FAB -90.71deg, rgba(97, 47, 171, 0) 50.02deg, #612FAB 129.55deg, rgba(97, 47, 171, 0) 226.06deg, #612FAB 269.29deg, rgba(97, 47, 171, 0) 410.02deg)',
          filter: 'blur(69.8324px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'absolute',
          width: '425px',
          height: '425px',
          left: '43px',
          top: '284px',
          background: 'conic-gradient(from 180deg at 50% 50%, #612FAB -90.71deg, rgba(97, 47, 171, 0) 50.02deg, #612FAB 129.55deg, rgba(97, 47, 171, 0) 226.06deg, #612FAB 269.29deg, rgba(97, 47, 171, 0) 410.02deg)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
    </>
  );
};

export default ModalEllipses;
