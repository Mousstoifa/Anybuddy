from rest_framework import serializers


class DateTimeModelSerializerMixin(serializers.ModelSerializer):
    date_time_fields = ["created_at", "updated_at", "deleted_at"]

    def __init__(self, *args, **kwargs) -> None:
        self.Meta.fields.extend(self.date_time_fields)
        self.Meta.read_only_fields.extend(self.date_time_fields)
        super().__init__(*args, **kwargs)

    class Meta:
        fields = []
        read_only_fields = []
