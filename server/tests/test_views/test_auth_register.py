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
        
        self.user_info = {
            
            "email": "test@testing.com",
            "password": "testing123",
            "profile": {
                "public": True,
                "affiliation": "",
                "orcid": ""
            }
        }

    def test_user_register(self):
        """test for user registration
        """
        
        # import pdb; pdb.set_trace() 
        response = self.client.post("/users/auth/register/", data=self.user_info, format='json')
        self.assertEqual(response.status_code, 201)

