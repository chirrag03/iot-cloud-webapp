# from django_sse.views import BaseSseView
# from backend.api.MqttClient import MqttClient

# class MessageSseView(BaseSseView):
#     def __init__(self, **kwargs):
#         super().__init__(**kwargs)
#         self.mqtt_client = MqttClient("broker.hivemq.com", "iot/g1/door/status")

#     def iterator(self):
#         while True:
#             yield sse.wait()


from django.http import HttpResponse
from django.views import View
import paho.mqtt.client as mqtt
import logging

logger = logging.getLogger(__name__)

class MessageSseView(View):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.response = HttpResponse(content_type='text/event-stream')
        self.response['Cache-Control'] = 'no-cache'
        self.response['X-Accel-Buffering'] = 'no'
        self.response['Content-Encoding'] = 'text/event-stream'
        self.response['Content-Disposition'] = 'attachment'
        self.response['Access-Control-Allow-Origin'] = '*'
        self.response['Access-Control-Allow-Credentials'] = 'true'
        self.response['Access-Control-Expose-Headers'] = 'Content-Length'

        print("idhar")
        self.client = mqtt.Client("hello")
        self.client.connect('broker.hivemq.com', 1883)
        self.client.subscribe('iot/g1/door/status')
        self.client.on_message = self.on_message
        self.client.loop_start()

    def on_message(self, client, userdata, msg):
        message = msg.payload.decode('utf-8')
        # Write the message to the HTTP response stream
        logger.info(message)
        print(message)
        print("yaha")
        self.response.write(f"data: {message}\n\n")
    
    def get(self, request, *args, **kwargs):
        return self.response
