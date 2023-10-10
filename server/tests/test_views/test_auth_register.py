#!/usr/bin/env python3

"""Test Account Registration 
Test for '201: Account has been authorized.', '404: Credentials not found.',
and '403: Requestor's credentials were rejected.'
"""

from django.test import TestCase, Client
from users.models import User

class TestUserCreateApi(TestCase):
    """Class for testing User creation
    """
    fixtures = ['tests/fixtures/test_data']

    def setUp(self):
        self.client = Client()
        
        self.dup_user_info = {
            "username": "TestUser",
            "email": "test@testing.com",
            "password": "testing123",
            "profile": {
                "public": True,
                "affiliation": "",
                "orcid": ""
            }
        }

        self.user_info = {
            "username": "NewTestUser",
            "email": "new_test@testing.com",
            "password": "testing123",
            "profile": {
                "public": True,
                "affiliation": "",
                "orcid": ""
            }
        }

    def test_user_register(self):
        """test for user registration '201: Registration is successful.'
        """
        
        response = self.client.post("/users/auth/register/", data=self.user_info, format='json')
        # import pdb; pdb.set_trace() 
        self.assertEqual(response.status_code, 201)

    def test_user_register_conflict(self):
        """test for user registration '409: Conflict'
        """
        
        response = self.client.post("/users/auth/register/", data=self.dup_user_info, format='json')
        self.assertEqual(response.status_code, 409)

    def test_user_register_bad_request(self):
        """test for user registration '400: Bad request'
        """
        
        del self.user_info['username']
        response = self.client.post("/users/auth/register/", data=self.user_info, format='json')
        self.assertEqual(response.status_code, 400)