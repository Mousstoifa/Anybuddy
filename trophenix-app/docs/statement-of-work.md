# Application de recrutement pour sportifs qui cherche un travail 
**Sortie : 15 Octobre, V1**

## 1. Contexte & Vision

De nombreux sportifs de haut niveau souhaitent travailler en parallèle ou après leur carrière sportive. Ils n'ont pas encore développé toutes les compétences nécessaires pour intégrer le marché du travail classique. L'objectif de cette application est de faciliter leur recherche professionnelle en mettant en relation :

- **Les sportifs** cherchant à se repositionner sur le marché de l'emploi et souhaitant rencontrer et échanger avec d'autres sportifs en reconversion.
- **Les entreprises** ouvertes à recruter ces profils atypiques et valoriser leur discipline, leur résilience et leur esprit d'équipe.

L'application propose une plateforme simple et sécurisée permettant de créer des profils détaillés, de publier des offres, et de faciliter la mise en relation entre sportifs et entreprises, tout en garantissant la vérification manuelle de chaque profil par un administrateur pour renforcer la confiance et l'intimité sur la plateforme.

## 2. Objectifs

- Offrir aux sportifs un espace pour valoriser leurs expériences, leurs réussites et leurs aspirations.
- Permettre aux sportifs de rencontrer et d'échanger avec d'autres sportifs en recherche de travail.
- Permettre aux entreprises de trouver des profils uniques pour leurs besoins en recrutement.
- Assurer la confidentialité et l'intimité de la plateforme en modérant et validant chaque profil inscrit afin de gagner la confiance des sportifs.

## 3. Fonctionnalités principales (V1)

### A. Gestion des profils

**Sportifs :** création d'un profil détaillé après inscription (login/mot de passe), incluant : informations personnelles, sport, palmarès, historique professionnel, zone géographique, objectifs professionnels, diplôme.

**Entreprises :** création d'un profil entreprise avec description, logo, accès au contact expert de Trophenix (permet d'accompagner les entreprises dans leur recherche de talent (si on a le temps: coordonnées RH, et offres d'emploi publiées).

**Validation manuelle :** chaque profil (sportif ou entreprise) est vérifié et validé par un administrateur avant d'être visible sur la plateforme. Un message s'affiche à l'utilisateur : *"Votre profil est en attente de validation par un administrateur."*

### B. Parcours et navigation

**Tunnel d'inscription :** après création du compte, l'utilisateur choisit son type de profil (sportif ou entreprise) et complète le formulaire correspondant.

**Liste de profils sportifs :** accessible uniquement après validation du profil. Permet de filtrer par sport, domaine souhaité, localisation et disponibilité.

**Page détail sportif :** affichage complet du profil sportif validé. Comprend un bouton "Contacter" qui révèle l'adresse email du sportif pour permettre la prise de contact. Accessible par les entreprises et sportifs.

> **Si on a le temps :** Filtrage et recherche : filtres disponibles (sport, domaine, localisation, expérience, disponibilité) et sportifs (offres, secteurs, localisation).

## Spécifications détaillées

| Page / Module | Feature | Description détaillée | Priorité |
|---------------|---------|----------------------|----------|
| **Page d'accueil (Landing page)** | Présentation plateforme | Texte expliquant la mission : accompagner la transition des sportifs vers le monde professionnel. | Haute |
| | Call-to-Action | Boutons : Créer un compte, Se connecter. | Haute |
| | Mentions légales / RGPD | Lien en bas de page (footer). | Haute |
| **Login** | Connexion | Champs email + mot de passe. | Haute |
| | Messages d'erreur | Gestion des cas : identifiants incorrects, comptes inexistants. | Haute |
| **Inscription – Étape 1** | Création du compte | Création d'un compte générique login / mot de passe + email. | Haute |
| **Inscription – Étape 2** | Choix du type de profil | Après login, l'utilisateur choisit : Sportif ou Entreprise. | Haute |
| **Inscription – Tunnel Sportif** | Formulaire profil sportif | - Nom, prénom<br>- Numéro Téléphone<br>- Photo de profil<br>- Sport pratiqué + niveau<br>- Palmarès / réussites<br>- Historique professionnel<br>- Zone géographique<br>- Domaine souhaité, type de poste, disponibilité<br>- Diplômes et formations | Haute |
| | Message de validation | Une fois le formulaire complété, afficher : "Votre profil est en attente de validation par un administrateur." | Haute |
| **Inscription – Tunnel Entreprise** | Formulaire profil entreprise | - Nom de l'entreprise<br>- Logo (optionnel)<br>- Secteur d'activité<br>- Taille et localisation<br>- Email / contact RH<br>- Description de l'entreprise | Haute |
| | Message de validation | Même message que pour les sportifs : "Votre profil est en attente de validation par un administrateur." | Haute |
| **Validation Admin** | Activation profil | L'administrateur peut valider ou refuser un profil sportif ou entreprise. Contact manuel par mail pour prévenir la personne. | Haute |
| **Liste profils sportifs** | Consultation liste | Une fois validé, chaque utilisateur (sportif ou entreprise) peut parcourir la liste des profils sportifs validés. | Haute |
| | Filtrage | Par sport, domaine souhaité, localisation, disponibilité. | Moyenne |
| **Page détail sportif** | Affichage profil | Nom, photo, sport, palmarès, résumé professionnel, domaine souhaité, diplômes, localisation, disponibilité. | Haute |
| | Bouton "Contacter" | Affiche l'email du sportif après clic, afin que l'entreprise ou autre sportif puisse contacter directement. L'évènement sera sauvegardé en base de données afin de construire un KPI. | Haute |
| **Liste entreprise** | En attente de DEV | Mettre l'option liste d'offre (mais avec un message sortie le 3 novembre) | Haute |
| **Fonctionnalités transverses** | Sécurité & RGPD | Consentement inscription, suppression compte, gestion données personnelles. | Haute |
| | Responsive design | Application mobile prioritaire, site web adaptatif. | Haute |
| | Back-office admin (MVP) | Validation/refus des profils, possibilité de voir la liste des comptes en attente. | Haute |

> **Note :** Il manque l'intégration des validations Cookie + RGPD + Conditions générales d'utilisation

## 4. KPIs

- Nombre de sportifs inscrits
- Nombre d'entreprises inscrites
- Nombre de contact effectués
