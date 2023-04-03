import { useState, useEffect } from 'react';
import './App.css';
import mqtt from "mqtt";

function App() {
  const [doorStatus, setDoorStatus] = useState(null);
  // const eventSource = new EventSource('http://localhost:8000/sse/message/');
  // console.log("djdjd");
  useEffect(() => {
      // eventSource.onmessage = (event) => {
      // const data = JSON.parse(event.data);
      // console.log("heys");
      // setDoorStatus(data);
      const client = mqtt.connect('http://broker.hivemq.com', {
      clientId: 'clientId-12345',
    });

    client.on('connect', () => {
      console.log('connected to mqtt broker');
      client.subscribe('iot/g1/door/status');
    });

    client.on('message', (topic, message) => {
      console.log('received message:', message.toString());
      setDoorStatus(message.toString());
    });
  }, []);

  return (
    <div className="App App-header">
      {/* {console.log(doorStatus)} */}
      <h2>Door Status : {doorStatus || 'Loading...'}</h2>
    </div>
  );
}

export default App;
