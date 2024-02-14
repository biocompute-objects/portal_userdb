#!/usr/bin/env python3

"""Test Add Temp BCO 
Test for '200: BCO temp draft creation is successful.' and
'400: Bad Request.'
"""

import json
from rest_framework.test import APIClient, APITestCase
from bcodb.models import BCO

class TestAddTempBco(APITestCase):
    """Class for testing Temp BCO creation
    """
    fixtures = ['tests/fixtures/testing_data']

    def setUp(self) -> None:
        self.client = APIClient()
        with open("tests/fixtures/testing_example_bcos.json", "r") as file:
            self.bcos = json.load(file)
        
    # def test_temp_bco_success(self):
    #     """test for temp bco '200: BCO temp draft creation is successful.'
    #     """

    #     response1 = self.client.post(
    #         "/users/auth/login/", 
    #         data={"password": "testing123","username": "bco_api_user"}
    #     )

    #     token = response1.json()['token']

    #     self.client.credentials(
    #         HTTP_AUTHORIZATION='Bearer ' + token,
    #         HTTP_ORIGIN='http://testing.org'
    #     )

    #     response2 = self.client.post(
    #         "/users/bcodb/draft_bco/add",
    #         data={"contents":self.bcos[1]}, format='json'
    #     )
    #     identifier = response2.json()['object_id'].split('?')[-1]
        
    #     temp_bco = BCO.objects.get(id=identifier)
        
    #     self.assertEqual(type(temp_bco), BCO)
    #     self.assertEqual(response2.status_code, 200)

    def test_temp_bco_bad_request(self):
        """test for temp bco '400: Bad request.'
        'Origin' is not supplied so it will return an error.
        """

        response = self.client.post(
            "/users/bcodb/draft_bco/add",
            data={"contents":self.bcos[1]}, format='json'
        )

        self.assertEqual(response.status_code, 400)
