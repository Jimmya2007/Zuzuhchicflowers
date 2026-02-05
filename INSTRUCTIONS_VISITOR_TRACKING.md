# 📊 Instructions pour Activer le Suivi des Visites

## ⚠️ IMPORTANT : Vous devez appliquer cette migration dans Supabase

Le système de suivi des visites est déjà codé dans le site, mais la table `visitors` doit être créée dans votre base de données Supabase.

---

## 🔧 Étapes pour Activer le Suivi des Visites

### 1️⃣ Ouvrir Supabase Dashboard

1. Allez sur [https://supabase.com](https://supabase.com)
2. Connectez-vous à votre compte
3. Sélectionnez votre projet **Zuzuh Chic Flowers**

### 2️⃣ Ouvrir le SQL Editor

1. Dans le menu de gauche, cliquez sur **SQL Editor** (icône de base de données)
2. Cliquez sur **New query** (Nouvelle requête)

### 3️⃣ Copier et Exécuter le Script SQL

1. Ouvrez le fichier `APPLY_VISITOR_TRACKING.sql` dans ce dossier
2. **Copiez TOUT le contenu** du fichier
3. **Collez-le** dans l'éditeur SQL de Supabase
4. Cliquez sur **Run** (Exécuter) en bas à droite

### 4️⃣ Vérifier que ça a Fonctionné

Après avoir exécuté le script, vous devriez voir un message de succès :
```
Visitor tracking setup complete!
total_visitors: 0
days_tracked: 0
last_visit: null
```

C'est normal que ce soit à 0 au début - les visites seront comptées automatiquement dès que quelqu'un visite le site.

---

## ✅ Comment ça Fonctionne Après l'Activation

### Comptage Automatique des Visites

Une fois la migration appliquée :

1. **Chaque fois qu'un visiteur ouvre le site** → Une visite est automatiquement enregistrée
2. **Chaque fois qu'un visiteur navigue** (Accueil → Bouquets → Peluches, etc.) → Chaque page est comptée
3. **Les données sont stockées** dans la table `visitors` de Supabase

### Informations Enregistrées pour Chaque Visite

- **Page visitée** (URL complète)
- **Date de visite** (YYYY-MM-DD)
- **Navigateur utilisé** (User Agent)
- **Provenance** (Referrer - d'où vient le visiteur)
- **Heure exacte** (Timestamp)

### Où Voir les Statistiques

Dans le **Dashboard Admin** (`/dashboard`), vous verrez :

- **Total des visites** : Nombre total de pages vues
- **Visiteurs uniques** : Nombre de visiteurs différents (basé sur le navigateur)
- **Pages les plus visitées** : Top 5 des pages populaires
- **Graphiques** : Évolution des visites dans le temps

---

## 🔍 Vérification en Temps Réel

### Test Rapide

1. Appliquez la migration SQL dans Supabase
2. Ouvrez votre site web : `https://zuzuhchicflowers.netlify.app`
3. Naviguez sur différentes pages (Accueil, Bouquets, Peluches, etc.)
4. Ouvrez la console du navigateur (F12) et regardez les logs :
   - Vous devriez voir : `📊 Tracking page visit: [URL]`
   - Puis : `✅ Page visit tracked successfully`
5. Allez dans le Dashboard Admin
6. Vous devriez voir le nombre de visites augmenter !

### Vérifier dans Supabase Directement

1. Dans Supabase, allez dans **Table Editor**
2. Sélectionnez la table `visitors`
3. Vous verrez toutes les visites enregistrées avec :
   - URL de la page
   - Date et heure
   - Navigateur
   - Provenance

---

## 🚨 Dépannage

### Si les visites ne sont pas comptées :

1. **Vérifiez que la migration a été appliquée** :
   - Allez dans Supabase → Table Editor
   - Cherchez la table `visitors`
   - Si elle n'existe pas, réappliquez le script SQL

2. **Vérifiez les permissions** :
   - Dans Supabase → Authentication → Policies
   - La table `visitors` doit avoir :
     - ✅ Policy "Allow anonymous insert" (INSERT pour anon)
     - ✅ Policy "Allow authenticated select" (SELECT pour authenticated)

3. **Vérifiez la console du navigateur** :
   - Ouvrez F12 sur votre site
   - Regardez l'onglet Console
   - Si vous voyez des erreurs 401 ou 403, c'est un problème de permissions
   - Réappliquez le script SQL

4. **Videz le cache du navigateur** :
   - Appuyez sur Ctrl+Shift+R (Windows) ou Cmd+Shift+R (Mac)
   - Cela force le rechargement complet du site

---

## 📈 Résultat Final

Une fois activé, vous aurez :

✅ **Comptage automatique** de chaque visite sur le site  
✅ **Statistiques détaillées** dans le Dashboard Admin  
✅ **Historique complet** de toutes les visites  
✅ **Pages populaires** identifiées  
✅ **Tendances** de trafic visibles  

**Le système fonctionne en arrière-plan sans aucune action requise de votre part !**
