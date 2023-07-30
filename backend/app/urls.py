from django.urls import path
from . import views

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('create-account/', views.createAccount, name="create-account"),
    path('conversations/', views.getConversations, name="conversations"),
    path('search/', views.searchFriends, name="search"),
    path('start-conversation/', views.startConversation, name="start-conversation"),
    path('delete-conversation/<str:pk>/', views.deleteConversation, name="delete-conversation"),
    path('get-messages/<str:pk>/', views.getMessages, name="get-messages"),
    path('send-message/<str:pk>/', views.sendMessage, name="send-message"),
    path('is-active/', views.isActive, name="is-active")
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)