# Missing APIs - UPDATED

This document lists the APIs that are needed for the frontend. **UPDATED** based on endpoint specification.

## ✅ IMPLEMENTED API Calls and Hooks

### Authentication
- `POST /api/auth/select-account-type/` - Account type selection ✅
- `POST /api/auth/oubli-mdp/` - Password reset request ✅
- `POST /api/auth/reinitialisation-mdp/` - Password reset confirmation ✅
- Existing: login, refresh, me, register ✅

### Professional Registration Flow
- `POST /api/professionnel/informations/` - Company basic info ✅
- `POST /api/professionnel/localisation/` - Company location/size ✅
- `POST /api/professionnel/description/` - Company description ✅
- `GET /api/professionnel/profil/<id>/` - Get company profile ✅

### Enhanced Athlete Registration Flow
- `POST /api/athlete/situation/` - Current situation ✅
- `POST /api/athlete/type/` - Handisport or regular ✅
- `POST /api/athlete/club/` - Club and level info ✅
- `POST /api/athlete/projet-pro/` - Professional project ✅
- `POST /api/athlete/profil/` - Personal information ✅
- `POST /api/athlete/account/` - Account creation ✅

### Email Verification
- `POST /api/athlete/verify-email/` - Email verification ✅
- `POST /api/athlete/send-code/` - Send verification code ✅

## 🔄 API STRUCTURE IMPLEMENTED

```
src/api/
├── auth/
│   ├── api-calls.ts (UPDATED with new endpoints)
│   ├── hooks.ts (UPDATED with new hooks)
│   └── index.ts
├── athletes/
│   ├── api-calls.ts (UPDATED with registration flow)
│   ├── hooks.ts (UPDATED with new hooks)
│   └── index.ts
├── companies/ (existing)
├── confidences/ (existing)
├── professional/ (NEW)
│   ├── api-calls.ts
│   ├── hooks.ts
│   └── index.ts
├── verification/ (NEW)
│   ├── api-calls.ts
│   ├── hooks.ts
│   └── index.ts
└── index.ts (UPDATED to export all modules)
```

## 📊 BACKEND ENDPOINTS TO IMPLEMENT

Based on the specification, the backend needs to implement these endpoints:

### Authentication Endpoints
- ✅ `POST /api/auth/select-account-type/`
- ✅ `POST /api/auth/oubli-mdp/`
- ✅ `POST /api/auth/reinitialisation-mdp/`

### Professional Registration
- ✅ `POST /api/professionnel/informations/`
- ✅ `POST /api/professionnel/localisation/`
- ✅ `POST /api/professionnel/description/`
- ✅ `GET /api/professionnel/profil/<id>/`

### Athlete Registration
- ✅ `POST /api/athlete/situation/`
- ✅ `POST /api/athlete/type/`
- ✅ `POST /api/athlete/club/`
- ✅ `POST /api/athlete/projet-pro/`
- ✅ `POST /api/athlete/profil/`
- ✅ `POST /api/athlete/account/`
- ✅ `POST /api/athlete/verify-email/`
- ✅ `POST /api/athlete/send-code/`

## 🎯 USAGE EXAMPLES

```typescript
// Professional registration flow
import { 
  useSaveCompanyInformation,
  useSaveCompanyLocation,
  useSaveCompanyDescription,
  useCreateProfessionalAccount 
} from '@/api/professional'

// Athlete registration flow
import {
  useSaveAthleteSituation,
  useSaveAthleteType,
  useSaveAthleteClub,
  useSaveAthleteProject,
  useSaveAthleteProfile,
  useCreateAthleteAccount
} from '@/api/athletes'

// Email verification
import {
  useVerifyEmail,
  useSendVerificationCode
} from '@/api/verification'

// Enhanced auth
import {
  useSelectAccountType,
  useForgotPassword,
  useResetPassword
} from '@/api/auth'
```

## ✅ STATUS: READY FOR BACKEND IMPLEMENTATION

All frontend API calls and hooks are now implemented according to the endpoint specification. The backend team can now implement the corresponding endpoints to complete the registration flows.