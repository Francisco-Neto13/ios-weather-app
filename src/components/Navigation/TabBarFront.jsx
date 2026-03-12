import React from "react";

const TabBarFront = () => {
  return (
    <div className="absolute inset-0" style={{ overflow: "visible" }}>
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(360deg, #262C51 0%, #3E3F74 100%)",
          clipPath:
            'path("M174 0H216C248 0 257.501 24.1398 267.732 48.6985C278.325 74.1247 289 100 324 100H66.0001C101 100 111.675 74.1247 122.268 48.6985C132.499 24.1398 142 0 174 0Z")',
        }}
      />
      <svg
        width="390"
        height="100"
        viewBox="0 0 390 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 pointer-events-none"
      >
        <path
          d="M174 0.25H216C231.923 0.25 242.229 6.24992 249.838 15.3008C257.462 24.37 262.382 36.5041 267.502 48.7949C272.794 61.4986 278.125 74.3646 286.524 84.0479C293.574 92.1753 302.781 98.0562 315.919 99.75H74.0811C87.2187 98.0562 96.4259 92.1753 103.476 84.0479C111.875 74.3646 117.206 61.4986 122.498 48.7949C127.618 36.5041 132.538 24.37 140.162 15.3008C147.771 6.24992 158.077 0.25 174 0.25Z"
          stroke="#7582F4"
          strokeOpacity="0.5"
          strokeWidth="0.5"
        />
      </svg>
      <div
        className="absolute z-10 w-[64px] h-[64px] flex items-center justify-center"
        style={{ left: "163px", top: "12px" }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(-40deg, rgba(255, 255, 255, 0.76) 0%, #000000 100%)",
            opacity: 0.4,
          }}
        />
        <div
          className="absolute rounded-full p-[0.2px]"
          style={{
            top: "3px",
            left: "3px",
            width: "58px",
            height: "58px",
            background: "linear-gradient(180deg, #FFFFFF 0%, #AEAEAE 100%)",
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: "linear-gradient(-35deg, #F5F5F9 0%, #DADFE7 100%)",
              boxShadow: `
                inset 1px 1px 0.5px rgba(255, 255, 255, 1),
                -10px -10px 20px 0px rgba(255, 255, 255, 0.2),
                10px 10px 20px 0px rgba(13, 20, 49, 0.5)
              `,
            }}
          />
        </div>
        <div
          className="absolute top-[10px] left-[10px] w-[44px] h-[44px] flex items-center justify-center"
          style={{ pointerEvents: "none" }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.269 12.129C0.269 13.277 1.199 14.207 2.347 14.207H9.935V21.795C9.935 22.93 10.851 23.873 12 23.873C13.148 23.873 14.078 22.93 14.078 21.795V14.207H21.666C22.8 14.207 23.73 13.277 23.73 12.129C23.73 10.994 22.8 10.064 21.666 10.064H14.078V2.477C14.078 1.342 13.148 0.398 12 0.398C10.851 0.398 9.935 1.342 9.935 2.477V10.064H2.347C1.199 10.064 0.269 10.994 0.269 12.129Z"
              fill="#48319D"
            />
          </svg>
        </div>
        <div
          className="absolute rounded-full"
          style={{
            top: "3px",
            left: "3px",
            width: "58px",
            height: "58px",
            background:
              "linear-gradient(-27deg, #BBBFC7 0%, rgba(255,255,255,0) 100%)",
            WebkitMaskImage:
              "radial-gradient(circle, transparent 25px, black 26px), conic-gradient(from 0deg, black 90%, transparent 90% 100%)",
            maskImage:
              "radial-gradient(circle, transparent 25px, black 26px), conic-gradient(from 0deg, black 90%, transparent 90% 100%)",
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect",
            filter: "blur(2px)",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
};

export default TabBarFront;
