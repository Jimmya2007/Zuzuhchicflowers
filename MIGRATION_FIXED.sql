-- Migration corrigée pour ajouter les images aux réservations
-- Exécuter ce script dans Supabase SQL Editor

-- Étape 1: Ajouter la colonne image_url si elle n'existe pas
ALTER TABLE public.reservations 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Étape 2: Créer le bucket de stockage (ignorer si existe déjà)
INSERT INTO storage.buckets (id, name, public)
VALUES ('reservation-images', 'reservation-images', true)
ON CONFLICT (id) DO NOTHING;

-- Étape 3: Supprimer les anciennes policies si elles existent
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public reads" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated deletes" ON storage.objects;

-- Étape 4: Créer les nouvelles policies
CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'reservation-images');

CREATE POLICY "Allow public reads"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'reservation-images');

CREATE POLICY "Allow authenticated deletes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'reservation-images');

-- Vérification: Afficher les colonnes de la table reservations
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'reservations' 
AND table_schema = 'public'
ORDER BY ordinal_position;
