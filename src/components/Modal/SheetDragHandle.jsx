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
        left: 'calc(50% - 40px)',
        top: '2px',
        width: '80px',
        height: '24px',
        zIndex: 9,
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
    >
      <div
        style={{
          position: 'absolute',
          top: '6px',
          left: '0px',
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
