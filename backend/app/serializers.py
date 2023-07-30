from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Conversation, Message, UserProfile
from django.contrib.auth.models import User
from django.conf import settings





class CustomUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username'] 

class UserSerializer(ModelSerializer) :
    user = CustomUserSerializer(read_only=True)
    class Meta :
        model = UserProfile
        fields = ["user", "image"]

class MessageSerializer(ModelSerializer):
    sender = UserSerializer(read_only=True)
    class Meta:
        model = Message
        fields = ["id", "sender", "content"]

class ConversationSerializer(ModelSerializer):
    participants = SerializerMethodField()

    class Meta:
        model = Conversation
        fields = "__all__"

    def get_participants(self, obj):
        participants = obj.participants.all()
        return UserSerializer(participants, many=True).data