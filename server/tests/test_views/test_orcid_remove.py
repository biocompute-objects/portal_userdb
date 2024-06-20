#!/usr/bin/env python3

"""Test Orcid Remove API [WIP]

Test for '200: Remove ORCID successful.', '401: Unathorized.', and '403: Bad request.'
"""

from rest_framework.test import APIClient, APITestCase
from users.models import User


class TestRemoveOrcidApi(APITestCase):
    """Class for testing Remove ORCID API"""

    fixtures = ["tests/fixtures/testing_data"]

    def setUp(self):
        self.client = APIClient()

    def test_orcid_remove_unathorized(self):
        """Test for ORCID remove '401: Unathorized.'"""

        self.client.credentials(
            HTTP_AUTHORIZATION="Bearer TEST", HTTP_ORIGIN="http://testing.org"
        )
        response = self.client.post("/users/orcid/remove/")

        self.assertEqual(response.status_code, 401)
