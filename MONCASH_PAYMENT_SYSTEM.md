# 💳 Système de Paiement MonCash - Documentation

## 📋 Vue d'ensemble

Ce système implémente un **paiement MonCash MOCK** (simulation) qui peut être facilement remplacé par l'API MonCash réelle en production.

## 🏗️ Architecture

```
React Frontend (Vite)
    ↓
Supabase Edge Function (Backend API)
    ↓
Mock MonCash Service
    ↓
Supabase Database (PostgreSQL)
```

## 🗄️ Base de Données

### Table `orders`
Stocke toutes les commandes de paiement.

```sql
- id (UUID): Identifiant unique
- customer_name (TEXT): Nom du client
- customer_email (TEXT): Email du client  
- customer_phone (TEXT): Téléphone (optionnel)
- amount (NUMERIC): Montant total
- currency (TEXT): 'HTG' ou 'USD'
- status (TEXT): 'pending', 'paid', 'failed', 'cancelled'
- payment_method (TEXT): 'moncash'
- items (JSONB): Détails des articles
- created_at (TIMESTAMPTZ): Date de création
- updated_at (TIMESTAMPTZ): Date de mise à jour
```

### Table `payments`
Enregistre les transactions de paiement.

```sql
- id (UUID): Identifiant unique
- order_id (UUID): Référence à orders(id)
- provider (TEXT): 'moncash'
- provider_transaction_id (TEXT): ID transaction MonCash
- status (TEXT): 'pending', 'success', 'failed', 'refunded'
- raw_response (JSONB): Réponse brute de l'API
- created_at (TIMESTAMPTZ): Date de création
- updated_at (TIMESTAMPTZ): Date de mise à jour
```

## 🔧 Fichiers Créés

### 1. Migration Base de Données
**Fichier:** `supabase/migrations/20260121000007_create_payment_tables.sql`

- Crée les tables `orders` et `payments`
- Active RLS (Row Level Security)
- Configure les permissions pour `anon` et `authenticated`

### 2. Edge Function Backend
**Fichier:** `supabase/functions/payment/index.ts`

**Endpoints:**
- `POST /payment/create` - Créer une commande et initier le paiement
- `POST /payment/callback` - Callback de confirmation de paiement
- `GET /payment/order/:orderId` - Récupérer les détails d'une commande
- `GET /payment/health` - Vérification de l'état du service

### 3. Composant Modal de Paiement
**Fichier:** `src/app/components/PaymentModal.tsx`

**Étapes du flux:**
1. **form** - Formulaire client (nom, email, téléphone)
2. **processing** - Traitement en cours
3. **mock-payment** - Simulation MonCash (2 boutons: Succès/Échec)
4. **success** - Confirmation de paiement
5. **error** - Gestion des erreurs

### 4. Intégration Panier
**Fichier modifié:** `src/app/components/ShoppingCart.tsx`

- Bouton "Passer la Commande" ouvre le modal de paiement
- Connexion avec `PaymentModal`

### 5. Dashboard Admin
**Fichier modifié:** `src/app/components/pages/ValentineDashboard.tsx`

- Affiche toutes les commandes de paiement
- Filtres par statut (Payé, En attente, Échoué, Annulé)
- Détails complets de chaque commande

## 🔄 Flux de Paiement Complet

### 1. Client Ajoute au Panier
```tsx
// Sur BouquetsPage, PackagesPage, PeluchesPage
handleAddToCart() → addToCart() → localStorage
```

### 2. Client Clique "Passer la Commande"
```tsx
ShoppingCart → PaymentModal (form step)
```

### 3. Client Remplit le Formulaire
```tsx
- Nom complet (requis)
- Email (requis)
- Téléphone (optionnel)
```

### 4. Création de la Commande
```typescript
POST /payment/create
Body: {
  amount: 1500,
  currency: 'HTG',
  items: [...cartItems],
  customerName: "Jean Dupont",
  customerEmail: "jean@example.com",
  customerPhone: "+509 1234 5678"
}

Response: {
  success: true,
  orderId: "uuid-xxx",
  paymentId: "uuid-yyy",
  payment_url: "http://localhost:5175?payment=success&orderId=..."
}
```

**Backend:**
- Insère dans `orders` (status: pending)
- Insère dans `payments` (status: pending)
- Retourne URL de paiement mock

### 5. Simulation MonCash
```tsx
PaymentModal (mock-payment step)
→ 2 boutons: ✅ Succès | ❌ Échec
```

### 6. Confirmation de Paiement
```typescript
POST /payment/callback
Body: {
  orderId: "uuid-xxx",
  transactionId: "uuid-yyy",
  status: "success" // ou "failed"
}

Response: {
  success: true,
  orderId: "uuid-xxx",
  status: "paid",
  message: "Payment confirmed"
}
```

**Backend:**
- Met à jour `orders.status` → 'paid' ou 'failed'
- Met à jour `payments.status` → 'success' ou 'failed'
- Enregistre la transaction dans `raw_response`

### 7. Confirmation Client
```tsx
PaymentModal (success step)
→ Affiche numéro de commande
→ clearCart() - Vide le panier
→ Toast de succès
```

## 🔒 Sécurité

### Row Level Security (RLS)

