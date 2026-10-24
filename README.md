# Futurescool doctor learning site prototype

A presentation-led homepage prototype in core PHP, HTML, CSS and a small amount of vanilla JavaScript. No framework or package installation is required.

## Run locally

From this directory, run `php -S 127.0.0.1:8000` and open `http://127.0.0.1:8000`.

## GitHub Pages

GitHub Pages serves static files and does not execute PHP. `dist/` contains the rendered HTML and CSS export for Pages. After pushing this project to a GitHub repository, the included workflow publishes `dist/` when changes are pushed to `main` or when the workflow is run manually. The PHP source remains available at the repository root.

## Before publishing

The course cards are sample concepts to demonstrate the layout and course discovery experience. Replace them with approved course names, faculty, curriculum, dates, delivery format, pricing, eligibility and accreditation details. The faculty area is intentionally marked as awaiting approved profiles. The current prototype does not collect inquiries or submit enrollments.

The design loads DM Sans and Manrope from Google Fonts; provide local font files if the site needs to work without third-party font requests.
