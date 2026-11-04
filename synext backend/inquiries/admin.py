from django.contrib import admin

from .models import ContactInquiry, Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "id", "sort_order")
    list_editable = ("sort_order",)
    search_fields = ("name", "id", "description", "category")
    prepopulated_fields = {"id": ("name",)}


@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "topic", "created_at")
    list_filter = ("created_at",)
    search_fields = ("name", "email", "topic", "message")
    readonly_fields = ("created_at",)