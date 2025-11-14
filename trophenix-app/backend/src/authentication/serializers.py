from rest_framework import serializers

from trophenix.serializers import DateTimeModelSerializerMixin

from .models import User


class UserRegisterSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, max_length=100)
    password = serializers.CharField(required=True)

    def create(self, validated_data: dict) -> User:
        return User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
        )


class UserReadOnlySerializer(DateTimeModelSerializerMixin):
    athlete = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "is_superuser",
            "athlete",
        ]
        read_only_fields = [
            "id",
            "email",
            "is_superuser",
            "athlete",
        ]

    def get_athlete(self, obj: User) -> int | None:
        return obj.athlete.pk if obj.athlete else None
