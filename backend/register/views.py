# from django.contrib.auth.models import User
from register.models import User
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from .serializers import UserSerializer
from oauth2_provider.contrib.rest_framework.authentication import OAuth2Authentication
from .permissions import AnonPermissionOnly
# Create your views here.


class UserCreateView(CreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [AnonPermissionOnly]

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class UserGetAPIView(RetrieveAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    authentication_classes = [OAuth2Authentication]

    def get_object(self):
        return UserSerializer(self.request.user.__dict__, many=False).data