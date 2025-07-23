# Capsule

A time capsule app where you can create messages, photos, and audio recordings that unlock on future dates.

## Setup

You'll need the Laravel backend running first:

```bash
# In capsule-server directory
composer install
php artisan serve
```

Then for the frontend:

```bash
npm install
npm run dev
```

The app expects the Laravel API at `http://capsule-server.test` (pretty URLs feature).

## What it does

- Create time capsules with text, images, or audio
- Set them to reveal on future dates
- Share public capsules or keep them private
- "Surprise mode" hides capsules even from yourself until reveal date

## Tech stuff

- React Router 7 for the frontend
- Laravel API backend (in separate repo)
- CSS modules for styling
- Axios for API calls
- localStorage for auth tokens

Media files are base64 encoded and stored in the database (probably should use file storage for production).

## TODO

- File upload improvements
- Better error handling
- Mobile responsiveness could be better
- Maybe add push notifications for reveal dates
