-- Migration 004: Generalized vendor catalog, embed, and referral configuration.

begin;

alter table public.pro_shop_vendors
  add column if not exists subtitle text,
  add column if not exists catalog_title text,
  add column if not exists embed_url text,
  add column if not exists referral_url text,
  add column if not exists embed_internally boolean not null default false;

update public.pro_shop_vendors
set
  catalog_title = coalesce(catalog_title, 'Spring 2027 Catalog'),
  embed_internally = true
where slug = 'rawlings-easton';

update public.pro_shop_vendors
set
  name = 'Baseline Sports',
  subtitle = 'An Extra Innings Company',
  title = 'Shop Baseball Gear',
  catalog_title = 'Shop Baseball Gear',
  description = 'Browse baseball equipment and gear available through Baseline Sports, an Extra Innings company.',
  fulfillment_note = 'Orders are completed through Baseline Sports, an Extra Innings company.',
  enabled = true,
  embed_internally = false
where slug = 'baseline-sports';

commit;
