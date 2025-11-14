# 📊 Monitoring de Performance - Guide Équipe Dev

## 🎯 Objectif

Ce document explique comment **surveiller et optimiser** les performances de Trophenix en production.

---

## 🔍 Logs de Performance Automatiques

### Console Navigateur (Dev/Debug)

Après connexion, ouvrez la console (F12) :

```javascript
[Performance] Auth signIn took: 243ms
[Performance] Profile fetch took: 127ms
```

**Interprétation :**
- **Auth signIn** : Temps de vérification bcrypt par Supabase (normal : 200-400ms)
- **Profile fetch** : Temps de récupération du profil DB (optimal : 50-200ms)

### Supprimer les Logs en Production

Pour désactiver les logs de performance en production :

```typescript
// src/contexts/AuthContext.tsx
const fetchProfile = async (userId: string) => {
  const startTime = performance.now();

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  // Commenter ou wrapper avec condition ENV
  if (import.meta.env.DEV) {
    const profileTime = performance.now() - startTime;
    console.log(`[Performance] Profile fetch took: ${profileTime.toFixed(0)}ms`);
  }

  // ... reste du code
};
```

---

## 📈 Métriques Critiques à Surveiller

### 1. Temps de Connexion Total

**Objectif : <500ms**

```
Temps Total = Auth (bcrypt) + Profile Fetch + Render
```

| Composante | Temps Normal | Alerte si > |
|-----------|--------------|-------------|
| Supabase Auth | 200-400ms | 600ms |
| Profile Fetch | 50-200ms | 400ms |
| React Render | 50-100ms | 200ms |
| **TOTAL** | **300-700ms** | **>1000ms** |

**Actions si lent :**
1. Vérifier index DB (`idx_profiles_auth_lookup`)
2. Vérifier latence réseau Supabase
3. Vérifier charge CPU/RAM serveur

### 2. Nombre de Requêtes par Connexion

**Objectif : 1 requête DB**

Avec l'architecture optimisée :
- ✅ **1 requête** : `SELECT * FROM profiles WHERE id = ...`
- ❌ **2+ requêtes** : Architecture non optimisée

**Vérifier :**
- Ouvrir Network tab (F12 > Network)
- Filtrer par "supabase.co/rest"
- Compter les appels après connexion

### 3. Taille du Bundle JS

**Objectif actuel : ~518 KB (compressé : ~123 KB)**

```bash
npm run build

# Résultat attendu
dist/assets/index-*.js   ~517 KB │ gzip: ~123 KB
```

**Optimisations futures :**
- Code splitting (React.lazy)
- Lazy load des pages admin
- Tree shaking des librairies inutilisées

---

## 🛠️ Outils de Monitoring

### 1. Supabase Dashboard

**URL :** https://supabase.com/dashboard/project/[PROJECT_ID]

**Métriques à surveiller :**
- **Database > Performance** : Requêtes lentes (>500ms)
- **Auth > Users** : Nombre de connexions/jour
- **Logs > Postgres Logs** : Erreurs RLS ou permissions

### 2. Lighthouse (Audit Performance)

```bash
# Via Chrome DevTools
1. Ouvrir DevTools (F12)
2. Onglet "Lighthouse"
3. Sélectionner "Performance"
4. Cliquer "Analyze page load"
```

**Scores cibles :**
- Performance : >90
- Accessibility : >90
- Best Practices : >90
- SEO : >80

### 3. React DevTools Profiler

```bash
# Installation
npm install -g react-devtools

# Utilisation
1. Ouvrir React DevTools
2. Onglet "Profiler"
3. Cliquer "Record"
4. Effectuer action (ex: connexion)
5. Cliquer "Stop"
```

**Analyse :**
- Temps de render par composant
- Nombre de re-renders inutiles
- Composants lents (>16ms)

---

## 🔧 Optimisations Déjà Appliquées

### ✅ Database

1. **Index composés** pour lookups rapides
2. **Colonnes cache** (is_admin, admin_role) pour éviter JOIN
3. **Triggers automatiques** pour sync sans code applicatif
4. **RLS simplifié** sans récursion infinie

### ✅ Frontend

1. **UNE SEULE requête** à la connexion
2. **Requêtes en parallèle** quand possible (Promise.all)
3. **maybeSingle()** au lieu de single() (évite erreurs)
4. **Cache React Context** (pas de re-fetch inutile)

### ✅ Sécurité

1. **SECURITY DEFINER** avec search_path fixé
2. **RLS activé** sur toutes les tables sensibles
3. **Audit logs** automatiques pour actions admin
4. **Permissions granulaires** par rôle

---

## 🚨 Alertes et Seuils

### Alertes à Configurer (Production)

| Métrique | Seuil Critique | Action |
|----------|----------------|--------|
| Temps connexion moyen | >1s | Vérifier DB + réseau |
| Erreurs auth | >5% | Vérifier logs Supabase |
| Erreurs RLS | >0% | Bug sécurité critique |
| Charge CPU DB | >80% | Scaler DB |
| Mémoire DB | >85% | Optimiser requêtes |

### Supabase Alerting (recommandé)

```sql
-- Créer une alerte pour requêtes lentes
-- Dashboard Supabase > Settings > Database > Performance Insights

-- Notification si moyenne >500ms sur 5min
```

---

## 📊 Requêtes SQL de Diagnostic

### Vérifier Performance des Index

