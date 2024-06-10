from dotenv import load_dotenv
import os
from pathlib import Path
from datetime import timedelta
from django.core.management.utils import get_random_secret_key

load_dotenv()
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Load secrets from environment variables
SECRET_KEY = os.environ.get('SECRET_KEY', get_random_secret_key())

# Google OAuth2 Keys
DJANGO_GOOGLE_OAUTH2_CLIENT_ID = os.environ.get('DJANGO_GOOGLE_OAUTH2_CLIENT_ID')
DJANGO_GOOGLE_OAUTH2_CLIENT_SECRET = os.environ.get('DJANGO_GOOGLE_OAUTH2_CLIENT_SECRET')

# ORCID OAuth2 Keys
DJANGO_ORCID_OAUTH2_CLIENT_URL = os.environ.get('DJANGO_ORCID_OAUTH2_CLIENT_URL')
DJANGO_ORCID_OAUTH2_CLIENT_ID = os.environ.get('DJANGO_ORCID_OAUTH2_CLIENT_ID')
DJANGO_ORCID_OAUTH2_CLIENT_SECRET = os.environ.get('DJANGO_ORCID_OAUTH2_CLIENT_SECRET')
DJANGO_ORCID_OAUTH2_URL = os.environ.get('DJANGO_ORCID_OAUTH2_URL')

# Server Settings
SERVER_VERSION = os.environ.get('SERVER_VERSION')
SERVER_URL = os.environ.get('SERVER_URL')
DATABASE_NAME = os.environ.get('DATABASE_NAME')

# Email Backend
EMAIL_BACKEND = os.environ.get('EMAIL_BACKEND', 'django.core.mail.backends.console.EmailBackend')

# Quick-start development settings - unsuitable for production
DEBUG = os.environ.get('DEBUG', 'False') == 'True'
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '*').split(',')

# Application definition
INSTALLED_APPS = [
    "corsheaders",
    "rest_framework",
    "rest_framework_jwt",
    "rest_framework_jwt.blacklist",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django_rest_passwordreset",
    "drf_yasg",
    "bcodb.apps.BcodbConfig",
    "users.apps.UsersConfig",
    "prefix.apps.PrefixConfig"
]

DJANGO_REST_MULTITOKENAUTH_REQUIRE_USABLE_PASSWORD = False

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": (
        "rest_framework.permissions.IsAuthenticated",
    ),
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_jwt.authentication.JSONWebTokenAuthentication",
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.BasicAuthentication",
    ),
}

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

# Database
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": DATABASE_NAME,
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Internationalization
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# Static files
STATIC_URL = "/api/static/"
STATIC_ROOT = "/var/www/bcoeditor/bco_api/bco_api/static/"

# Default primary key field type
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

CORS_ORIGIN_ALL_ALL = True
ORIGIN = "http://localhost:8080"

CORS_ORIGIN_WHITELIST = (
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "https://test.portal.biochemistry.gwu.edu",
    "https://biocomputeobject.org",
    "https://www.biocomputeobject.org",
    "https://accounts.google.com",
)

CSRF_TRUSTED_ORIGINS = ['https://*.biochemistry.gwu.edu', 'https://*.127.0.0.1']

JWT_AUTH = {
    "JWT_RESPONSE_PAYLOAD_HANDLER": "authentication.services.custom_jwt_handler",
    "JWT_EXPIRATION_DELTA": timedelta(seconds=604800),
    "JWT_REFRESH_EXPIRATION_DELTA": timedelta(days=14),
    "JWT_ALLOW_REFRESH": True,
    "JWT_PAYLOAD_HANDLER": 'authentication.services.custom_jwt_create_payload',
}

SWAGGER_SETTINGS = {
    "SECURITY_DEFINITIONS": {
        "Bearer": {"type": "apiKey", "name": "Authorization", "in": "header"}
    },
    "DEEP_LINKING": True,
}
