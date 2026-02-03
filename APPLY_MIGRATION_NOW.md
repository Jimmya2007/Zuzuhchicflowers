# 🚨 IMPORTANT : Appliquer la Migration Supabase

## ⚠️ Les images ne s'afficheront PAS tant que cette migration n'est pas appliquée !

### Étape 1 : Aller sur Supabase

1. Ouvrir : **https://supabase.com/dashboard/project/sbovtiakuigihbkjgnmo**
2. Cliquer sur **SQL Editor** dans le menu gauche
3. Cliquer sur **New Query**

### Étape 2 : Copier et Exécuter cette Migration

Copier TOUT le code ci-dessous et le coller dans l'éditeur SQL :

```sql
-- Add image_url field to reservations table
ALTER TABLE public.reservations 
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Add comment for clarity
COMMENT ON COLUMN public.reservations.image_url IS 'URL of the product screenshot uploaded by customer';

-- Create storage bucket for reservation images if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('reservation-images', 'reservation-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public uploads to reservation-images bucket
CREATE POLICY IF NOT EXISTS "Allow public uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'reservation-images');

-- Allow public reads from reservation-images bucket
CREATE POLICY IF NOT EXISTS "Allow public reads"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'reservation-images');

-- Allow authenticated users to delete from reservation-images bucket
CREATE POLICY IF NOT EXISTS "Allow authenticated deletes"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'reservation-images');
```

### Étape 3 : Exécuter

1. Cliquer sur **RUN** (ou appuyer sur Ctrl+Enter)
2. Vous devriez voir : **"Success. No rows returned"** ou **"Success"**

### Étape 4 : Vérifier le Bucket Storage

1. Dans Supabase, aller sur **Storage** (menu gauche)
2. Vous devriez voir un bucket nommé **"reservation-images"**
3. Vérifier qu'il est marqué comme **Public**

---

## ✅ Après la Migration

Une fois la migration appliquée :

1. **Tester l'upload d'image** :
   - Aller sur votre site
   - Remplir le formulaire de réservation
   - Uploader une image
   - Soumettre

2. **Vérifier dans le dashboard admin** :
   - Se connecter au dashboard
   - Cliquer sur une réservation
   - L'image devrait apparaître dans la section "Capture d'écran du produit"

---

## 🔍 Si l'image ne s'affiche toujours pas

### Vérifier dans Supabase :

1. **Table reservations** :
   ```sql
   SELECT id, customer_name, product, image_url 
   FROM public.reservations 
   ORDER BY created_at DESC 
   LIMIT 5;
   ```
   - La colonne `image_url` doit contenir une URL

2. **Storage bucket** :
   - Aller sur Storage → reservation-images
   - Vérifier que les images sont uploadées

3. **Tester l'URL de l'image** :
   - Copier l'URL depuis la base de données
   - Ouvrir dans un navigateur
   - L'image devrait s'afficher

---

## 📞 Besoin d'aide ?

Si après avoir appliqué la migration, les images ne s'affichent toujours pas :

1. Ouvrir la console du navigateur (F12)
2. Vérifier les erreurs
3. Prendre une capture d'écran des erreurs
4. Me contacter avec les détails

**CETTE MIGRATION EST OBLIGATOIRE POUR QUE LES IMAGES FONCTIONNENT !**
