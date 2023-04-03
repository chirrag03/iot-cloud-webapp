import paho.mqtt.client as mqtt
from django_sse import sse

class MqttClient:
    def __init__(self, broker_url, topic):
        self.client = mqtt.Client()
        self.client.on_connect = self.on_connect
        self.client.on_message = self.on_message
        self.client.connect(broker_url, 1883, 60)
        self.client.subscribe(topic)

    def on_connect(self, client, userdata, flags, rc):
        print("Connected to MQTT broker with result code "+str(rc))

    def on_message(self, client, userdata, msg):
        message = msg.payload.decode('utf-8')
        sse.send_event("message", message)
