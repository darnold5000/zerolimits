-- Migration 007: Baseline Sports affiliate link and Zero Limits discount code.

begin;

update public.pro_shop_vendors
set
  shop_url = 'https://www.baselinesports.us?aff=217',
  referral_url = 'https://www.baselinesports.us?aff=217',
  discount_code = 'ZL10',
  updated_at = now()
where slug = 'baseline-sports';

commit;
