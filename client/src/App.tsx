import React, { useEffect, useState } from "react";

function App() {
  const [apiData, setApiData] = useState<any>([{}]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((response) => {
        setApiData(response);
      });
  }, []);

  return (
    <div className="App">
      {typeof apiData.users === "undefined" ? (
        <p>Loading...</p>
      ) : (
        apiData.users.map((user, i) => <p key={i}>{user}</p>)
      )}
    </div>
  );
}

export default App;
