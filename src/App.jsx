import { useMemo, useState } from "react";
import AppLayout from "./components/Background/AppLayout";
import House from "./components/House/House";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";
import TabBar from "./components/Navigation/TabBar";
import Modal from "./components/Modal/Modal";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function App() {
  const [sheetProgress, setSheetProgress] = useState(0);

  const tabBarStyle = useMemo(() => {
    const hiddenProgress = clamp((sheetProgress - 0.12) / 0.52, 0, 1);

    return {
      opacity: 1 - hiddenProgress,
      transform: `translateY(${hiddenProgress * 120}px)`,
      pointerEvents: hiddenProgress > 0.01 ? "none" : "auto",
      transition:
        "opacity 0.22s ease, transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)",
    };
  }, [sheetProgress]);

  return (
    <AppLayout>
      <House />
      <WeatherInfo />
      <Modal onSheetProgress={setSheetProgress} />
      <div
        className="absolute bottom-0 left-0 z-20 overflow-visible"
        style={tabBarStyle}
      >
        <TabBar />
      </div>
    </AppLayout>
  );
}

export default App;
