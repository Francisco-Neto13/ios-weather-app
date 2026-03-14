import BottomGradient from "./BottomGradient";

const AppLayout = ({ children }) => {
  return (
    <div className="bg-[#A499C0] w-screen min-h-screen flex items-center justify-center p-4">
      <div className="relative w-[437px] h-[882px]" style={{ isolation: "isolate" }}>
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
  );
};

export default AppLayout;
