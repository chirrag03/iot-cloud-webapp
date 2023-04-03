import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [doorStatus, setDoorStatus] = useState(null);
  // console.log("djdjd");
  useEffect(() => {
    const eventSource = new EventSource('http://localhost:8000/sse/message/');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("heys");
      setDoorStatus(data);
    };
  }, []);

  return (
    <div className="App App-header">
      {/* {console.log(doorStatus)} */}
      <h2>Door Status : {doorStatus || 'Loading...'}</h2>
    </div>
  );
}

export default App;
