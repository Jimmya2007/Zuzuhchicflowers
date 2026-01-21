# Guide d'Intégration Analytics pour Zuzuh Chic Flowers

## Vue d'ensemble

Le dashboard analytique est maintenant disponible dans votre panneau d'administration. Actuellement, il affiche des données de démonstration. Pour voir les données réelles de trafic de votre site web, vous devez intégrer un service d'analytics.

## Options d'intégration

### Option 1: Google Analytics (Recommandé)

Google Analytics est gratuit et offre une analyse complète du trafic.

#### Étapes d'installation:

1. **Créer un compte Google Analytics**
   - Visitez: https://analytics.google.com/
   - Créez un compte et une propriété pour votre site

2. **Obtenir votre ID de mesure**
   - Format: `G-XXXXXXXXXX`
   - Vous le trouverez dans Admin > Flux de données

3. **Installer le code de suivi**
   
   Ajoutez ce code dans `index.html` avant la balise `</head>`:

   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

4. **Intégrer avec le Dashboard**

   Installez la bibliothèque React Google Analytics:
   ```bash
   npm install react-ga4
   ```

   Modifiez `DashboardPage.tsx` pour récupérer les vraies données:
   ```typescript
   import ReactGA from 'react-ga4';
   
   // Dans useEffect
   useEffect(() => {
     // Initialiser Google Analytics
     ReactGA.initialize('G-XXXXXXXXXX');
     
     // Récupérer les données via l'API Google Analytics
     // Utilisez l'API Google Analytics Data
   }, []);
   ```

### Option 2: Plausible Analytics

Plausible est une alternative respectueuse de la vie privée, sans cookies.

#### Installation:

1. **Créer un compte sur Plausible**
   - Visitez: https://plausible.io/
   - Plan payant à partir de $9/mois

2. **Ajouter le script**
   
   Dans `index.html`:
   ```html
   <script defer data-domain="votredomaine.com" src="https://plausible.io/js/script.js"></script>
   ```

3. **Utiliser l'API Plausible**
   
   Plausible offre une API REST pour récupérer les statistiques.

### Option 3: Matomo (Open Source)

Matomo est une solution open-source que vous pouvez héberger vous-même.

#### Installation:

1. **Héberger Matomo**
   - Téléchargez depuis: https://matomo.org/
   - Installez sur votre serveur

2. **Ajouter le code de tracking**
   
   Matomo vous fournira un code JavaScript à ajouter dans votre `index.html`

3. **Utiliser l'API Matomo**
   
   Utilisez l'API Matomo pour récupérer les statistiques.

## Connexion au Dashboard

Une fois l'analytics installé, vous devrez:

1. **Créer un service API**
   
   Créez un fichier `src/utils/analytics.ts`:
   ```typescript
   export async function fetchAnalyticsData() {
     // Appeler votre service d'analytics
     // Retourner les données formatées
     return {
       totalVisits: number,
       uniqueVisitors: number,
       topPages: PageView[],
       // etc.
     };
   }
   ```

2. **Mettre à jour DashboardPage.tsx**
   
   Remplacez les données mockées par un vrai appel API:
   ```typescript
   useEffect(() => {
     const loadAnalytics = async () => {
       const data = await fetchAnalyticsData();
       setStats(data);
       setLoading(false);
     };
     
     loadAnalytics();
   }, []);
   ```

## Accès au Dashboard

1. Connectez-vous à l'admin: `/admin-login`
2. Cliquez sur le bouton "Dashboard" dans l'en-tête de l'admin
3. Visualisez vos statistiques de trafic

## Fonctionnalités du Dashboard

- **Vue d'ensemble**: Statistiques globales et activité des 7 derniers jours
- **Pages Populaires**: Classement des pages les plus visitées
- **Temps Réel**: Statistiques en direct des visiteurs actuels

## Support

Pour toute question sur l'intégration analytics, consultez:
- [Documentation Google Analytics](https://developers.google.com/analytics)
- [Documentation Plausible](https://plausible.io/docs)
- [Documentation Matomo](https://matomo.org/docs/)
