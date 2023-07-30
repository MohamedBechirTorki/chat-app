from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .models import Conversation, Message, UserProfile
from .serializers import MessageSerializer, ConversationSerializer, UserSerializer, CustomUserSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.authentication import JWTAuthentication


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        return token
class MyTokenObtainPairView(TokenObtainPairView) :
    serializer_class = MyTokenObtainPairSerializer
    

@api_view(["GET"])
def getRoutes(request) :
    routes = [
        "/api/token",
        "/api/token/refesh"
    ]
    return Response(routes)

@api_view(["POST"])
def createAccount(request) :
    username = request.data["username"]
    password = request.data["password"]
    user = User.objects.create_user(username=username, password=password)    
   
    serializer = CustomUserSerializer(user, many=False)
    return Response(serializer.data)

@api_view(["GET"]) 
@permission_classes([IsAuthenticated])
def getConversations(request) :
    user = UserProfile.objects.get(user__username=request.user.username)
    conversations = Conversation.objects.filter(participants=user).order_by("-updated")
    serializer = ConversationSerializer(conversations, many=True)
    return Response(serializer.data)

@api_view(["POST"]) 
@permission_classes([IsAuthenticated])
def searchFriends(request) :
    search_query = request.data["search_query"]
    if search_query == "" :
        return Response([])
    users = UserProfile.objects.filter(user__username__icontains = search_query).exclude(user__username=request.user.username).distinct()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(["POST"]) 
@permission_classes([IsAuthenticated])
def startConversation(request) :
    try :
        user1 = UserProfile.objects.get(user__username = request.user.username)
        user2 = UserProfile.objects.get(user__username = request.data["username"])
        conversation = Conversation.objects.create()
        conversation.participants.add(user1, user2)
        serializer = ConversationSerializer(conversation, many=False)
        return Response(serializer.data)
    except :
        return Response("Error in startConversation function")


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def deleteConversation(request, pk) :
    conversation = Conversation.objects.get(id=pk)
    conversation.delete()
    return Response("conversation was deleted")

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getMessages(request, pk) :
    messages = Message.objects.filter(conversation__id=pk).order_by("created")
    serializer = MessageSerializer(messages, many=True)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def sendMessage(request, pk) :
    sender = UserProfile.objects.get(user=request.user)
    content = request.data["content"]
    conversation = Conversation.objects.get(id=pk)
    Message.objects.create(sender=sender, content=content, conversation=conversation)
    return Response("Message saved successfuly")

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def setInactive(request):
    try:
        user = UserProfile.objects.get(user__username=request.user)
        user.active = True
        user.save()
        return Response({"message": "User set to inactive."})
    except User.DoesNotExist:
        return Response({"message": "User not found."}, status=404)

from rest_framework_simplejwt.tokens import RefreshToken
@api_view(["POST"])
def isActive(request):
    username = request.data["username"]

    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({"message": "User not found."}, status=404)

    refresh_token = RefreshToken.for_user(user)

    try:
        user = refresh_token.user
    except Exception as e:
        user = None

    if user is not None:
        return Response({"active": "True"})
    else:
        return Response({"active": "False"})
