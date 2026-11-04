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
python ".\synext backend\manage.py" migrate
python ".\synext backend\manage.py" createsuperuser
```

The admin site is at `http://127.0.0.1:8000/admin/`. Contact inquiries are stored in `backend/db.sqlite3` and can be reviewed there.

To manage the website catalogue, sign in to the admin site and open **Products**. Add products with a name, description, category and display order; the ID is generated from the name and can be adjusted if needed. Edit or delete products from the same list. Catalogue changes are reflected on the website when it reloads.

## API

- `GET /api/products/` returns the product catalogue.
- `POST /api/contact/` accepts JSON with `name`, `email`, `phone`, `topic` and `message`; valid inquiries are stored in SQLite.

Run the backend tests with:

```powershell
python ".\synext backend\manage.py" test inquiries
```

For deployment, set `DJANGO_SECRET_KEY`, `DJANGO_DEBUG=false` and `DJANGO_ALLOWED_HOSTS`. Configure the production web server to serve the Vite build and proxy `/api/` requests to Django. Contact inquiries are stored but are not emailed automatically.