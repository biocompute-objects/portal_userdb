import json
from django.test import TestCase, Client, RequestFactory
from rest_framework.test import APIRequestFactory, force_authenticate
from users.apis import UserCreateApi
from rest_framework_jwt.views import ObtainJSONWebTokenView
from users.models import User

class TestUserCreateApi(TestCase):
    """Class for testing User creation
    """
    
    def setUp(self):
        """Client allows us to call the endpoints as if the server was running.
        Since the server isn't running, this lets us use this for testing.
        """
        self.client = Client()
        self.factory = APIRequestFactory()
        self.user_info = {
            "username": "TestUser",
            "email": "test@testing.com",
            "password": "testing123",
            "profile": {
                "public": True,
                "affiliation": "",
                "orcid": ""
            }
        }

    def tearDown(self):
        # Clean up run after every test method.
        pass

    def test_user_register(self):
        """test for user registration
        """
        
        request = self.factory.post(
            path="/users/auth/register/",
            data=self.user_info,
            format="json",
        )
        response = UserCreateApi.as_view()(request)
        self.assertEqual(response.status_code, 201)

    def test_user_login(self):
        """test for user login via password
        """
        user_info = {"username":"bco_api_user","password":"testing123"}

        request = self.factory.post(
            path="/users/auth/login/",
            data=user_info,
            format="json",
        )
        response = ObtainJSONWebTokenView.as_view()(request)
        import pdb; pdb.set_trace()
        self.assertEqual(response.status_code, 201)
