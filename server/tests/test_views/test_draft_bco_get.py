#!/usr/bin/env python3

"""Test Get Temp BCO
Test for '200:	BCO draft retrieved.', '401: You are not authorized to access
object {bco_id}', '404: Object {bco_id} not found', and '409: Conflict.'
"""

import json
from rest_framework.test import APIClient, APITestCase
from bcodb.models import BCO

class TestGetTempBCO(APITestCase):
    """Class for testing Temp BCO retrevial.
    """
    fixtures = ['tests/fixtures/testing_data']

    def setUp(self) -> None:
        self.client = APIClient()
        with open("tests/fixtures/testing_example_bcos.json", "r") as file:
            self.bcos = json.load(file)
    
    def test_get_tempbco_success_noauth(self):
        """Test for '200:	BCO draft retrieved.' without authentication.
        """
        response = self.client.post(
            '/users/bcodb/draft_bco/get',
            data={"bco_id": "14cc841a-8d4d-4073-ae52-05a0ccfb3f2e"}
        )
        self.assertEqual(response.status_code, 200)

    def test_get_tempbco_success_auth(self):
        """Test for '200:	BCO draft retrieved.' with authentication.
        """

        response1 = self.client.post(
            "/users/auth/login/", 
            data={"password": "testing123","username": "bco_api_user"}
        )

        token = response1.json()['token']
        
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)
        
        response2 = self.client.post(
            '/users/bcodb/draft_bco/get',
            data={"bco_id": "0dc206f8-7d14-41bc-93f6-15f0eaf8feb0"}
        )
        self.assertEqual(response2.status_code, 200)
        
    def test_get_tempbco_bad_request(self):
        """Test for '400: {bco_id} is not a valid UUID.
        """
        response = self.client.post(
            '/users/bcodb/draft_bco/get',
            data={"bco_id": "1234"}
        )

        self.assertEqual(response.status_code, 400)

    def test_get_tempbco_unathorized(self):
        """Test for '401: You are not authorized to access object {bco_id}.'
        without authentication.
        """
        
        response = self.client.post(
            '/users/bcodb/draft_bco/get',
            data={"bco_id": "0dc206f8-7d14-41bc-93f6-15f0eaf8feb0"}
        )

        self.assertEqual(response.status_code, 401)

    def test_get_tempbco_notfound(self):
        """Test for '404: Object {bco_id} not found.'
        """

        response = self.client.post(
            '/users/bcodb/draft_bco/get',
            data={"bco_id": "0dc206f8-7d14-41bc-9346-15f0eaf8feb0"}
        )

        self.assertEqual(response.status_code, 404)