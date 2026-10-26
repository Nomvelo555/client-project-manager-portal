-- Supabase schema for the Client Project Manager Portal backend

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  contact_name text,
  status text not null default 'Active',
  revenue numeric not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  client_id uuid references clients(id) on delete set null,
  manager text,
  status text not null default 'Planning',
  progress integer not null default 0,
  due_date date,
  budget numeric not null default 0,
  health text not null default 'Healthy',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists support_tickets (
  id uuid primary key default gen_random_uuid(),
  project_code text,
  sender text not null,
  sender_role text not null check (sender_role in ('client', 'manager')),
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  project_code text,
  amount numeric not null default 0,
  status text not null default 'Pending',
  issued_at date,
  due_at date,
  created_at timestamptz not null default now()
);

create index if not exists idx_projects_client_id on projects(client_id);
create index if not exists idx_support_tickets_project_code on support_tickets(project_code);
create index if not exists idx_invoices_project_code on invoices(project_code);

-- Seed data
insert into clients (name, contact_name, status, revenue) values
  ('Apex Global Solutions', 'Mark Muwanguzi', 'Active', 210000),
  ('Urban Retail Group', 'Claire Dane', 'Active', 95000),
  ('FinTech Connect', 'Thabo Madibane', 'In Review', 120000),
  ('DataSanctity Corp', 'Xolisa Liwani', 'Completed', 60000)
on conflict (name) do nothing;

insert into projects (code, name, client_id, manager, status, progress, due_date, budget, health) values
  ('PRJ-001', 'Enterprise ERP Cloud Migration', (select id from clients where name = 'Apex Global Solutions'), 'Musa Masanabo', 'In Progress', 75, '2026-11-15', 150000, 'Healthy'),
  ('PRJ-002', 'E-Commerce Mobile App Redesign', (select id from clients where name = 'Urban Retail Group'), 'Sarah Jenkins', 'In Progress', 40, '2026-12-02', 85000, 'At Risk'),
  ('PRJ-003', 'AI Customer Support Integration', (select id from clients where name = 'FinTech Connect'), 'Musa Masanabo', 'Planning', 15, '2027-01-20', 120000, 'Healthy'),
  ('PRJ-004', 'Security Audit & Compliance', (select id from clients where name = 'DataSanctity Corp'), 'David Ross', 'Completed', 100, '2026-10-10', 60000, 'Completed');
