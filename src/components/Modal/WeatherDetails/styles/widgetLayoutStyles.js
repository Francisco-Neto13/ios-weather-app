const baseWidgetCardStyle = {
  boxSizing: 'border-box',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '22px',
  background: '#1f1a32',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: "'SF Pro Display', -apple-system, sans-serif",
  flexShrink: 0,
};

export const mediumWidgetCardStyle = {
  ...baseWidgetCardStyle,
  width: '342px',
  height: '158px',
  padding: '16px 20px',
  justifyContent: 'space-between',
};

export const smallWidgetCardStyle = {
  ...baseWidgetCardStyle,
  width: '164px',
  height: '164px',
  padding: '16px',
  justifyContent: 'space-between',
};

export const compactGaugeCardStyle = {
  ...smallWidgetCardStyle,
  padding: '14px 14px 12px',
  justifyContent: 'flex-start',
  gap: '2px',
};

export const compactCompassCardStyle = {
  ...smallWidgetCardStyle,
  padding: '14px 16px 12px',
  justifyContent: 'flex-start',
  gap: '2px',
};

export const widgetGridRowStyle = {
  display: 'flex',
  flexDirection: 'row',
  gap: '14px',
};

export const secondaryWidgetTextStyle = {
  margin: 0,
  fontSize: '13px',
  color: 'rgba(235, 235, 245, 0.6)',
  lineHeight: 1.4,
};
