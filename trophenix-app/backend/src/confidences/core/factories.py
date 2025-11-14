from __future__ import annotations

from pathlib import Path

from django.conf import settings
from django.core.files.base import ContentFile
from factory.declarations import Sequence, SubFactory
from factory.django import DjangoModelFactory, ImageField
from factory.faker import Faker
from factory.helpers import post_generation

from athletes.factories import AthleteFactory

from .constants import ConfidenceCategory
from .models import Confidence, ConfidenceLike


class ConfidenceFactory(DjangoModelFactory):
    """
    Factory for Confidence objects.

    Provides in-memory dummy files via ContentFile. Override audio_file /
    cover_image if you need real fixtures.
    """

    athlete = SubFactory(AthleteFactory)
    title = Sequence(lambda n: f"Confidence {n}")
    description = Faker("sentence")
    category = Faker("random_element", elements=ConfidenceCategory.values)

    cover_image = ImageField(color="#FF0000")

    @post_generation
    def audio_file(self, create: bool, extracted: bytes | bytearray | str | bool | None = None, **kwargs) -> None:
        """
        Conditionally attach an mp3 test audio file (mimics production S3 key).

        Default (no argument): no file created.

        Usage:
        - audio_file=True  -> attach bundled test MP3 (test_data/simple-audio.mp3 or tiny fallback)
        - audio_file="/path/to/file.mp3" -> attach that file's bytes
        - audio_file=b"..." (bytes/bytearray) -> attach given bytes
        - audio_file=False or None -> explicit no file (same as default)
        """
        if not create:
            return

        # Default / explicit skip
        if extracted in (None, False):
            return

        # Acquire raw bytes
        if extracted is True:
            test_audio_path = Path(settings.BASE_DIR) / "test_data" / "simple-audio.mp3"
            raw_content = test_audio_path.read_bytes() if test_audio_path.exists() else b"ID3"
        elif isinstance(extracted, (bytes, bytearray)):
            raw_content = bytes(extracted)
        elif hasattr(extracted, "read"):
            raw_content = extracted.read()  # type: ignore[assignment]
        elif isinstance(extracted, str):
            path = Path(extracted)
            raw_content = path.read_bytes()
        else:
            raw_content = str(extracted).encode()

        # Ensure pk for naming before saving file
        if not getattr(self, "pk", None):
            self.save()  # type: ignore[misc]
        file_name = f"confidences/audios/con_{self.pk}.mp3"  # type: ignore[attr-defined]
        self.audio_file.save(file_name, ContentFile(raw_content), save=True)  # type: ignore[attr-defined]

    class Meta:
        model = Confidence
        django_get_or_create = ["athlete"]
        skip_postgeneration_save = True


class ConfidenceLikeFactory(DjangoModelFactory):
    confidence = SubFactory(ConfidenceFactory)
    athlete = SubFactory(AthleteFactory)

    class Meta:
        model = ConfidenceLike
