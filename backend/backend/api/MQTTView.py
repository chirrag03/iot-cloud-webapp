import json

from django.http import HttpResponse
from django.http import JsonResponse
import logging
import paho.mqtt.client as mqtt
import threading
from django_sse.redisqueue import send_event
import json

logger = logging.getLogger(__name__)

def on_connect(client, userdata, flags, rc):
    logger.info("Connection established with Broker")

def on_disconnect(self, client, userdata):
    logger.info("Disconnected from Broker")

def on_message(client, userdata, message):
    data = message.payload.decode()
    send_event('my-sse-stream', 'update', data)
    
def connect_to_mqtt():
    client = mqtt.Client("backend_app")
    
    client.on_message = on_message
    client.on_connect = on_connect
    client.on_disconnect = on_disconnect

    client.connect("broker.hivemq.com", 1883)
    client.subscribe('iot/g1/door/status')
    client.loop_forever()


def start_mqtt_view(request):
    logger.info('Listening to MQTT')

    threading.Thread(target=connect_to_mqtt).start()

    return JsonResponse({'status': 'listening to mqtt'})
