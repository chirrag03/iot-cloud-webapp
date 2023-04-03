from django_sse.views import BaseSseView

class MessageSseView(BaseSseView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.mqtt_client = MqttClient("broker.hivemq.com", "iot/g1/door/status")

    def iterator(self):
        while True:
            yield sse.wait()
