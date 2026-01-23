-- Add currency column to products table
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'HTG';

-- Update products that were originally in USD
UPDATE public.products SET currency = 'USD', price = 125 WHERE name = 'Tournesols naturels Velours';
UPDATE public.products SET currency = 'USD', price = 150 WHERE name = 'Bouquet naturelles Intense';
UPDATE public.products SET currency = 'USD', price = 68 WHERE name = 'Bouquet Pêche naturelles';
UPDATE public.products SET currency = 'USD', price = 130 WHERE name = 'Composition Romantique';
UPDATE public.products SET currency = 'USD', price = 130 WHERE name = 'Composition Vintage';
UPDATE public.products SET currency = 'USD', price = 150 WHERE name = 'Roses Bordeaux Noble';

-- Update Package products with USD prices
UPDATE public.products SET currency = 'USD', price = 65 WHERE name = 'Package Romance Complète';
UPDATE public.products SET currency = 'USD', price = 59 WHERE name = 'Package Wimmy''s Bouquet';
UPDATE public.products SET currency = 'USD', price = 64 WHERE name = 'Package Cœur de Rose Bouquet';
UPDATE public.products SET currency = 'USD', price = 64 WHERE name = 'Package Praliness Bouquet';
UPDATE public.products SET currency = 'USD', price = 59 WHERE name = 'Package Douceur Bouquet';
UPDATE public.products SET currency = 'USD', price = 53 WHERE name = 'Package Wimmy''s Grande Taille';
UPDATE public.products SET currency = 'USD', price = 41 WHERE name = 'Package Chocolat Médium';
UPDATE public.products SET currency = 'USD', price = 61 WHERE name = 'Package Grande Peluche Bouquet';
UPDATE public.products SET currency = 'USD', price = 68 WHERE name = 'Package Cœur de Rose XL Sunshine';
UPDATE public.products SET currency = 'USD', price = 70 WHERE name = 'Package Wimmy''s Bouquet Artificiel';
UPDATE public.products SET currency = 'USD', price = 61 WHERE name = 'Package Grande Douceur';
UPDATE public.products SET currency = 'USD', price = 68 WHERE name = 'Package Cœur de Rose XL Grande Taille';
UPDATE public.products SET currency = 'USD', price = 70 WHERE name = 'Package Wimmy''s Artificiel Grande Taille';
UPDATE public.products SET currency = 'USD', price = 78 WHERE name = 'Package Feeling Artificiel';
UPDATE public.products SET currency = 'USD', price = 96 WHERE name = 'Package Amarantha Premium';
UPDATE public.products SET currency = 'USD', price = 84 WHERE name = 'Package Grande Peluche Luxe';
UPDATE public.products SET currency = 'USD', price = 70 WHERE name = 'Package Praliness XXL';
UPDATE public.products SET currency = 'USD', price = 81 WHERE name = 'Package Cœur de Rose Géant';
UPDATE public.products SET currency = 'USD', price = 103 WHERE name = 'Package Cœur de Rose Majestueux';
UPDATE public.products SET currency = 'USD', price = 112 WHERE name = 'Package Cœur de Rose Champagne';
UPDATE public.products SET currency = 'USD', price = 138 WHERE name = 'Package Feeling Artificiel Majestueux';
UPDATE public.products SET currency = 'USD', price = 163 WHERE name = 'Package Fontessa Prestige';
