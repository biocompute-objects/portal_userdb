#!/usr/bin/env python3

"""Test Add Orcid API [WIP]

Test for '200: Add ORCID successful.', '401: Unathorized.', and '403: Bad request.'
"""

from rest_framework.test import APIClient, APITestCase
from users.models import User


class TestAddOrcidApi(APITestCase):
    """Class for testing Add ORCID API"""

    fixtures = ["tests/fixtures/testing_data"]

    def setUp(self):
        self.client = APIClient()

    def test_orcid_add_unathorized(self):
        """Test for ORCID add '401: Unathorized.'"""

        self.client.credentials(
            HTTP_AUTHORIZATION="Bearer TEST", HTTP_ORIGIN="http://testing.org"
        )
        response = self.client.post("/users/orcid/add/")

        self.assertEqual(response.status_code, 401)
