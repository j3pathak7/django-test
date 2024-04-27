from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import TextSerializer, RemoveBackgroundSerializer
import numpy as np
from PIL import Image
from rembg import remove
import base64
from io import BytesIO


class CapitalizeTextView(APIView):
    def post(self, request):
        serializer = TextSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


class RemoveBackgroundView(APIView):
    def post(self, request):
        serializer = RemoveBackgroundSerializer(data=request.data)
        if serializer.is_valid():
            image_file = serializer.validated_data['image']

            # Convert the InMemoryUploadedFile to a PIL Image
            image = Image.open(image_file)

            # Convert the PIL Image to a NumPy array
            image_np = np.array(image)

            # Pass the NumPy array to the rembg library
            output = remove(image_np)

            # Convert the output NumPy array back to a PIL Image
            output_image = Image.fromarray(output)

            # Save the output image to a BytesIO object
            output_buffer = BytesIO()
            output_image.save(output_buffer, format='PNG')
            output_buffer.seek(0)

            # Encode the image data as a base64 string
            encoded_image = base64.b64encode(
                output_buffer.getvalue()).decode('utf-8')

            # Return the processed image data
            return Response({'removed_background_image': encoded_image})
        return Response(serializer.errors, status=400)
