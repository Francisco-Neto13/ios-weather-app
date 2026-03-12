import BottomGradient from "./BottomGradient";

const AppLayout = ({ children }) => {
  return (
    <div className="bg-[#A499C0] w-screen min-h-screen flex items-center justify-center p-4">
      <div
        className="relative w-[390px] h-[844px] rounded-[55px] shadow-[0_40px_80px_rgba(0,0,0,0.4)]"
        style={{ overflow: "clip" }}
      >
        <img
          src="/background.png"
          alt="background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <BottomGradient />
        <div className="relative z-20 w-full h-full">{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;
