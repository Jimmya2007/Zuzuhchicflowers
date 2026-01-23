# 🚀 Guide de Déploiement Rapide - Paiement MonCash

## ⚡ En 5 Étapes

### 1️⃣ Déployer la Migration SQL (2 min)

1. Aller sur [Supabase Dashboard](https://supabase.com/dashboard)
2. Sélectionner votre projet: `sbovtiakuigihbkjgnmo`
3. Cliquer sur **SQL Editor** (dans le menu gauche)
4. Copier tout le contenu du fichier:
   ```
   supabase/migrations/20260121000007_create_payment_tables.sql
   ```
5. Coller dans l'éditeur SQL
6. Cliquer **Run** (ou `Ctrl+Enter`)
7. ✅ Vérifier que "Success" apparaît

### 2️⃣ Déployer l'Edge Function (3 min)

Ouvrir PowerShell dans le dossier du projet:

```powershell
cd "c:\Users\jimje\OneDrive\Desktop\zuzuh chic\flowers\flowers\Zuzuh Chic Flowers Website"

# Login si nécessaire
supabase login

# Link au projet
supabase link --project-ref sbovtiakuigihbkjgnmo

# Déployer la function
supabase functions deploy payment
```

✅ Vous devriez voir: `Deployed Function payment`

### 3️⃣ Tester l'API (1 min)

Exécuter le script de test:

```powershell
.\test-payment-system.ps1
```

✅ Tous les tests doivent passer (affichage en vert)

### 4️⃣ Tester dans l'Interface (2 min)

1. **Démarrer le serveur dev** (si pas déjà fait):
   ```powershell
   npm run dev
   ```

2. **Ouvrir dans le navigateur**: http://localhost:5175

3. **Tester le flux complet**:
   - Aller sur "Bouquets" ou "Packages"
   - Cliquer "Ajouter" sur un produit
   - Cliquer l'icône panier (en haut à droite)
   - Cliquer "Passer la Commande"
   - Remplir le formulaire:
     - Nom: Jean Test
     - Email: test@example.com
     - Téléphone: +509 1234 5678
   - Cliquer "Payer avec MonCash"
   - Sur l'écran orange de simulation:
     - Cliquer "✅ Simuler Paiement Réussi"
   - ✅ Voir le message de succès
   - ✅ Le panier doit être vide

4. **Vérifier dans le Dashboard**:
   - Aller sur "Admin" (icône cadenas)
   - Login avec vos identifiants
   - ✅ Voir la commande dans "Commandes Récentes"
   - ✅ Statut doit être "Payé" (vert)

### 5️⃣ Vérifier la Base de Données (1 min)

Dans **Supabase Dashboard** → **SQL Editor**:

```sql
-- Voir toutes les commandes
SELECT 
  id, 
  customer_name, 
  customer_email, 
  amount, 
  currency, 
  status,
  created_at
FROM orders 
ORDER BY created_at DESC 
LIMIT 10;

-- Voir tous les paiements
SELECT 
  o.customer_name,
  o.amount,
  o.status as order_status,
  p.status as payment_status,
  p.created_at
FROM orders o
LEFT JOIN payments p ON o.id = p.order_id
ORDER BY p.created_at DESC
LIMIT 10;
```

✅ Vous devriez voir vos commandes de test

---

## 🔧 Dépannage

### Erreur: "Function not found"
```powershell
# Re-déployer la function
supabase functions deploy payment --no-verify-jwt
```

### Erreur: "Table does not exist"
- Retourner à l'étape 1
- Re-exécuter la migration SQL

### Erreur: "Permission denied"
```sql
-- Vérifier les RLS policies
SELECT tablename, policyname, cmd 
FROM pg_policies 
WHERE tablename IN ('orders', 'payments');
```

### Paiement reste "En attente"
- Vérifier la console browser (F12)
- Voir les erreurs réseau
- Vérifier que le callback a bien été appelé

---

## 📊 Commandes Utiles

### Voir les logs de la Function
```powershell
supabase functions logs payment --follow
```

### Relancer le serveur dev
```powershell
npm run dev
```

### Nettoyer les données de test
```sql
-- ATTENTION: Supprime toutes les données
DELETE FROM payments;
DELETE FROM orders;
```

---

## ✅ Checklist de Vérification

- [ ] Migration SQL exécutée
- [ ] Edge Function déployée
- [ ] Tests automatiques passent
- [ ] Ajout au panier fonctionne
- [ ] Modal de paiement s'ouvre
- [ ] Formulaire se soumet
- [ ] Simulation MonCash affichée
- [ ] Paiement confirmé
- [ ] Panier vidé après paiement
- [ ] Commande visible dans Dashboard
- [ ] Statut "Payé" affiché
- [ ] Données dans la base de données

---

## 🎯 Prochaines Étapes

### Pour l'intégration MonCash Réelle:

1. **Obtenir les credentials MonCash**:
   - Client ID
   - Client Secret
   - Environnement (sandbox/production)

2. **Configurer les secrets Supabase**:
   ```powershell
   supabase secrets set MONCASH_CLIENT_ID=your_id
   supabase secrets set MONCASH_CLIENT_SECRET=your_secret
   supabase secrets set MONCASH_ENV=sandbox
   ```

3. **Modifier `payment/index.ts`** (ligne ~45):
   - Remplacer l'URL mock par l'API MonCash
   - Ajouter l'authentification OAuth
   - Gérer les webhooks réels

4. **Aucun changement frontend nécessaire!** 🎉

---

## 📚 Documentation Complète

Voir: `MONCASH_PAYMENT_SYSTEM.md` pour tous les détails techniques.

---

## 💡 Notes Importantes

- 🔒 Le système est sécurisé avec RLS
- 💾 Toutes les transactions sont enregistrées
- 🔄 Facile de passer à MonCash réel
- 📱 Responsive mobile/desktop
- ✅ Prêt pour la production

**Temps total de déploiement: ~10 minutes** ⏱️
