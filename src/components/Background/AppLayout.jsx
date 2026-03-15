import { useEffect, useMemo, useState } from "react";
import BottomGradient from "./BottomGradient";

const BASE_FRAME_WIDTH = 437;
const BASE_FRAME_HEIGHT = 882;
const VIEWPORT_PADDING = 32;
const MAX_SCALE = 1.18;

const getFrameScale = () => {
  if (typeof window === "undefined") return 1;

  const availableWidth = Math.max(window.innerWidth - VIEWPORT_PADDING, 0);
  const availableHeight = Math.max(window.innerHeight - VIEWPORT_PADDING, 0);
  const widthScale = availableWidth / BASE_FRAME_WIDTH;
  const heightScale = availableHeight / BASE_FRAME_HEIGHT;

  return Math.min(widthScale, heightScale, MAX_SCALE);
};

const AppLayout = ({ children }) => {
  const [frameScale, setFrameScale] = useState(getFrameScale);

  useEffect(() => {
    const handleResize = () => setFrameScale(getFrameScale());

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scaledSize = useMemo(
    () => ({
      width: `${BASE_FRAME_WIDTH * frameScale}px`,
      height: `${BASE_FRAME_HEIGHT * frameScale}px`,
    }),
    [frameScale]
  );

  return (
    <div
      className="bg-[#A499C0] w-screen min-h-screen flex items-center justify-center p-4"
      style={{ overflow: "auto" }}
    >
      <div style={scaledSize}>
        <div
          className="relative"
          style={{
            width: `${BASE_FRAME_WIDTH}px`,
            height: `${BASE_FRAME_HEIGHT}px`,
            isolation: "isolate",
            transform: `scale(${frameScale})`,
            transformOrigin: "top left",
          }}
        >
          <div
            className="absolute left-[20px] top-[16px] w-[397px] h-[850px] rounded-[58px] overflow-hidden pointer-events-none"
            aria-hidden="true"
          >
            <img
              src="/images/background.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover scale-[1.02] opacity-95"
            />
          </div>

          <div
            className="absolute left-[23.5px] top-[19px] w-[390px] h-[844px] rounded-[55px] overflow-hidden"
            style={{
              isolation: "isolate",
              boxShadow: "0 40px 80px rgba(0, 0, 0, 0.4)",
            }}
          >
            <img
              src="/images/background.png"
              alt="background"
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <BottomGradient />
            <div
              className="relative z-20 w-full h-full"
              style={{ borderRadius: "55px", overflow: "hidden" }}
            >
              {children}
            </div>
          </div>

          <img
            src="/images/iphone.png"
            alt="iPhone frame"
            className="absolute inset-0 z-40 w-full h-full object-contain pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