```sql
-- Voir les index utilisés pour profiles
SELECT
    schemaname,
    tablename,
    indexname,
    idx_scan as index_scans,
    idx_tup_read as tuples_read,
    idx_tup_fetch as tuples_fetched
FROM pg_stat_user_indexes
WHERE tablename = 'profiles'
ORDER BY idx_scan DESC;

-- Si idx_scan = 0 → Index inutilisé, le supprimer
-- Si idx_scan élevé → Index performant, le garder
```

### Identifier Requêtes Lentes

```sql
-- Top 10 requêtes les plus lentes (nécessite pg_stat_statements)
SELECT
    query,
    calls,
    total_exec_time / 1000 as total_time_seconds,
    mean_exec_time as avg_time_ms,
    max_exec_time as max_time_ms
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;

-- Activer pg_stat_statements si pas déjà fait :
-- Dashboard Supabase > Database > Extensions > Activer pg_stat_statements
```

### Analyser Plan d'Exécution

```sql
-- Voir comment Postgres exécute une requête
EXPLAIN ANALYZE
SELECT * FROM profiles WHERE id = 'some-uuid';

-- Résultat attendu :
-- Index Scan using profiles_pkey on profiles (cost=... rows=1)
--   Index Cond: (id = 'some-uuid'::uuid)
-- Planning Time: 0.1 ms
-- Execution Time: 0.5 ms

-- ⚠️ Si "Seq Scan" au lieu de "Index Scan" → Problème d'index !
```

---

## 🎯 Roadmap Performance

### Court Terme (1-2 mois)

- [ ] Monitoring production (Sentry ou similaire)
- [ ] Alertes automatiques sur seuils critiques
- [ ] Dashboard temps réel des métriques
- [ ] Tests de charge (K6 ou Artillery)

### Moyen Terme (3-6 mois)

- [ ] Code splitting React (lazy load routes)
- [ ] Cache Redis pour sessions actives
- [ ] CDN pour assets statiques
- [ ] Service Worker (offline support)

### Long Terme (6-12 mois)

- [ ] Migration vers Read Replicas Supabase
- [ ] GraphQL pour requêtes optimisées
- [ ] Edge functions pour logique métier
- [ ] Serverless scaling automatique

---

## 🧪 Tests de Charge

### Objectif

Vérifier que le système tient la charge avec des millions d'utilisateurs.

### Outil Recommandé : K6

```bash
# Installation
brew install k6  # macOS
# ou
choco install k6  # Windows

# Créer test-connexion.js
```

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 100 },   // Montée à 100 users
    { duration: '5m', target: 1000 },  // Montée à 1000 users
    { duration: '2m', target: 0 },     // Descente
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% des requêtes <500ms
  },
};

export default function () {
  // Simuler connexion
  const loginRes = http.post('https://your-app.com/auth/login', {
    email: 'test@example.com',
    password: 'password123',
  });

  check(loginRes, {
    'login status 200': (r) => r.status === 200,
    'login time <500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}
```

```bash
# Lancer le test
k6 run test-connexion.js

# Résultat attendu :
# ✓ login status 200
# ✓ login time <500ms
# http_req_duration...: avg=350ms min=200ms max=480ms p(95)=450ms
```

---

## 📖 Ressources

### Documentation Supabase

- [Performance Best Practices](https://supabase.com/docs/guides/performance)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Database Indexes](https://supabase.com/docs/guides/database/postgres/indexes)

### Outils Monitoring

- [Sentry](https://sentry.io) : Error tracking + performance
- [Datadog](https://www.datadoghq.com) : APM complet
- [New Relic](https://newrelic.com) : Alternative Datadog
- [K6](https://k6.io) : Load testing gratuit

### Commandes Utiles

```bash
# Build production optimisé
npm run build

# Analyser bundle size
npm run build -- --mode analyze  # (nécessite rollup-plugin-visualizer)

# Type check (pas de runtime overhead)
npm run typecheck

# Lint (bonnes pratiques)
npm run lint
```

---

## ✅ Checklist Déploiement Production

Avant chaque déploiement :

- [ ] Build passe sans warning critique
- [ ] Type check OK (`npm run typecheck`)
- [ ] Tests unitaires OK (quand implémentés)
- [ ] Lighthouse score >90
- [ ] Temps connexion <500ms en dev
- [ ] Migration DB appliquée et testée
- [ ] Index DB vérifiés (pg_stat_user_indexes)
- [ ] Logs de performance désactivés en prod
- [ ] Variables d'environnement configurées
- [ ] Backup DB créé avant migration

---

## 🎓 Formation Équipe

### Onboarding Dev

1. Lire `z_README_AUTH_PERFORMANCE_ARCHITECTURE.md`
2. Lire ce document
3. Tester connexion en local et vérifier logs
4. Lancer `EXPLAIN ANALYZE` sur requêtes critiques
5. Comprendre RLS et SECURITY DEFINER

### Debugging Session

Simuler problèmes courants :
1. Supprimer un index → Voir impact performance
2. Ajouter une policy RLS récursive → Voir erreur
3. Mesurer temps connexion avant/après optimisations

---

## 🆘 Support

**Problème de performance ?**

1. Vérifier logs console navigateur
2. Vérifier Supabase Dashboard > Logs
3. Lancer EXPLAIN ANALYZE sur requêtes lentes
4. Consulter `z_README_AUTH_PERFORMANCE_ARCHITECTURE.md`
5. Contacter lead dev si bloqué

---

📅 **Dernière mise à jour** : 2025-10-12
👨‍💻 **Auteur** : Lead Dev Trophenix
🔖 **Version** : 1.0
