# Welcome on VeryLegalWebsite!

## Demo Setup

To try the demo, follow these steps:

1. Create a `.env` file by copying `.env.example` and filling in your database credentials.
2. Run `db_creation.sql` using the username, password, and database name specified in your `.env` file.
3. Run `db.sql` to set up the database schema.
4. Run `db_feed.sql` to populate the database with sample products.

You can now run the frontend and log in as an admin.

---

## Admin Features

- On the **Admin Board Page**, you can:
  - Create a new **modo** account.
  - Log out and log in as the same **modo**.

---

## Modo Features

- On the **Modo Board Page**, you can:
  - Generate an **invite key**.
  - Log out and register as a **user** using the correct invite key.

---

## User Features

- As a **user**, you can:
  - Visit the homepage and add products to your basket.

---

## Important Notes

- On the admin page, if the toast "user" appears in green, it means you successfully created a new **modo** account.
- When registering as a user, you must **log out once** and reconnect to access the basket feature (this project is still in progress).
