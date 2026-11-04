import json

from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_GET, require_POST

from .models import ContactInquiry, Product


@require_GET
def products(request):
    catalogue = [
        {
            "id": product.id,
            "name": product.name,
            "description": product.description,
            "category": product.category,
        }
        for product in Product.objects.all()
    ]
    return JsonResponse({"products": catalogue})


@csrf_exempt
@require_POST
def contact(request):
    if request.content_type != "application/json":
        return JsonResponse({"error": "Content-Type must be application/json."}, status=415)

    try:
        payload = json.loads(request.body)
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"error": "Request body must contain valid JSON."}, status=400)

    if not isinstance(payload, dict):
        return JsonResponse({"error": "Request body must be a JSON object."}, status=400)

    fields = {
        "name": str(payload.get("name", "")).strip(),
        "email": str(payload.get("email", "")).strip(),
        "phone": str(payload.get("phone", "")).strip(),
        "topic": str(payload.get("topic", "")).strip(),
        "message": str(payload.get("message", "")).strip(),
    }
    errors = {}

    for field, value in fields.items():
        if field in {"name", "email", "topic", "message"} and not value:
            errors[field] = "This field is required."

    limits = {"name": 120, "email": 254, "phone": 30, "topic": 120, "message": 5000}
    for field, limit in limits.items():
        if len(fields[field]) > limit:
            errors[field] = f"This field must be {limit} characters or fewer."

    if fields["message"] and len(fields["message"]) < 10:
        errors["message"] = "Please enter at least 10 characters."

    if fields["email"]:
        try:
            validate_email(fields["email"])
        except ValidationError:
            errors["email"] = "Enter a valid email address."

    if errors:
        return JsonResponse({"errors": errors}, status=400)

    inquiry = ContactInquiry.objects.create(**fields)
    return JsonResponse(
        {"id": inquiry.pk, "message": "Your message has been received. Thank you for reaching out."},
        status=201,
    )