**Table `orders`:**
- ✅ Tout le monde peut créer (`INSERT`)
- ✅ Tout le monde peut voir (`SELECT`)
- ✅ Seuls les admins authentifiés peuvent modifier (`UPDATE`)

**Table `payments`:**
- ✅ Seuls les admins peuvent voir (`SELECT`)
- ✅ Seul le service role peut gérer (`INSERT`/`UPDATE`)

### Protection Backend
- Validation des champs requis
- Vérification du montant côté serveur
- Logger chaque transaction
- CORS configuré pour sécurité

## 📊 Affichage Admin Dashboard

Le dashboard admin affiche:
- ✅ Toutes les commandes en temps réel
- ✅ Statut de chaque paiement (Payé, En attente, Échoué)
- ✅ Détails client (nom, email, téléphone)
- ✅ Montant et devise
- ✅ Date de création
- ✅ Bouton "Voir détails" pour plus d'infos

## 🧪 Test du Système

### 1. Déployer la Migration
```bash
# Dans Supabase SQL Editor
# Copier et exécuter: supabase/migrations/20260121000007_create_payment_tables.sql
```

### 2. Déployer la Edge Function
```bash
cd "c:\Users\jimje\OneDrive\Desktop\zuzuh chic\flowers\flowers\Zuzuh Chic Flowers Website"
supabase functions deploy payment
```

### 3. Tester le Flux Complet
1. Ajouter des produits au panier
2. Cliquer "Passer la Commande"
3. Remplir le formulaire
4. Cliquer "Payer avec MonCash"
5. Sur l'écran de simulation:
   - Cliquer "✅ Simuler Paiement Réussi"
6. Vérifier le message de succès
7. Vérifier que le panier est vide
8. Aller sur le Dashboard Admin
9. Voir la nouvelle commande avec statut "Payé"

### 4. Vérifier la Base de Données
```sql
-- Voir toutes les commandes
SELECT * FROM orders ORDER BY created_at DESC;

-- Voir tous les paiements
SELECT * FROM payments ORDER BY created_at DESC;

-- Voir commandes avec leurs paiements
SELECT 
  o.id, o.customer_name, o.amount, o.status,
  p.provider_transaction_id, p.raw_response
FROM orders o
LEFT JOIN payments p ON o.id = p.order_id
ORDER BY o.created_at DESC;
```

## 🔄 Passer à MonCash Réel (Plus Tard)

### Ce qui changera:
1. **Backend API (`supabase/functions/payment/index.ts`)**
   - Remplacer mock URL par API MonCash réelle
   - Ajouter OAuth token MonCash
   - Implémenter signature de sécurité
   - Valider les webhooks MonCash

2. **Variables d'Environnement**
   ```bash
   MONCASH_CLIENT_ID=votre_client_id
   MONCASH_CLIENT_SECRET=votre_secret
   MONCASH_API_URL=https://api.moncashbutton.digicelgroup.com
   ```

### Ce qui ne changera PAS:
- ❌ Frontend (PaymentModal.tsx)
- ❌ ShoppingCart.tsx
- ❌ Base de données (orders, payments)
- ❌ Dashboard Admin
- ❌ Flux utilisateur

### Exemple d'Intégration MonCash Réelle:
```typescript
// Dans payment/index.ts - POST /payment/create

// Au lieu de:
const paymentUrl = `${baseUrl}?payment=success&orderId=${order.id}`;

// Faire:
const moncashToken = await getMonCashToken();
const moncashPayment = await fetch('https://api.moncashbutton.digicelgroup.com/payment', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${moncashToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    amount: order.amount,
    orderId: order.id
  })
});

const { payment_url } = await moncashPayment.json();
return c.json({ payment_url });
```

## 📝 Logs et Monitoring

Le système log automatiquement:
- 📦 Création de commande
- 💳 Initiation de paiement
- ✅ Confirmation de paiement
- ❌ Erreurs et échecs

Voir les logs:
```bash
supabase functions logs payment
```

## 🚀 Déploiement en Production

### 1. Variables d'Environnement Supabase
```bash
supabase secrets set SITE_URL=https://votre-domaine.com
```

### 2. Configuration CORS
Modifier dans `payment/index.ts`:
```typescript
app.use("/*", cors({
  origin: "https://votre-domaine.com",
  // ...
}));
```

### 3. Activer RLS en Production
La migration active déjà RLS, mais vérifiez:
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('orders', 'payments');
```

## 📞 Support

Pour toute question ou problème:
1. Vérifier les logs: `supabase functions logs payment`
2. Vérifier la base de données
3. Tester avec des données mock
4. Consulter cette documentation

---

## ✅ Checklist de Déploiement

- [ ] Migration SQL exécutée
- [ ] Edge Function déployée
- [ ] Variables d'environnement configurées
- [ ] Tests de bout en bout réussis
- [ ] RLS activé et testé
- [ ] Dashboard admin fonctionnel
- [ ] Documentation lue et comprise

## 🎉 Fonctionnalités Complètes

✅ Création de commandes
✅ Paiement mock (simulation)
✅ Confirmation de paiement
✅ Historique des commandes
✅ Dashboard admin
✅ Notifications toast
✅ Gestion du panier
✅ Statuts de paiement multiples
✅ Sécurité RLS
✅ Architecture évolutive (prête pour MonCash réel)

**Système prêt pour les tests!** 🚀
