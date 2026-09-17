-- Dealflow MVP schema for Supabase Postgres
create extension if not exists "pgcrypto";

create table if not exists public.support_requests (
  id uuid primary key default gen_random_uuid(),
  customer text not null,
  deal_name text not null,
  product text not null,
  priority text not null default '보통' check (priority in ('높음', '보통', '낮음')),
  description text not null,
  schedule text,
  status text not null default 'submitted',
  requested_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.support_requests enable row level security;

create policy "authenticated users can read support requests"
  on public.support_requests for select
  to authenticated using (true);

create policy "authenticated users can create support requests"
  on public.support_requests for insert
  to authenticated with check (auth.uid() = requested_by or requested_by is null);
