-- Add campaign type: 'monthly' or 'org'
alter table public.fundraisers
  add column if not exists type text default 'org' check (type in ('monthly','org'));


