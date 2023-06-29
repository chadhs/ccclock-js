import React, { useEffect, useState } from "react";

function Time() {
  const [hours, setHours] = useState<any>(0);
  const [minutes, setMinutes] = useState<any>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      setHours(hours >= 13 ? hours - 12 : hours);
      setMinutes(minutes);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="time-display">
      {hours}:{minutes}
    </div>
  );
}

export default Time;
