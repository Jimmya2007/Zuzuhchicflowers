# 🚀 Déploiement : Images et Notifications

## 📋 Ce qui a été ajouté

### 1. **Upload d'images dans les réservations**
- Les clients peuvent maintenant uploader des captures d'écran
- Les images sont stockées dans Supabase Storage
- Les images apparaissent dans le dashboard admin

### 2. **Notifications pour nouvelles commandes**
- Notification automatique quand une nouvelle commande arrive
- Notification automatique quand une nouvelle réservation arrive
- Rafraîchissement automatique toutes les 30 secondes
- Notifications visuelles avec toast messages

---

## ⚡ Déploiement (5 minutes)

### Étape 1 : Appliquer les migrations de base de données

1. **Aller sur Supabase Dashboard**
   - Ouvrir : https://supabase.com/dashboard/project/sbovtiakuigihbkjgnmo
   - Cliquer sur **SQL Editor** (menu gauche)

2. **Migration 1 : Ajouter le champ image_url**
   - Cliquer sur **New Query**
   - Copier TOUT le contenu de :
     ```
     supabase/migrations/20260203000001_add_image_to_reservations.sql
     ```
   - Coller dans l'éditeur SQL
   - Cliquer sur **RUN** (ou Ctrl+Enter)
   - ✅ Vous devriez voir : "Success"

### Étape 2 : Vérifier le Storage Bucket

1. Dans Supabase Dashboard, aller sur **Storage** (menu gauche)
2. Vous devriez voir un bucket nommé **"reservation-images"**
3. Si le bucket n'existe pas, créez-le manuellement :
   - Cliquer sur **New bucket**
   - Nom : `reservation-images`
   - Cocher **Public bucket**
   - Cliquer sur **Create bucket**

### Étape 3 : Vérifier les permissions du bucket

1. Cliquer sur le bucket **reservation-images**
2. Aller dans l'onglet **Policies**
3. Vérifier que ces policies existent :
   - ✅ "Allow public uploads" (INSERT)
   - ✅ "Allow public reads" (SELECT)
   - ✅ "Allow authenticated deletes" (DELETE)

Si elles n'existent pas, elles ont été créées par la migration.

---

## 🧪 Tester le système

### Test 1 : Upload d'image

1. **Aller sur le site** : http://localhost:5173
2. **Cliquer sur "Réserver"**
3. **Remplir le formulaire** avec :
   - Nom complet
   - Adresse
   - Téléphone
   - Email
   - Produit (ex: "Romance Passion")
   - Prix (ex: "5000")
   - **Uploader une image** (capture d'écran)
4. **Cliquer sur "Envoyer ma Réservation"**
5. ✅ Vous devriez voir "Envoi en cours..." puis "Réservation Envoyée !"

### Test 2 : Voir l'image dans le dashboard

1. **Se connecter au dashboard admin**
   - Email : jeremiechristopher11@gmail.com
   - Password : ZuzuhAdmin2026!
2. **Aller dans la section Réservations**
3. **Cliquer sur une réservation**
4. ✅ L'image devrait apparaître dans le modal

### Test 3 : Notifications

1. **Ouvrir le dashboard admin**
2. **Dans un autre onglet, créer une nouvelle réservation**
3. **Attendre 30 secondes maximum**
4. ✅ Une notification devrait apparaître : "💝 1 nouvelle(s) réservation(s)!"

---

## 📊 Vérification dans Supabase

### Vérifier la table reservations

```sql
SELECT id, customer_name, product, price, image_url, created_at 
FROM public.reservations 
ORDER BY created_at DESC 
LIMIT 5;
```

Vous devriez voir :
- ✅ La colonne `image_url` existe
- ✅ Les nouvelles réservations ont des URLs d'images

### Vérifier le Storage

1. Aller sur **Storage** → **reservation-images**
2. Vous devriez voir les images uploadées
3. Format des noms : `1738612345-abc123.jpg`

---

## 🎯 Fonctionnalités

### Pour les clients :

1. **Upload d'image facile**
   - Glisser-déposer ou cliquer pour sélectionner
   - Prévisualisation avant envoi
   - Formats acceptés : JPG, PNG, JPEG
   - Indicateur de progression pendant l'upload

2. **Confirmation visuelle**
   - Message de succès après envoi
   - Réinitialisation automatique du formulaire

### Pour l'administrateur :

1. **Voir les images des réservations**
   - Images affichées dans le modal de détails
   - Taille optimisée pour la lecture
   - Fallback si l'image ne charge pas

2. **Notifications en temps réel**
   - Notification pour nouvelles commandes
   - Notification pour nouvelles réservations
   - Rafraîchissement automatique toutes les 30 secondes
   - Compteur du nombre de nouvelles entrées

3. **Informations complètes**
   - Nom du client
   - Téléphone (cliquable pour appeler)
   - Email
   - Produit demandé
   - Prix
   - **Image du produit**
   - Message/adresse

---

## 🔧 Dépannage

### ❌ Erreur : "Failed to upload image"

**Solution** : Vérifier que le bucket existe et est public
1. Aller sur Storage → reservation-images
2. Vérifier que "Public" est coché
3. Vérifier les policies

### ❌ L'image ne s'affiche pas dans le dashboard

**Solution** : Vérifier l'URL de l'image
1. Ouvrir la console (F12)
2. Vérifier les erreurs réseau
3. Tester l'URL directement dans le navigateur

### ❌ Pas de notifications

**Solution** : Vérifier le rafraîchissement automatique
1. Ouvrir la console (F12)
2. Vous devriez voir : "🔄 Auto-refreshing data..." toutes les 30 secondes
3. Vérifier que les toasts sont activés

### ❌ Erreur : "bucket not found"

**Solution** : Créer le bucket manuellement
1. Storage → New bucket
2. Nom : `reservation-images`
3. Public : ✅ Oui
4. Create

---

## 📝 Fichiers modifiés

| Fichier | Changement |
|---------|------------|
| `ReservationPage.tsx` | Ajout upload d'images vers Supabase Storage |
| `ValentineDashboard.tsx` | Affichage images + notifications |
| `20260203000001_add_image_to_reservations.sql` | Migration base de données |

---

## ✅ Checklist de déploiement

Avant de mettre en production :

- [ ] Migration SQL exécutée avec succès
- [ ] Bucket "reservation-images" existe et est public
- [ ] Policies du bucket configurées
- [ ] Test d'upload d'image réussi
- [ ] Image visible dans le dashboard admin
- [ ] Notifications fonctionnent
- [ ] Rafraîchissement automatique actif
- [ ] Code committé et pushé sur GitHub

---

## 🎉 Résultat final

Après le déploiement :

✅ Les clients peuvent uploader des captures d'écran de produits
✅ Les images sont stockées de manière sécurisée dans Supabase
✅ Vous voyez les images dans le dashboard admin
✅ Vous recevez des notifications pour chaque nouvelle commande/réservation
✅ Le dashboard se rafraîchit automatiquement toutes les 30 secondes
✅ Vous ne manquerez plus jamais une commande !

**Votre système de réservation est maintenant complet ! 🚀**
