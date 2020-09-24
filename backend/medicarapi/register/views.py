from django.contrib.auth.models import User
from rest_framework.generics import CreateAPIView
from .serializers import UserSerializer
# Create your views here.

class UserCreateView(CreateAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)