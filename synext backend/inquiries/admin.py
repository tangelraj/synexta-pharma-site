from django.contrib import admin

from .models import ContactInquiry


@admin.register(ContactInquiry)
class ContactInquiryAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "topic", "created_at")
    list_filter = ("created_at",)
    search_fields = ("name", "email", "topic", "message")
    readonly_fields = ("created_at",)