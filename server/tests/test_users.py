#!/usr/bin/env python3
"""Users Tests
"""

from django.test import TestCase
from django.contrib.auth.models import User
from users.models import Profile
from users.apis import UserSerializerWithToken
from users.selectors import profile_from_username
from django.http import HttpResponse
from rest_framework.test import APIRequestFactory, force_authenticate

class UserTests(TestCase):
    """Tests for User opporations
    """

    def setUpTestData():
        """"setUpTestData:
        Run once to set up non-modified data for all class methods.
        """
        
        user_request = {
            "username": "bco_api_user",
            "email": "objects.biocompute@gmail.com",
            "password": "testing123",
            "profile": {
                "username": "bco_api_user",
                "public": True,
                "affiliation": "biocompute",
                "orcid": "https://orcid.org/xxxx-xxxx-xxxx-xxxx",
            },
            "is_superuser": True
        }
        profile = user_request["profile"]
        del user_request["profile"]
        serializer = UserSerializerWithToken(data=user_request)
        if serializer.is_valid():
            serializer.save()
            print("serializer", serializer.data['token'])
            TOKEN = serializer.data['token']
            user_object = User.objects.get(username=user_request["username"])
            Profile.objects.create(
                username=user_object,
                public=profile["public"],
                affiliation=profile["affiliation"],
                orcid=profile["orcid"],
            )

            return User.objects.get(username=user_request["username"])
        return None

    def setUp(self) -> None:
        """setUp
        Run once for every test method to setup clean data.
        """
        self.factory = APIRequestFactory()
        self.user = User.objects.get(username="bco_api_user")
        return super().setUp()

    def create_user(self):
        """Creat Test User"""

        user_request = {
            "username": "tester",
            "email": "test@testing.com",
            "password": "testing123",
            "profile": {
                "username": "tester",
                "public": True,
                "affiliation": "Testing",
                "orcid": "https://orcid.org/xxxx-xxxx-xxxx-xxxx",
            },
        }

        profile = user_request["profile"]
        del user_request["profile"]
        serializer = UserSerializerWithToken(data=user_request)
        if serializer.is_valid():
            serializer.save()
            user_object = User.objects.get(username=user_request["username"])
            Profile.objects.create(
                username=user_object,
                public=profile["public"],
                affiliation=profile["affiliation"],
                orcid=profile["orcid"],
            )

            return User.objects.get(username=user_request["username"])
        return None

    def test_user(self):
        """Test user creation"""

        user = self.create_user()
        self.assertTrue(isinstance(user, User))
        self.assertEqual(user.email, "test@testing.com")

    def test_profile(self):
        """Tests user profile"""
        user = self.create_user()
        profile = profile_from_username(user.username)
        self.assertTrue(isinstance(profile, Profile))
        
    def test_register_api(self):
        """Test user register api
        """
        USER_INFO = {
            "username": "tester2",
            "email": "test2@testing.com",
            "password": "2testing123",
            "profile": {
                "username": "tester2",
                "public": True,
                "affiliation": "Testing2",
                "orcid": "https://orcid.org/x2xx-xxxx-xxxx-xxxx",
            },
        }

        response = self.client.post("/users/auth/register/", data=USER_INFO)
        self.assertEqual(User.objects.count(), 2)

    def test_bcodb(self):
        """Test for bcodb account creation"""
        # TODO
        self.assertTrue(1, 1)

    def test_user_update(self):
        """Test for user update"""
        factory = APIRequestFactory()
        USER_INFO = {"username": "bco_api_user",
            "email": "objects.biocompute@gmail.com",
            "password": "testing123",
            "profile": {
                "username": "bco_api_user",
                "public": True,
                "affiliation": "biocompute",
                "orcid": "https://orcid.org/xxxx-xxxx-xxxx-xxxx",
            }
        }
        user = UserSerializerWithToken(data=USER_INFO)
        request = factory.post("/users/update_user/")
        force_authenticate(request, user=user)
        response = self.client.post("/users/update_user/", data=USER_INFO)
        print('\n', "TESTING", '\n', response)

        return 0