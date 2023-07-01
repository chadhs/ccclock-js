import React, { useEffect, useState } from "react";

function kelvinToF(kTemp) {
  return Math.trunc((kTemp - 273.15) * (9 / 5) + 32);
}

function Weather() {
  const [weatherData, setWeatherData] = useState<any>({});

  const fetchWeather = () => {
    fetch("/api/weather")
      .then((response) => response.json())
      .then((response) => {
        setWeatherData(response);
      });
  };

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(() => {
      fetchWeather();
    }, 300000);
    return () => clearInterval(interval);
  }, []);

  const feelsToday =
    Object.keys(weatherData).length === 0
      ? []
      : Object.values(weatherData?.daily?.[0]?.feels_like).sort();
  const feelsCurrent = kelvinToF(weatherData?.current?.feels_like);
  const feelsHigh = kelvinToF(feelsToday[feelsToday.length - 1]);
  const feelsLow = kelvinToF(feelsToday[0]);
  const condCurrent = weatherData?.current?.weather?.[0]?.id;
  const cond3hour = weatherData?.hourly?.[3]?.weather?.[0]?.id;
  const cond6hour = weatherData?.hourly?.[6]?.weather?.[0]?.id;
  const nowUnix = new Date().getTime().toString().slice(0, -3);
  const sunset = weatherData?.daily?.[0]?.sunset;
  const isNight = nowUnix > sunset;

  return (
    <>
      {Object.keys(weatherData).length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="temp-display">
            <div className="temp">{feelsCurrent}°</div>
            <div className="hi-low">
              {feelsHigh}°/{feelsLow}°
            </div>
          </div>
          <div className="cond-display">
            <i
              className={
                "wi wi-owm-" +
                (isNight ? "night" : "day") +
                "-" +
                condCurrent +
                " wi-fw"
              }
            ></i>
            <i
              className={
                "wi wi-owm-" +
                (isNight ? "night" : "day") +
                "-" +
                cond3hour +
                " wi-fw"
              }
            ></i>
            <i
              className={
                "wi wi-owm-" +
                (isNight ? "night" : "day") +
                "-" +
                cond6hour +
                " wi-fw"
              }
            ></i>
          </div>
        </>
      )}
    </>
  );
}

export default Weather;
