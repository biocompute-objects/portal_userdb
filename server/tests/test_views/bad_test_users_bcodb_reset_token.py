
#!/usr/bin/env python3

"""Users_bcodb_reset_token
Tests for 
200: BCODB Token reset is successfull
400: Bad Request. The request is malformed or missing required parameters.
403: Forbidden.The requestor's credentials are valid, but the operation is not allowed.
404: Not Found.The specified BCODB or user account is not found.
"""


import json
from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.test import APIClient

class BCODBResetTokenTestCase(TestCase):
    fixtures = ['tests/fixtures/testing_data']
    def setUp(self):
        self.client = APIClient()

        # Checking if the user 'bco_api_user' already exists
        try:
            self.user = User.objects.get(username='bco_publisher')
        except User.DoesNotExist:
            self.user = User.objects.create_user(username='bco_publisher')

        # Checking if user already has token, if not then creating one
        if not Token.objects.filter(user=self.user).exists():
            self.token = Token.objects.create(user=self.user)
        else:
            self.token = Token.objects.get(user=self.user)
    
    def test_successful_creation(self):
        """200: BCODB Token reset is successfull
        """
        data = {
            'token': "2f2a599026581c158a07f968c56292c77f4be875",
            'public_hostname':"https://test.portal.biochemistry.gwu.edu"
        }
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.post('/users/bcodb/reset_token/', data= data, format='json')
        self.assertEqual(response.status_code, 200)

    
    def test_bad_request(self):
        # 400: Bad Request. The request is malformed or missing required parameters.
        
        data = {
            #'token': "Invalid",
            'public_hostname':"https://test.portal.biochemistry.gwu.edu"
        }
        #self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)
        response = self.client.post('/users/bcodb/reset_token/', data=data, format='json')
        self.assertEqual(response.status_code, 400)

    def test_invalid_token(self):
        # Test case for invalid token (response code 403)
        # Setting authentication token to an invalid value
        
        data = {
            'token': "12345",
            'public_hostname':"https://test.portal.biochemistry.gwu.edu"
        }
        self.client.credentials(HTTP_AUTHORIZATION='Token InvalidToken')
        response = self.client.post('/users/bcodb/reset_token/', data=data, format='json')
        self.assertEqual(response.status_code, 403)


    def test_not_found(self):
        # Test a response indicating not found with status code 404
        # This can happen if the BCODB or user account is not found.

        data = {
            'token': "12345",
            'public_hostname':"nonexsisitent hostname"
        }
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        response = self.client.post('/users/bcodb/reset_token/', data=data, format='json')
        self.assertEqual(response.status_code, 404)