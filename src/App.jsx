import { useMemo, useState } from "react";
import AppLayout from "./components/Background/AppLayout";
import House from "./components/House/House";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";
import TabBar from "./components/Navigation/TabBar";
import Modal from "./components/Modal/Modal";
import SearchAdd from "./components/SearchAdd/SearchAdd";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

function App() {
  const [sheetProgress, setSheetProgress] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);

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
        style={{
          position: "absolute",
          inset: "0px",
          transform: searchOpen ? "translateX(0px)" : "translateX(390px)",
          transition: "transform 0.42s cubic-bezier(0.32, 0.72, 0, 1)",
          zIndex: 30,
          borderRadius: "55px",
          overflow: "hidden",
          clipPath: "inset(0 round 55px)",
        }}
      >
        <SearchAdd onClose={() => setSearchOpen(false)} />
      </div>

      <div
        className="absolute bottom-0 left-0 z-20 overflow-visible"
        style={tabBarStyle}
      >
        <TabBar onOpenSearch={() => setSearchOpen(true)} />
      </div>
    </AppLayout>
  );
}

export default App;
