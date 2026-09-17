-- Migration 005: Enable Baseline Sports vendor with shop URL and logo.

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
  image_url = '/images/catalog/baseline-sports.png',
  shop_url = 'https://www.baselinesports.us',
  catalog_url = null,
  embed_url = null,
  referral_url = 'https://www.baselinesports.us',
  fulfillment_note = 'Orders and checkout are completed through Baseline Sports, an Extra Innings company.',
  enabled = true,
  embed_internally = false,
  sort_order = 2,
  updated_at = now()
where slug = 'baseline-sports';

insert into public.pro_shop_vendors (
  slug,
  name,
  subtitle,
  title,
  catalog_title,
  description,
  image_url,
  shop_url,
  referral_url,
  fulfillment_note,
  enabled,
  embed_internally,
  sort_order
)
select
  'baseline-sports',
  'Baseline Sports',
  'An Extra Innings Company',
  'Shop Baseball Gear',
  'Shop Baseball Gear',
  'Browse baseball equipment and gear available through Baseline Sports, an Extra Innings company.',
  '/images/catalog/baseline-sports.png',
  'https://www.baselinesports.us',
  'https://www.baselinesports.us',
  'Orders and checkout are completed through Baseline Sports, an Extra Innings company.',
  true,
  false,
  2
where not exists (
  select 1 from public.pro_shop_vendors where slug = 'baseline-sports'
);

commit;
