# Cahier des charges pour le développement d’un backend d’application de gestion de vocaux

## 1. Objectifs de la mission
Développer et déployer le backend d’une application permettant à des utilisateurs d’enregistrer, stocker, consulter et partager des messages vocaux. La solution comprendra l’ensemble des fonctionnalités backend nécessaires à la gestion des utilisateurs, des vocaux, de leur stockage, de leur traitement audio, ainsi que des interactions entre utilisateurs. Le projet inclura également le déploiement complet de l’infrastructure sur AWS.

## 2. Technologies retenues

| Composant            | Technologie                                                                  |
| -------------------- | ---------------------------------------------------------------------------- |
| Composant            | Technologie                                                                  |
| Langage              | Python                                                                       |
| Framework            | Django 5.X + Django REST Framework (DRF)                                     |
| Base de données      | PostgreSQL (hébergée sur AWS RDS)                                            |
| Stockage de fichiers | AWS S3 (fichiers audio et images)                                            |
| Authentification     | JSON Web Token (JWT)                                                         |
| Infrastructure       | AWS (EC2, RDS, S3, IAM, VPC)                                                 |
| Déploiement infra    | Terraform                                                                    |
| Frontend cible       | React Native (intégration facilitée via utilitaires TypeScript auto-générés) |

## 3. Fonctionnalités

### 3.1 Authentification et gestion des comptes
Le système d’authentification repose sur des tokens JWT. Les informations utilisateur sont conservées en base, avec gestion des sessions entièrement côté client.
API REST :

- POST /auth/register/ – Création de compte
- POST /auth/login/ – Authentification, retour du token
- POST /auth/logout/ – Invalidation du token côté client
- GET /auth/profile/ – Informations du compte connecté
- PUT /auth/profile/ – Modification du compte

Pour chaque route, une fonction utilitaire TypeScript et un type TS associé seront générés pour simplifier l’intégration dans un frontend React Native.

### 3.2 Enregistrement et gestion des vocaux
Les utilisateurs peuvent enregistrer des vocaux de maximum 1 heure appelés confidences, et choisir de les publier en mode public ou privé. Il est également possible d'appliquer un filtre vocal robotisé. Chaque vocal est accompagné de métadonnées.
Métadonnées :

- Titre (string, 255 caractères)
- Description (texte)
- Catégorie (string, parmi une liste définie)
- Image de couverture (upload)
- Visibilité (public / privé)
- Modification vocale (booléen)
- Durée (calculée automatiquement)

API REST :

- POST /confidence/ – Création d’un vocal (envoi stream + métadonnées)
- PUT /confidence/{id}/ – Mise à jour d’un vocal
- DELETE /auconfidencedios/{id}/ – Suppression
- GET /confidence/{id}/ – Détail
- GET /confidence/ – Liste des vocaux disponibles

Filtres disponibles sur GET /confidence/ :

- ?category=...
- ?title_contains=...
- ?owner_id=...
- ?liked=true

Chaque endpoint viendra avec une fonction utilitaire TypeScript et les types correspondants pour consommation React Native.

### 3.3 Lecture et diffusion des vocaux
L'écoute des vocaux se fera par streaming sécurisé, en fonction du niveau de confidentialité du vocal. Une URL temporairement signée sera générée depuis AWS S3.
API REST :

- GET /confidence/{id}/stream-url/ – Génère une URL de streaming S3 signée

### 3.4 Interaction utilisateur (likes)
Les utilisateurs peuvent liker ou retirer leur like sur un vocal.
API REST :

- POST /confidence/{id}/like/ – Ajout d’un like
- DELETE /confidence/{id}/like/ – Suppression du like

### 3.5 Commentaires et likes de commentaires
Chaque vocal peut être commenté par les utilisateurs authentifiés. Les commentaires sont affichés par ordre chronologique (du plus récent au plus ancien).
Chaque commentaire peut à son tour être liké, selon une logique similaire aux vocaux.
Données associées à un commentaire :

- Contenu du commentaire (texte, max 1000 caractères)
- Date de création
- Auteur (utilisateur)
- Nombre de likes

API REST – Commentaires :

- POST /confidence/{audio_id}/comments/ — Création d’un commentaire
- GET /confidence/{audio_id}/comments/ — Liste paginée des commentaires du vocal
	- Filtres disponibles :
		- ?ordering=newest|oldest
		- ?liked=true (récupérer uniquement les commentaires likés par l’utilisateur connecté)
- DELETE /confidence/{id}/ — Suppression d’un commentaire (par l’auteur ou admin)

API REST – Likes de commentaires :

- POST /confidence/{id}/like/ — Ajout d’un like sur un commentaire
- DELETE /confidence/{id}/like/ — Suppression du like

Comme pour le reste de l’API, chaque route disposera de sa fonction utilitaire TypeScript et de types stricts générés automatiquement pour une intégration fluide avec un frontend React Native.

### 3.6 Administration des catégories
Les catégories sont définies et modifiables par des administrateurs via l’interface d’administration Django. Ces catégories servent à classifier les vocaux et à améliorer la recherche.

### 3.7 Interface d’administration (backend)
Une interface d’administration sera automatiquement générée via Django Admin, avec sécurisation de l’accès par rôle administrateur. Elle permettra de :

- Gérer les utilisateurs
- Gérer les vocaux (filtrage, suppression, audit)
- Gérer les likes
- Gérer les catégories
- Visualiser les logs système (si activé)

## 4. Sécurité

### 4.1 Authentification & transport

- Authentification JWT, stateless, avec vérification de token à chaque requête
- Toutes les communications se feront via HTTPS
- Middleware Django activés : CORS, CSRF, X-Frame-Options

### 4.2 Stockage et permissions

- Les fichiers audio et images sont stockés sur S3 avec politiques d’accès configurées dynamiquement selon la visibilité des vocaux.
- Les URL de streaming sont temporaires et signées (expirent automatiquement).

### 4.3 Architecture réseau

- La base de données PostgreSQL sera hébergée dans un sous-réseau privé, inaccessible depuis Internet.
- Le backend sera le seul composant autorisé à interagir avec la base.
- Les accès AWS seront limités via IAM au principe du moindre privilège.

## 5. Déploiement et infrastructure
L’ensemble de l’infrastructure sera provisionné via Terraform sur AWS. Un environnement unique de développement sera mis en place pour cette mission.
Services déployés :

- EC2 : Hébergement du backend Django
- RDS PostgreSQL : Stockage relationnel des métadonnées
- S3 : Stockage des fichiers audio et images
- IAM : Gestion fine des permissions
- VPC : Isolation réseau
Environnement unique :

- Un seul environnement déployé, incluant l’ensemble des services ci-dessus.
- Prise en charge du déploiement initial, configuration, et documentation des accès.

## 6. Intégration frontend
Pour faciliter l’intégration dans un frontend mobile développé en React Native, chaque endpoint REST exposé sera accompagné de :

- Une fonction d’appel utilitaire en TypeScript
- Un type TypeScript strictement typé, dérivé du schéma de réponse
Cette approche permettra au frontend :

- De disposer de typage fort à l’exécution
- De centraliser l’accès à l’API sans connaitre ses spécificités
- D'éviter toute redondance dans la définition des schémas de données

## 7. Livrables

- Code source complet du backend DJANGO
- Code source de l’infrastructure Terraform
- Documentation API complète (format OpenAPI/Swagger)
- Génération des types et fonctions API pour React Native
- Accès à l’environnement de production sur AWS
- Documentation d’installation et d’utilisation
- Interface admin opérationnelle
