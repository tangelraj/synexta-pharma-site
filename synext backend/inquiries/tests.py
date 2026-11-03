import json

from django.test import TestCase

from .models import ContactInquiry


class ProductApiTests(TestCase):
    def test_lists_products(self):
        response = self.client.get("/api/products/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()["products"]), 7)
        self.assertEqual(response.json()["products"][0]["id"], "neurosyn-m")

    def test_rejects_non_get_method(self):
        response = self.client.post("/api/products/")

        self.assertEqual(response.status_code, 405)


class ContactApiTests(TestCase):
    def test_saves_valid_contact_inquiry(self):
        payload = {
            "name": "Avery Example",
            "email": "avery@example.com",
            "phone": "+1 555 010 0200",
            "topic": "Product enquiry",
            "message": "I would like to learn more about your product portfolio.",
        }

        response = self.client.post(
            "/api/contact/",
            data=json.dumps(payload),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(ContactInquiry.objects.count(), 1)
        self.assertEqual(ContactInquiry.objects.get().email, payload["email"])

    def test_rejects_invalid_email(self):
        response = self.client.post(
            "/api/contact/",
            data=json.dumps({"name": "Avery", "email": "not-an-email", "topic": "General", "message": "A long enough message."}),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, 400)
        self.assertIn("email", response.json()["errors"])
        self.assertEqual(ContactInquiry.objects.count(), 0)

    def test_rejects_malformed_json(self):
        response = self.client.post("/api/contact/", data="{", content_type="application/json")

        self.assertEqual(response.status_code, 400)
        self.assertIn("error", response.json())

    def test_rejects_non_json_content_type(self):
        response = self.client.post("/api/contact/", data="name=Avery", content_type="text/plain")

        self.assertEqual(response.status_code, 415)