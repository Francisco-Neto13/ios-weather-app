import AppLayout from "./components/Background/AppLayout";
import House from "./components/House/House";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";
import TabBar from "./components/Navigation/TabBar";
import Modal from "./components/Modal/Modal";

function App() {
  return (
    <AppLayout>
      <House />
      <WeatherInfo />
      <Modal />
      <div className="absolute bottom-0 left-0 z-20 overflow-visible">
        <TabBar />
      </div>
    </AppLayout>
  );
}

export default App;