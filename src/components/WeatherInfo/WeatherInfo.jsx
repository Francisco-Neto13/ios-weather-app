const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const lerp = (start, end, progress) => start + (end - start) * progress;

const WeatherInfo = ({
  city = "Montreal",
  temperature = "19\u00B0",
  condition = "Mostly Clear",
  high = "24\u00B0",
  low = "18\u00B0",
  sheetProgress = 0,
}) => {
  const morphProgress = clamp((sheetProgress - 0.08) / 0.76, 0, 1);
  const fadeOutProgress = clamp((sheetProgress - 0.6) / 0.18, 0, 1);

  const containerTop = lerp(98, 52, morphProgress);
  const containerHeight = lerp(183, 74, morphProgress);

  const cityOpacity = 1 - fadeOutProgress * 0.9;
  const cityWidth = lerp(280, 200, morphProgress);

  const temperatureTop = lerp(53, 39, morphProgress);
  const temperatureLeft = lerp(195, 116, morphProgress);
  const temperatureFontSize = lerp(96, 20, morphProgress);
  const temperatureLineHeight = lerp(70, 24, morphProgress);
  const temperatureOpacity = 1 - fadeOutProgress * 0.9;

  const conditionTop = lerp(141, 39, morphProgress);
  const conditionLeft = lerp(195, 212, morphProgress);
  const conditionWidth = lerp(220, 132, morphProgress);
  const conditionFontSize = lerp(20, 20, morphProgress);
  const conditionLineHeight = lerp(24, 24, morphProgress);
  const conditionOpacity = 1 - fadeOutProgress * 0.9;

  const highLowTop = lerp(165, 140, morphProgress);
  const highLowOpacity = 1 - clamp(morphProgress * 1.8, 0, 1);
  const highLowTranslateY = lerp(0, -10, morphProgress);

  return (
    <div
      style={{
        position: "absolute",
        top: `${containerTop}px`,
        left: "0px",
        width: "390px",
        height: `${containerHeight}px`,
        pointerEvents: "none",
      }}
    >
      <span
        style={{
          position: "absolute",
          width: `${cityWidth}px`,
          left: "50%",
          top: "0px",
          transform: "translateX(-50%)",
          fontFamily: "'SF Pro Display', -apple-system, sans-serif",
          fontWeight: 400,
          fontSize: "34px",
          lineHeight: "41px",
          letterSpacing: "0.374px",
          color: "#FFFFFF",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          textAlign: "center",
          opacity: cityOpacity,
        }}
      >
        {city}
      </span>

      <span
        style={{
          position: "absolute",
          left: `${temperatureLeft}px`,
          top: `${temperatureTop}px`,
          transform: "translateX(-50%)",
          fontFamily: "'SF Pro Display', -apple-system, sans-serif",
          fontWeight: morphProgress > 0.62 ? 600 : 100,
          fontSize: `${temperatureFontSize}px`,
          lineHeight: `${temperatureLineHeight}px`,
          letterSpacing: "0.374px",
          color: "#FFFFFF",
          whiteSpace: "nowrap",
          opacity: temperatureOpacity,
        }}
      >
        {temperature}
      </span>

      <span
        style={{
          position: "absolute",
          width: `${conditionWidth}px`,
          left: `${conditionLeft}px`,
          top: `${conditionTop}px`,
          transform: "translateX(-50%)",
          fontFamily: "'SF Pro Display', -apple-system, sans-serif",
          fontWeight: 600,
          fontSize: `${conditionFontSize}px`,
          lineHeight: `${conditionLineHeight}px`,
          letterSpacing: "0.38px",
          color: "rgba(235, 235, 245, 0.6)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          textAlign: "center",
          opacity: conditionOpacity,
        }}
      >
        {condition}
      </span>

      <span
        style={{
          position: "absolute",
          left: "50%",
          top: `${highLowTop}px`,
          transform: `translateX(-50%) translateY(${highLowTranslateY}px)`,
          fontFamily: "'SF Pro Display', -apple-system, sans-serif",
          fontWeight: 600,
          fontSize: "20px",
          lineHeight: "24px",
          letterSpacing: "0.38px",
          color: "#FFFFFF",
          whiteSpace: "nowrap",
          opacity: highLowOpacity,
        }}
      >
        H:{high} &nbsp; L:{low}
      </span>
    </div>
  );
};

export default WeatherInfo;

