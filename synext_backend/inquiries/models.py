from django.db import models


class Product(models.Model):
    id = models.SlugField(primary_key=True, max_length=120)
    name = models.CharField(max_length=120)
    description = models.TextField(max_length=2000)
    category = models.CharField(max_length=120, blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    image = models.ImageField(upload_to="products/", blank=True)

    class Meta:
        ordering = ["sort_order", "name"]

    def __str__(self):
        return self.name


class SiteContent(models.Model):
    id = models.CharField(max_length=20, primary_key=True, default="default", editable=False)
    logo_image = models.ImageField(upload_to="site/", blank=True)
    hero_image = models.ImageField(upload_to="site/", blank=True)
    about_image = models.ImageField(upload_to="site/", blank=True)
    quality_background_image = models.ImageField(upload_to="site/", blank=True)
    why_image = models.ImageField(upload_to="site/", blank=True)
    contact_background_image = models.ImageField(upload_to="site/", blank=True)
    nav_links = models.JSONField(default=list)
    nav_cta_label = models.CharField(max_length=120, default="Explore Products")
    nav_cta_href = models.CharField(max_length=200, default="#products")
    about_eyebrow = models.CharField(max_length=120, default="ABOUT SYNEXTA PHARMA")
    about_title = models.CharField(max_length=200, default="Committed to quality. Focused on care.")
    about_body = models.TextField(default="")
    about_points = models.JSONField(default=list)
    quality_eyebrow = models.CharField(max_length=120, default="Quality Assurance")
    quality_points = models.JSONField(default=list)
    commitments_title = models.CharField(max_length=120, default="OUR COMMITMENTS")
    commitments_subtitle = models.CharField(max_length=200, default="Quality at the Heart of Every Formulation")
    commitments_points = models.JSONField(default=list)
    why_eyebrow = models.CharField(max_length=120, default="WHY CHOOSE US")
    why_title = models.CharField(max_length=200, default="Why choose Synexta Pharma?")
    why_body = models.TextField(default="")
    why_points = models.JSONField(default=list)
    footer_tagline = models.CharField(max_length=200, default="Quality Medicines. Trusted Care.")
    footer_quick_links = models.JSONField(default=list)
    footer_products_heading = models.CharField(max_length=120, default="Products")
    footer_product_links = models.JSONField(default=list)
    footer_copyright = models.CharField(max_length=200, default="© 2026 Synexta Pharma. All rights reserved.")
    footer_legal_links = models.JSONField(default=list)

    class Meta:
        verbose_name = "website content"
        verbose_name_plural = "website content"

    def __str__(self):
        return "Website content"


class ContactInquiry(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField(max_length=254)
    phone = models.CharField(max_length=30, blank=True)
    company = models.CharField(max_length=120, blank=True)
    topic = models.CharField(max_length=120)
    message = models.TextField(max_length=5000)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name_plural = "contact inquiries"

    def __str__(self):
        return f"{self.name} - {self.topic}"