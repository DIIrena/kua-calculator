-- ============================================================
-- kua-calculator - 0006 product-files storage bucket
--
-- Private bucket for STATIC product deliverables (the Annual
-- Planner PDF/EPUB/ICS, the Good-Days Calendar files). Distinct
-- from product-pdfs (which holds per-customer personalised
-- renders) because the MIME allowlist differs: static products
-- ship EPUB and ICS alongside PDF.
--
-- Layout inside the bucket mirrors the commerce slugs:
--   annual-feng-shui-planner-2026/planner.pdf
--   annual-feng-shui-planner-2026/planner.epub
--   annual-feng-shui-planner-2026/calendar.ics
--   good-days-calendar-2026/calendar.pdf
--   good-days-calendar-2026/calendar.ics
--
-- Access: service-role only. Delivery mints 7-day signed URLs
-- (matching the refund window) from the webhook and the success
-- page. Nothing in this bucket is ever public.
-- ============================================================

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'product-files',
  'product-files',
  false,
  52428800, -- 50 MB
  array['application/pdf', 'application/epub+zip', 'text/calendar']
)
on conflict (id) do nothing;

-- If this insert is rejected by the platform (some Supabase plans
-- restrict SQL writes to storage schemas), create the bucket in the
-- dashboard instead:
--   Storage -> New bucket -> name: product-files
--                            public: OFF
--                            file size limit: 50 MB
--                            allowed MIME types: application/pdf,
--                              application/epub+zip, text/calendar
