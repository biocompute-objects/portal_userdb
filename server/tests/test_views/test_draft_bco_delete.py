#!/usr/bin/env python3

"""Test Delete Temp BCO 
Test for '200:	BCO draft retrieved.', '400: {bco_id} is not a valid UUID',
'401: You are not authorized to access object {bco_id}', and '404: Object
{bco_id} not found'
"""

import json
from bcodb.models import BCO
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.test import APIClient, APITestCase

class TestDeleteTempBco(APITestCase):
    """Class for testing Temp BCO deletion
    """

    fixtures = ['tests/fixtures/testing_data']

    def setUp(self) -> None:
        self.client = APIClient()
        with open("tests/fixtures/testing_example_bcos.json", "r") as file:
            self.bcos = json.load(file)

    def test_delete_tempbco_success_noauth(self):
        """Test for '200:	Temp BCO draft deleted.' without authentication.
        """
        bco_id = "14cc841a-8d4d-4073-ae52-05a0ccfb3f2e"
        
        response = self.client.post(
            '/users/bcodb/draft_bco/delete', data={"bco_id": bco_id}
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['object_id'], bco_id)
        with self.assertRaises(ObjectDoesNotExist):
            non_existent_object = BCO.objects.get(id=bco_id)
    
    def test_delete_tempbco_success_auth(self):
        """Test for '200:	Temp BCO draft deleted.' with authentication.
        """

        response1 = self.client.post(
            "/users/auth/login/", 
            data={"password": "testing123","username": "bco_api_user"}
        )

        token = response1.json()['token']

        bco_id = "0dc206f8-7d14-41bc-93f6-15f0eaf8feb0"
        
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + token)
        response = self.client.post(
            '/users/bcodb/draft_bco/delete', data={"bco_id": bco_id}
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['object_id'], bco_id)
        with self.assertRaises(ObjectDoesNotExist):
            BCO.objects.get(id=bco_id)

    def test_delete_tempbco_bad_request(self):
        """Test for '400:	{bco_id} is not a valid UUID.
        """

        bco_id = "14cc841a-8d4d--05a0ccfb3f2e"
        
        response = self.client.post(
            '/users/bcodb/draft_bco/delete', data={"bco_id": bco_id}
        )

        self.assertEqual(response.status_code, 400)

    def test_delete_tempbco_unathorized(self):
        """Test for '401:	You are not authorized to access object {bco_id}'.
        """

        bco_id = "0dc206f8-7d14-41bc-93f6-15f0eaf8feb0"
        
        response = self.client.post(
            '/users/bcodb/draft_bco/delete', data={"bco_id": bco_id}
        )

        self.assertEqual(response.status_code, 401)

    def test_delete_tempbco_success_auth(self):
        """Test for '403:	Forbidden. Error decoding JSON Web Token (JWT)'
        """

        bco_id = "0dc206f8-7d14-41bc-93f6-15f0eaf8feb0"
        
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + 'token')
        response = self.client.post(
            '/users/bcodb/draft_bco/delete', data={"bco_id": bco_id}
        )

        self.assertEqual(response.status_code, 403)

    def test_delete_tempbco_unathorized(self):
        """Test for '404:	Object {bco_id} not found.'
        """

        bco_id = "0dc206f8-7d14-41bc-93f6-15f0eaf8feb3"
        
        response = self.client.post(
            '/users/bcodb/draft_bco/delete', data={"bco_id": bco_id}
        )

        self.assertEqual(response.status_code, 404)