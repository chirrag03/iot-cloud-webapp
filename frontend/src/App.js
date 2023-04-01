import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [doorStatus, setDoorStatus] = useState(null);

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:8000/sse/stream/my-sse-stream');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setDoorStatus(data.status);
    };
  }, []);

  return (
    <div className="App App-header">
      <h2>Door Status : {doorStatus || 'Loading...'}</h2>
    </div>
  );
}

export default App;
