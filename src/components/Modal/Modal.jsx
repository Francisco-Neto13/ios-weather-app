import { useState } from 'react';
import ModalSegmentedControl from './ModalSegmentedControl';
import ModalForecast from './ModalForecast';
import ModalEllipses from './ModalEllipses';
import HomeIndicator from './HomeIndicator';

const Modal = () => {
  const [activeTab, setActiveTab] = useState('hourly');

  return (
    <div
      className="ios-scroll-hidden"
      style={{
        position: 'absolute',
        width: '390px',
        height: '702px',
        left: '0px',
        top: '519px',
        overflowY: 'scroll',
        borderRadius: '44px',
        background: 'linear-gradient(180deg, rgba(58, 63, 84, 0) 12.37%, rgba(58, 63, 84, 1) 60%)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '286px',
          height: '9.89px',
          left: '48px',
          top: '-9.89px',
          background: '#E0D9FF',
          filter: 'blur(5px)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          width: '286px',
          height: '32px',
          left: '48px',
          top: '-33px',
          background: 'rgba(196, 39, 251, 0.5)',
          filter: 'blur(30px)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          width: '250px',
          height: '250px',
          left: '271px',
          top: '65px',
          background: 'conic-gradient(from 180deg at 50% 50%, #612FAB -47.46deg, rgba(97, 47, 171, 0) 50.02deg, #612FAB 129.55deg, rgba(97, 47, 171, 0) 226.06deg, #612FAB 312.54deg, rgba(97, 47, 171, 0) 410.02deg)',
          filter: 'blur(70px)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          width: '390px',
          height: '325px',
          left: '0px',
          top: '0px',
          background: 'linear-gradient(167.57deg, rgba(46, 51, 90, 0.26) -4.68%, rgba(28, 27, 51, 0.26) 95.45%)',
          boxShadow: 'inset 0px 1px 0px rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(25px)',
          borderRadius: '44px',
        }}
      />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <HomeIndicator />
        <ModalSegmentedControl activeTab={activeTab} onTabChange={setActiveTab} />
        <ModalForecast activeTab={activeTab} onTabChange={setActiveTab} />
        <ModalEllipses />
      </div>
    </div>
  );
};

export default Modal;
