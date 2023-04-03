import { useState, useEffect } from 'react';
import './App.css';
import { Client } from 'paho-mqtt';

function App() {
  const [doorStatus, setDoorStatus] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const client = new Client('broker.hivemq.com', 8000, 'clientId-12345');

    client.onConnectionLost = (response) => {
      console.log('connection lost', response);
    };

    client.connect({
      onSuccess: () => {
        console.log('connected to mqtt broker');
        client.subscribe('iot/g1/door/status');
        client.subscribe('iot/g1/imu/data')
      },
      onFailure: (response) => {
        console.log('connection failed', response.errorMessage);
      },
    });

    client.onMessageArrived = (message) => {
      console.log('received message:', message.payloadString);
      const newStatus = {
        status: message.payloadString,
        timestamp: new Date().toLocaleString()
      };
      if (message.destinationName === 'iot/g1/door/status') {
        setDoorStatus((prevState) => [...prevState, newStatus]);
      }
      else{
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: message.payloadString,
            timestamp: new Date().toLocaleString(),
          },
        ]);
      }
    };

    return () => {
      client.disconnect();
    };
  }, []);

  return (
    <div className="App App-header">
      <div className='row'>
      <div className="col-md-6">
        {doorStatus.map(({ status, timestamp }, index) => (
          <h2 key={index}>({timestamp}) Door Status: {status || 'Loading...'}</h2>
        ))}
      </div>
      <div className="col-md-6">
        {messages.map((msg, index) => (
          <p key={index}>
            Sensor Values: {msg.message} ({msg.timestamp})
          </p>
        ))}
      </div>
      </div>
    </div>
  );
}

export default App;
