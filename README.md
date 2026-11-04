# Synexta Pharma

A responsive React and Django implementation of the supplied Synexta Pharma landing-page design.

## Requirements

- Node.js 18 or newer
- Python 3.10 or newer

## Run locally

Install the frontend dependencies and Django package:

```powershell
npm install
python -m pip install -r requirements.txt
```

Start the Django API and Vite frontend together:

```powershell
npm run dev
```

Open the Vite URL printed in the terminal, normally `http://localhost:5173`. Vite proxies `/api` requests to Django at `http://127.0.0.1:8000`.

Create the local SQLite database before using the admin site or viewing saved inquiries:

```powershell
python ".\synext_backend\manage.py" migrate
python ".\synext_backend\manage.py" createsuperuser
```

The admin site is at `http://127.0.0.1:8000/admin/`. Contact inquiries are stored in `synext_backend/db.sqlite3` and can be reviewed there.

To manage the website catalogue, sign in to the admin site and open **Products**. Add products with a name, description, category and display order; the ID is generated from the name and can be adjusted if needed. Edit or delete products from the same list.

To edit the navigation bar, About section, Quality Assurance section, Commitments section, Why Choose Us section, or footer, open **Website content**. This is a single shared record; edits are reflected on the website when it reloads. Repeating navigation, footer, or feature-card items are edited as JSON arrays. Each section in the admin includes the required object shape and supported icon keys; keep the JSON valid when editing these lists.

To change the site images, use the image upload fields on **Website content** for the logo, hero, About, Quality Assurance/Commitments background, Why Choose Us, and contact banner. To change a product image, open that product under **Products** and upload an image. Leaving an image empty uses the bundled site default (or, for products, the original product image). Uploads are stored under `synext_backend/media/`; back up and persist this folder along with the database.

## API

- `GET /api/products/` returns the product catalogue.
- `GET /api/content/` returns the editable website section content.
- `POST /api/contact/` accepts JSON with `name`, `email`, `phone`, `topic` and `message`; valid inquiries are stored in SQLite.

Run the backend tests with:

```powershell
python ".\synext_backend\manage.py" test inquiries
```

Contact enquiry notifications are emailed to `tangelraj@gmail.com`. Configure an SMTP sender account before submitting enquiries. For Gmail, use an app password (not your regular account password) and set these environment variables in the terminal before starting Django:

```powershell
$env:EMAIL_HOST_USER = "your-sender@gmail.com"
$env:EMAIL_HOST_PASSWORD = "your-gmail-app-password"
$env:DEFAULT_FROM_EMAIL = $env:EMAIL_HOST_USER
$env:INQUIRY_NOTIFICATION_EMAIL = "tangelraj@gmail.com"
npm run dev
```

Keep the sender app password private; do not put it in source control or share it in chat. The SMTP host defaults to Gmail (`smtp.gmail.com`, port `587`, TLS enabled). For another mail provider, also set `EMAIL_HOST`, `EMAIL_PORT`, and `EMAIL_USE_TLS`. If SMTP is not configured or delivery fails, the inquiry is still saved in the admin and the form reports that the notification email was not sent.

For deployment, set `DJANGO_SECRET_KEY`, `DJANGO_DEBUG=false` and `DJANGO_ALLOWED_HOSTS`, and provide the SMTP environment variables to the Django service. Configure the production web server to serve the Vite build, proxy `/api/` requests to Django, and serve Django media files from `MEDIA_ROOT` at `/media/`.