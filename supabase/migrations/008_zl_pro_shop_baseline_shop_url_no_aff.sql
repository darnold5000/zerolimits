-- Migration 008: Baseline embed uses plain shop URL; affiliate stays on referral/checkout only.

begin;

update public.pro_shop_vendors
set
  shop_url = 'https://www.baselinesports.us',
  referral_url = 'https://www.baselinesports.us?aff=217',
  updated_at = now()
where slug = 'baseline-sports';

commit;
