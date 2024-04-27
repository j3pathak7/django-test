from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import TextSerializer


class CapitalizeTextView(APIView):
    def post(self, request):
        serializer = TextSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
