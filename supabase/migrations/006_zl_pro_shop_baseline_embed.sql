-- Migration 006: Embed Baseline Sports shop inside Zero Limits (proxy iframe).

begin;

update public.pro_shop_vendors
set
  embed_internally = true,
  updated_at = now()
where slug = 'baseline-sports';

commit;
