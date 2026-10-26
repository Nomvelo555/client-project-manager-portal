# Client Project Manager Portal — Backend

Express + JavaScript backend for the Client Project Manager Portal, using **Supabase** as the database.

## Setup

1. Install dependencies:

```bash
cd "/Users/jdt27p2/Desktop/Client project mananger portal/backend"
npm install
```

2. Create your Supabase project at https://supabase.com and grab the credentials
   from **Project Settings -> API**.

3. Copy the env template and fill in your values:

```bash
cp .env.example .env
```

```env
PORT=4000
CLIENT_URL=http://localhost:3000

SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

4. Run the backend:

```bash
npm start
```

## API Endpoints

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
| GET | `/api/health` | Health check + Supabase connectivity |
| GET | `/api/stats` | Aggregated dashboard stats |
| GET | `/api/projects` | List all projects (with client name) |
| GET | `/api/projects/:code` | Get a single project (e.g. `PRJ-001`) |
| POST | `/api/projects` | Create a project |
| PUT | `/api/projects/:code` | Update a project |
| DELETE | `/api/projects/:code` | Delete a project |
| GET | `/api/clients` | List all clients |
| POST | `/api/support` | Submit support message / feedback |
| GET | `/api/support` | List support tickets (filter by `?projectCode=PRJ-001`) |

## Supabase Schema

Run `supabase/schema.sql` in the Supabase SQL editor (or via `psql`) to create the tables:

- `clients`
- `projects`
- `support_tickets`
- `invoices`
