from rest_framework import serializers


class TextSerializer(serializers.Serializer):
    text = serializers.CharField(max_length=200)
    capitalized_text = serializers.SerializerMethodField()

    def get_capitalized_text(self, obj):
        return obj['text'].upper()
