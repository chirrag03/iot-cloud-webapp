import { useState, useEffect, useRef } from 'react';
import './App.css';
import { Client } from 'paho-mqtt';

function App() {
  const [doorStatus, setDoorStatus] = useState([]);
  const [messages, setMessages] = useState([]);
  const [Rstatus, setRStatus] = useState([]);
  const doorStatusRef = useRef(null);
  const messagesRef = useRef(null);

  useEffect(() => {
    const client = new Client('broker.hivemq.com', 8000, 'clientId-12345');

    client.onConnectionLost = (response) => {
      console.log('connection lost', response);
    };

    client.connect({
      onSuccess: () => {
        console.log('connected to mqtt broker');
        client.subscribe('iot/g1/door/status');
        client.subscribe('iot/g1/imu/data');
        client.subscribe('RaspberryPi/Status')
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
      if(message.destinationName === 'RaspberryPi/Status') {
        setRStatus(message.payloadString)
      }
      else {
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

  useEffect(() => {
    if (doorStatusRef.current) {
      doorStatusRef.current.scrollTop = doorStatusRef.current.scrollHeight;
    }
  }, [doorStatus]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="App App-header">
      <h1>IOT Assignment 4</h1>
      <h1>Raspberry Pi Status: {Rstatus}</h1>
      <div className="row">
        <div className="col-md-6">
          <h2><div>Decisions: </div></h2>
          <h5><div className="overflow-auto" style={{ width: "600px", maxHeight: "50vh", overflowY: "scroll" }} ref={doorStatusRef}>
            {doorStatus.map(({ status, timestamp }, index) => (
              <p key={index}>({timestamp}) Door Status: {status || "Loading..."}</p>
            ))}
            </div>
            </h5>
        </div>
      
      <div className="col-md-6">
        <h2><div>Sensor Values: </div></h2>
        <h5><div className="overflow-auto" style={{ width: "600px", maxHeight: "50vh", overflowY: "scroll" }} ref={messagesRef}>
          {messages.map((msg, index) => (
            <p key={index}>
              {msg.message} ({msg.timestamp})
            </p>
          ))}
        </div>
        </h5> 
      </div>
    </div>
    </div >
  );
}

export default App;
