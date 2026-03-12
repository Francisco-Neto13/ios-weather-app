const WeatherInfo = ({
  city = "Montreal",
  temperature = "19°",
  condition = "Mostly Clear",
  high = "24°",
  low = "18°",
}) => {
  return (
    <div className="absolute top-[98px] left-0 w-[390px] h-[183px] flex flex-col items-center box-border font-sf">
      <h1 className="text-[34px] font-normal leading-[41px] tracking-[0.37px] text-primary-dark">
        {city}
      </h1>
      <span className="text-[96px] weather-temp-thin leading-[70px] tracking-[0.37px] text-primary-dark mt-[12px]">
        {temperature}
      </span>
      <div className="mt-[12px] flex flex-col items-center">
        <p className="text-[20px] font-semibold leading-[24px] tracking-[0.38px] text-secondary-dark/60">
          {condition}
        </p>
        <p className="text-[20px] font-semibold leading-[24px] tracking-[0.38px] text-primary-dark">
          H:{high} &nbsp; L:{low}
        </p>
      </div>
    </div>
  );
};

export default WeatherInfo;
