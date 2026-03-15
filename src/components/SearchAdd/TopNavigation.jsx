import React, { useEffect, useRef, useState } from 'react';

const TopNavigation = ({
  onClose,
  query = '',
  onQueryChange,
  onClearVisibleList,
  canClearVisibleList = false,
  isSearching = false,
}) => {
  const [draftQuery, setDraftQuery] = useState(query);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    setDraftQuery(query);
  }, [query]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [query]);

  useEffect(() => {
    const handle = setTimeout(() => {
      onQueryChange?.(draftQuery);
    }, 350);

    return () => clearTimeout(handle);
  }, [draftQuery, onQueryChange]);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const handlePointerDown = (event) => {
      if (menuRef.current?.contains(event.target)) return;
      setIsMenuOpen(false);
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, [isMenuOpen]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '0px',
        gap: '2px',
        position: 'absolute',
        width: '390px',
        height: '155px',
        left: '0px',
        top: '0px',
        boxSizing: 'border-box',
        zIndex: 2,
      }}
    >
      <div style={{ width: '390px', height: '47px', flexShrink: 0 }} />

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '390px',
          height: '52px',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '9px 9px 9px 16px',
            gap: '10px',
            flex: 1,
            height: '52px',
            cursor: 'pointer',
          }}
          onClick={onClose}
        >
          <svg
            width="12"
            height="20"
            viewBox="0 0 12 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 9.93896C0 10.3208 0.145996 10.6465 0.449219 10.9385L9.20898 19.5073C9.44482 19.7544 9.75928 19.8779 10.1187 19.8779C10.8486 19.8779 11.4214 19.3164 11.4214 18.5752C11.4214 18.2158 11.2754 17.8901 11.0283 17.6431L3.1333 9.93896L11.0283 2.23486C11.2754 1.97656 11.4214 1.65088 11.4214 1.2915C11.4214 0.561523 10.8486 0 10.1187 0C9.75928 0 9.44482 0.123535 9.20898 0.370605L0.449219 8.93945C0.145996 9.23145 0.0112305 9.55713 0 9.93896Z"
              fill="#EBEBF5"
              fillOpacity="0.6"
            />
          </svg>
          <span
            style={{
              fontFamily: "'SF Pro Display', -apple-system, sans-serif",
              fontWeight: 400,
              fontSize: '28px',
              lineHeight: '34px',
              letterSpacing: '0.364px',
              color: '#FFFFFF',
            }}
          >
            Weather
          </span>
        </div>

        <div
          ref={menuRef}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: '9px 16px 9px 9px',
            flex: 1,
            height: '52px',
            position: 'relative',
          }}
        >
          <button
            type="button"
            aria-label="Open list options"
            onClick={() => setIsMenuOpen((open) => !open)}
            style={{
              width: '28px',
              height: '28px',
              padding: 0,
              border: 'none',
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.9453 27.8906C21.5742 27.8906 27.8906 21.5605 27.8906 13.9453C27.8906 6.31641 21.5605 0 13.9316 0C6.31641 0 0 6.31641 0 13.9453C0 21.5605 6.33008 27.8906 13.9453 27.8906ZM13.9453 25.5664C7.49219 25.5664 2.33789 20.3984 2.33789 13.9453C2.33789 7.49219 7.47852 2.32422 13.9316 2.32422C20.3848 2.32422 25.5527 7.49219 25.5664 13.9453C25.5801 20.3984 20.3984 25.5664 13.9453 25.5664ZM7.56055 15.9277C8.6543 15.9277 9.54297 15.0391 9.54297 13.9316C9.54297 12.8379 8.64062 11.9492 7.56055 11.9492C6.45312 11.9492 5.56445 12.8379 5.56445 13.9316C5.56445 15.0391 6.45312 15.9277 7.56055 15.9277ZM13.9316 15.9277C15.0254 15.9277 15.9277 15.0391 15.9277 13.9316C15.9277 12.8379 15.0254 11.9492 13.9316 11.9492C12.8379 11.9492 11.9355 12.8379 11.9355 13.9316C11.9355 15.0391 12.8379 15.9277 13.9316 15.9277ZM20.3164 15.9277C21.4102 15.9277 22.2988 15.0391 22.2988 13.9316C22.2988 12.8379 21.4102 11.9492 20.3164 11.9492C19.209 11.9492 18.3203 12.8379 18.3203 13.9316C18.3203 15.0391 19.209 15.9277 20.3164 15.9277Z"
                fill="white"
              />
            </svg>
          </button>

          {isMenuOpen && (
            <div
              style={{
                position: 'absolute',
                top: '48px',
                right: '12px',
                minWidth: '154px',
              }}
            >
              <button
                type="button"
                disabled={!canClearVisibleList}
                onClick={() => {
                  onClearVisibleList?.();
                  setIsMenuOpen(false);
                }}
                style={{
                  width: '100%',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  background: canClearVisibleList
                    ? '#242041'
                    : 'rgba(36, 32, 65, 0.45)',
                  boxShadow:
                    '0px 18px 40px rgba(10, 10, 24, 0.32), inset 0px 1px 0px rgba(255,255,255,0.25)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  color: canClearVisibleList ? '#FFFFFF' : 'rgba(235, 235, 245, 0.55)',
                  fontFamily: "'SF Pro Text', -apple-system, sans-serif",
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '18px',
                  textAlign: 'center',
                  cursor: canClearVisibleList ? 'pointer' : 'default',
                  position: 'relative',
                }}
              >
                {'Limpar sele\u00e7\u00e3o'}
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '7px 8px',
          gap: '6px',
          width: '358px',
          height: '36px',
          marginLeft: '16px',
          background:
            'linear-gradient(168.44deg, rgba(46,51,90,0.26) 1.62%, rgba(28,27,51,0.26) 95.72%)',
          boxShadow: 'inset 0px 4px 4px rgba(0,0,0,0.25)',
          borderRadius: '10px',
          boxSizing: 'border-box',
          flexShrink: 0,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
          <circle
            cx="6.5"
            cy="6.5"
            r="5.5"
            stroke="rgba(235,235,245,0.6)"
            strokeWidth="1.5"
          />
          <line
            x1="10.5"
            y1="10.5"
            x2="14.5"
            y2="14.5"
            stroke="rgba(235,235,245,0.6)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        <input
          type="text"
          value={draftQuery}
          onChange={(event) => setDraftQuery(event.target.value)}
          placeholder="Search for a city or airport"
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontFamily: "'SF Pro Text', -apple-system, sans-serif",
            fontWeight: 400,
            fontSize: '17px',
            lineHeight: '22px',
            letterSpacing: '-0.408px',
            color: '#FFFFFF',
          }}
        />
      </div>

      {isSearching && (
        <div
          style={{
            marginLeft: '16px',
            marginTop: '8px',
            fontFamily: "'SF Pro Text', -apple-system, sans-serif",
            fontSize: '13px',
            color: 'rgba(235, 235, 245, 0.6)',
          }}
        >
          Searching...
        </div>
      )}
    </div>
  );
};

export default TopNavigation;
