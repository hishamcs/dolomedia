import json

from channels.generic.websocket import WebsocketConsumer


class ChatConsumer(WebsocketConsumer):

    def connect(self):
        print('selffffff : ', self.scope['url_route']['kwargs']['room_name'])
        self.accept()
        pass

    def receive(self,text_data):
        pass

    def disconnect(self, close_code):
        pass