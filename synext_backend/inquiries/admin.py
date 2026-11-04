from django.contrib import admin

from .models import ContactInquiry, Product, SiteContent


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "id", "sort_order")
    list_editable = ("sort_order",)
    search_fields = ("name", "id", "description", "category")
    prepopulated_fields = {"id": ("name",)}


@admin.register(SiteContent)
class SiteContentAdmin(admin.ModelAdmin):
    fieldsets = (
        ("Navigation bar", {
            "fields": ("logo_image", "nav_links", "nav_cta_label", "nav_cta_href"),
            "description": 'Links use JSON objects with "label" and "href", for example [{"label":"Home","href":"#home"}].',
        }),
        ("About section", {
            "fields": ("about_eyebrow", "about_title", "about_body", "about_points"),
            "description": 'Point objects use "icon", "title", and "text". Available icon keys: care, clarity, engagement.',
        }),
        ("Quality assurance", {
            "fields": ("quality_eyebrow", "quality_points", "quality_background_image"),
            "description": 'Point objects use "icon", "title", and "text". Available icon keys: quality, transparency, standards, support.',
        }),
        ("Commitments", {
            "fields": ("commitments_title", "commitments_subtitle", "commitments_points"),
            "description": 'Point objects use "icon", "title", and "text". Available icon keys: quality, transparency, standards, support.',
        }),
        ("Why choose us", {
            "fields": ("why_eyebrow", "why_title", "why_body", "why_points", "why_image"),
            "description": 'Point objects use "icon", "title", and "text". Available icon keys: care, clarity, engagement.',
        }),
        ("Footer", {
            "fields": (
                "footer_tagline",
                "footer_quick_links",
                "footer_products_heading",
                "footer_product_links",
                "footer_copyright",
                "footer_legal_links",
            ),
            "description": 'Footer link objects use "label" and "href"; legal link "href" is optional.',
        }),
        ("Section images", {
            "fields": ("hero_image", "about_image", "contact_background_image"),
            "description": "Optional uploads replace the bundled defaults; leave an image empty to keep the current default.",
        }),
    )

    def has_add_permission(self, request):
        return not SiteContent.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "company", "topic", "created_at")
    list_filter = ("created_at",)
    search_fields = ("name", "email", "company", "topic", "message")
    readonly_fields = ("created_at",)