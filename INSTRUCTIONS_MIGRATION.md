# 🔧 Instructions pour Appliquer la Migration

## ⚠️ Erreur Résolue

L'erreur que vous avez rencontrée était due à des policies existantes. Voici la solution :

---

## 📝 Étapes à Suivre

### 1. Ouvrir Supabase Dashboard

- Aller sur : **https://supabase.com/dashboard/project/sbovtiakuigihbkjgnmo**
- Cliquer sur **SQL Editor** dans le menu gauche
- Cliquer sur **New Query**

### 2. Copier et Exécuter ce Code SQL

**Copiez TOUT le code ci-dessous et collez-le dans l'éditeur SQL :**

```sql
-- Migration corrigée pour ajouter les images aux réservations

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
```

### 3. Cliquer sur RUN

- Appuyer sur **RUN** ou **Ctrl+Enter**
- Vous devriez voir : **"Success"**

---

## ✅ Vérification

### Vérifier que la colonne existe :

Exécutez cette requête dans SQL Editor :

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'reservations' 
AND table_schema = 'public'
ORDER BY ordinal_position;
```

Vous devriez voir la colonne **`image_url`** de type **`text`** dans la liste.

### Vérifier le bucket Storage :

1. Aller sur **Storage** dans le menu gauche
2. Vous devriez voir le bucket **"reservation-images"**
3. Il doit être marqué comme **Public**

---

## 🧪 Tester l'Upload d'Image

1. **Aller sur votre site** (après le redéploiement Vercel)
2. **Remplir le formulaire de réservation** :
   - Nom complet
   - Adresse
   - Téléphone
   - Email
   - Produit (ex: "Romance Passion")
   - Prix (ex: "5000")
   - **Uploader une image** (capture d'écran du produit)
3. **Cliquer sur "Envoyer ma Réservation"**
4. Vous devriez voir "Envoi en cours..." puis "Réservation Envoyée !"

### Vérifier dans le Dashboard Admin :

1. **Se connecter au dashboard**
   - Email : jeremiechristopher11@gmail.com
   - Password : ZuzuhAdmin2026!

2. **Aller dans Réservations**
   - Vous devriez voir une **miniature de l'image** à côté de la réservation

3. **Cliquer sur la réservation**
   - L'image devrait s'afficher en grand
   - Section "📸 Photo du Produit Demandé"
   - Lien pour ouvrir l'image en plein écran

---

## 🐛 Si ça ne fonctionne toujours pas

### Vérifier les erreurs dans la console :

1. Ouvrir le site
2. Appuyer sur **F12** pour ouvrir la console
3. Essayer d'uploader une image
4. Regarder les erreurs dans l'onglet **Console** et **Network**

### Vérifier que l'image est uploadée :

1. Dans Supabase, aller sur **Storage** → **reservation-images**
2. Vous devriez voir les images uploadées
3. Format des noms : `1738612345-abc123.jpg`

### Vérifier la base de données :

```sql
SELECT id, customer_name, product, price, image_url, created_at 
FROM public.reservations 
ORDER BY created_at DESC 
LIMIT 5;
```

La colonne `image_url` doit contenir des URLs comme :
`https://sbovtiakuigihbkjgnmo.supabase.co/storage/v1/object/public/reservation-images/...`

---

## 📞 Résumé

✅ **Migration SQL corrigée** - Supprime les anciennes policies avant d'en créer de nouvelles
✅ **Bucket Storage créé** - Pour stocker les images
✅ **Permissions configurées** - Upload public, lecture publique
✅ **Affichage amélioré** - Miniatures dans la liste + image en grand dans les détails

**Après avoir appliqué cette migration, les images fonctionneront parfaitement !** 🎉
