#!/usr/bin/env python3

"""Test ORCID Authorization [WIP]

Test for '200: Request is successful.', '401: A user with that ORCID does not
 exist.', and '403: Authentication credentials were not provided, or were not valid.'
"""

from rest_framework.test import APIClient, APITestCase
from users.models import User

class TestOrcidAuthorizationApi(APITestCase):
    """Class for testing ORCID Authentication
    """

    fixtures = ['tests/fixtures/testing_data']
    def setUp(self):
        self.client = APIClient()
    
    def test_orcid_auth_success(self):
        """Test for ORCID auth '200: Request is successful.'
        """
    
        self.client.credentials(
            HTTP_AUTHORIZATION='Bearer TEST',
            HTTP_ORIGIN='http://testing.org'
        )
        response = self.client.post("/users/orcid/user_info/")
        
        self.assertEqual(response.status_code, 200)

    def test_orcid_auth_does_not_exist(self):
        """Test for ORCID auth '401: A user with that ORCID does not exist.'
        """
    
        self.client.credentials(
            HTTP_AUTHORIZATION='Bearer TEST1',
            HTTP_ORIGIN='http://testing.org'
        )
        response = self.client.post("/users/orcid/user_info/")
        
        self.assertEqual(response.status_code, 401)

    def test_orcid_auth_bad_request(self):
        """Test for ORCID auth '403: Authentication credentials were not
        provided, or were not valid.'
        """
    
        self.client.credentials(
            HTTP_AUTHORIZATION='Bearer TEST2',
            HTTP_ORIGIN='http://testing.org'
        )
        response = self.client.post("/users/orcid/user_info/")
        
        self.assertEqual(response.status_code, 403)