import os
from datetime import timedelta
from pathlib import Path

from dotenv import load_dotenv
load_dotenv(".env")

from .logger import ColoredFormatter

BASE_DIR = Path(__file__).resolve().parent.parent

# Security
#SECRET_KEY = os.environ["DJANGO_SECRET_KEY"]
SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "test-secret-key")
DEBUG = os.environ.get("DJANGO_DEBUG", "1") != "0"

ENVIRONMENT = os.environ.get("ENVIRONMENT", "development").lower()
ALLOWED_HOSTS = ["*"]
CSRF_TRUSTED_ORIGINS = ["https://aqna55dqmf.eu-west-3.awsapprunner.com"]
CORS_ORIGIN_ALLOW_ALL = True


# Application definition
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django_extensions",
    "corsheaders",
    "rest_framework",
    "rest_framework.authtoken",
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",
    "authentication.apps.AuthenticationConfig",
    "athletes.apps.AthletesConfig",
    "confidences.core",
    "confidences.comments",
    "companies.apps.CompaniesConfig",
    "drf_spectacular",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]


# DRF
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": ("rest_framework_simplejwt.authentication.JWTAuthentication",),
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
    "DEFAULT_PAGINATION_CLASS": "_conf.pagination.DefaultPagination",
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}


# JWT
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=7),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=14),
    "ROTATE_REFRESH_TOKENS": False,
    "BLACKLIST_AFTER_ROTATION": False,
    "ALGORITHM": "HS256",
    "SIGNING_KEY": SECRET_KEY,
    "VERIFYING_KEY": None,
    "AUTH_HEADER_TYPES": ("Bearer",),
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "TOKEN_TYPE_CLAIM": "token_type",
}


# Database
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3" if ENVIRONMENT == "test" else "django.db.backends.postgresql",
        "NAME": os.environ.get("POSTGRES_DB", BASE_DIR / "db.sqlite3"),
        "USER": os.environ.get("POSTGRES_USER", "test"),
        "PASSWORD": os.environ.get("POSTGRES_PASSWORD", "test"),
        "HOST": os.environ.get("POSTGRES_HOST", "localhost"),
        "PORT": os.environ.get("POSTGRES_PORT", "5432"),
    },
}
if isinstance(DATABASES["default"]["NAME"], Path):
    DATABASES["default"]["NAME"] = str(DATABASES["default"]["NAME"])


# Authentification
AUTH_USER_MODEL = "authentication.User"
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]


# Internationalization
LANGUAGE_CODE = "fr-FR"
TIME_ZONE = "Europe/Paris"
USE_I18N = True
USE_TZ = True


# Static and Media files
STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "static"
MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "media"


LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "colored": {
            "()": ColoredFormatter,
        },
        "colored_time": {
            "()": ColoredFormatter,
            "format": "{levelname} - {asctime} - {module} - {message}",
            "style": "{",
            "datefmt": "%Y-%m-%d %H:%M:%S",
        },
    },
    "root": {
        "handlers": ["console"],
        "level": ("INFO"),
    },
    "handlers": {
        "console": {
            "level": ("INFO"),
            "class": "logging.StreamHandler",
            "formatter": "colored_time",
        },
    },
}

SPECTACULAR_SETTINGS = {
    "TITLE": "Trophenix API",
    "DESCRIPTION": "API routes for Trophenix",
    "VERSION": "1.0.0",
    "SCHEMA_PATH_PREFIX": r"/api/v1",
    "SECURITY": [
        {"bearerAuth": []},
    ],
    "SECURITY_SCHEMES": {
        "bearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT",
            "description": "Provide JWT as: Bearer <token>",
        }
    },
    "SWAGGER_UI_SETTINGS": {
        "deepLinking": True,
        "persistAuthorization": True,
        "displayOperationId": True,
    },
}

# django-extensions: auto-import custom helpers in shell_plus
SHELL_PLUS_IMPORTS = [
    ("authentication.factories", "*"),
    ("athletes.factories", "*"),
    ("confidences.core.factories", "*"),
    ("confidences.core.models", "*"),
    ("confidences.comments.models", "*"),
    ("confidences.comments.factories", "*"),
]


# Deployment
WSGI_APPLICATION = "_conf.wsgi.application"

# Other
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
ROOT_URLCONF = "_conf.urls"
TEMPLATES = [  # for admin site
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# S3 Storage for production
AWS_S3_REGION_NAME = "eu-west-3"
AWS_S3_ADDRESSING_STYLE = "virtual"
AWS_STORAGE_BUCKET_NAME = os.environ.get("AWS_S3_BUCKET_NAME", "test-bucket")
AWS_STORAGE_STATIC_BUCKET_NAME = os.environ.get("AWS_S3_STATIC_BUCKET_NAME", "test-static-bucket")


# Storage Configuration
if ENVIRONMENT == "development":
    # Local storage for development
    STORAGES = {
        "default": {
            "BACKEND": "django.core.files.storage.FileSystemStorage",
        },
        "staticfiles": {
            "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage",
        },
    }
else:
    STORAGES = {
        "default": {
            "BACKEND": "storages.backends.s3.S3Storage",
            "OPTIONS": {
                "bucket_name": AWS_STORAGE_BUCKET_NAME,
            },
        },
        "staticfiles": {
            "BACKEND": "storages.backends.s3.S3Storage",
            "OPTIONS": {
                "bucket_name": AWS_STORAGE_STATIC_BUCKET_NAME,
            },
        },
    }
