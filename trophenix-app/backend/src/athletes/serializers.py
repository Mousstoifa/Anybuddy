from trophenix.serializers import DateTimeModelSerializerMixin

from .models import Athlete


class AthleteSerializer(DateTimeModelSerializerMixin):
    class Meta:
        model = Athlete
        fields = [
            "id",
            "user",
            "firstname",
            "lastname",
            "city",
        ]
        read_only_fields = [
            "id",
            "user",
        ]
