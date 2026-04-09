create table if not exists public.app_snapshots (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  materials jsonb not null default '{}'::jsonb,
  jobs jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.app_snapshots enable row level security;

create policy "Users can view their own snapshot"
on public.app_snapshots
for select
using (auth.uid() = user_id);

create policy "Users can insert their own snapshot"
on public.app_snapshots
for insert
with check (auth.uid() = user_id);

create policy "Users can update their own snapshot"
on public.app_snapshots
for update
using (auth.uid() = user_id);
