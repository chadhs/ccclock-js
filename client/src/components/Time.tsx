import React, { useEffect, useState } from "react";

function Time() {
  const [hours, setHours] = useState<any>(0);
  const [minutes, setMinutes] = useState<any>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      // setHours(hours >= 13 ? hours - 12 : hours);
      setHours(hours);
      setMinutes(minutes);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hour12h = hours >= 13 ? hours - 12 : hours;
  const hour = hour12h <= 9 ? "0" + hour12h.toString() : hour12h.toString();
  const minute = minutes <= 9 ? "0" + minutes.toString() : minutes.toString();
  const timeH1 = hour.slice(0, 1);
  const timeH2 = hour.slice(1, 2);
  const timeH1Class = timeH1 === "0" ? "time-zero" : "time-one";

  return (
    <div className="time-display">
      <text className={timeH1Class}>{timeH1}</text>
      <text className="time-rest">
        {timeH2}:{minute}
      </text>
    </div>
  );
}

export default Time;
