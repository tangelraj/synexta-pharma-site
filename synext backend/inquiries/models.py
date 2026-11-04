from django.db import models


class Product(models.Model):
    id = models.SlugField(primary_key=True, max_length=120)
    name = models.CharField(max_length=120)
    description = models.TextField(max_length=2000)
    category = models.CharField(max_length=120, blank=True)
    sort_order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "name"]

    def __str__(self):
        return self.name


class ContactInquiry(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField(max_length=254)
    phone = models.CharField(max_length=30, blank=True)
    topic = models.CharField(max_length=120)
    message = models.TextField(max_length=5000)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name_plural = "contact inquiries"

    def __str__(self):
        return f"{self.name} - {self.topic}"