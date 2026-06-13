-- ============================================================
-- kua-calculator - 0007 product_responses.extras
--
-- The Move-In Date Report is a personalised product that needs two
-- inputs beyond the three the Compass collects: the start and end of
-- the buyer's move-in window. Rather than add product-specific
-- columns, we add a single nullable JSONB column that any future
-- personalised product can use for its extra inputs.
--
-- For the Move-In Date Report the shape is:
--   { "moveStart": "2026-08-01", "moveEnd": "2026-08-31" }
--
-- Null for the Compass and the Extended Kua Report, which need only
-- the three base inputs (first_name, birth date, gender).
-- ============================================================

alter table public.product_responses
  add column if not exists extras jsonb;

comment on column public.product_responses.extras is
  'Optional per-product extra inputs. Move-In Date Report stores {moveStart, moveEnd}. Null for products that need only the three base inputs.';
