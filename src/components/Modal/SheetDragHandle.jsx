import React from 'react';

const SheetDragHandle = ({
  isDragging = false,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: 'calc(50% - 70px)',
        top: '-8px',
        width: '140px',
        height: '44px',
        zIndex: 9,
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      <div
        style={{
          position: 'absolute',
          top: '16px',
          left: '30px',
          width: '80px',
          height: '12px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            width: '48px',
            height: '5px',
            background: 'rgba(0, 0, 0, 0.32)',
            borderRadius: '10px',
          }}
        />
      </div>
    </div>
  );
};

export default SheetDragHandle;
