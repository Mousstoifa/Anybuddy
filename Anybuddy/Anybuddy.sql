CREATE TABLE User(
   IdUtilisateur INT not null ,
   Nom VARCHAR(100),
   Prenom VARCHAR(100),
   Email VARCHAR(50),
   Mdp VARCHAR(50),
   adresse Varchar(100),
   Ville Varchar(50),
   CodePostal Varchar(50),
   Role VARCHAR(50),
   PRIMARY KEY(IdUtilisateur)
) ENGINE=InnoDB;

CREATE TABLE `Terrain`(
   IdTerrain INT,
   Nom_Equipe VARCHAR(50),
   Couleur_Equipe VARCHAR(50),
   PRIMARY KEY(IdTerrain)
)ENGINE=InnoDB;

CREATE TABLE `TypeTerrain`(
   IdTypeTerrain INT,
   Libelle VARCHAR(50),
   Description VARCHAR(200),
   NbPersonne VARCHAR(50),
   PRIMARY KEY(IdTypeTerrain)
)ENGINE=InnoDB;

CREATE TABLE `Match`(
   IdMatch INT,
   DateMAtch DATETIME,
   NomMatch VARCHAR(50),
   IdTerrain INT NOT NULL,
   PRIMARY KEY(IdMatch),
   FOREIGN KEY(IdTerrain) REFERENCES Terrain(IdTerrain)
)ENGINE=InnoDB;

** table equipe pas cree 
CREATE TABLE `Equipe`(
   IdEquipe INT,
   NomEquipe VARCHAR(200),
   IdUtilisateur VARCHAR(50) NOT NULL,
   PRIMARY KEY(IdEquipe),
   FOREIGN KEY(IdUtilisateur) REFERENCES User(IdUtilisateur)
)ENGINE=InnoDB;

CREATE TABLE `Notification`(
   IdNotification INT,
   Message VARCHAR(255),
   DateNotification DATE,
   PRIMARY KEY(IdNotification)
)ENGINE=InnoDB;

CREATE TABLE `Disponibilité`(
   IdDisponibilité INT,
   DateDebut TIME,
   DateFin TIME,
   IdTerrain INT NOT NULL,
   PRIMARY KEY(IdDisponibilité),
   FOREIGN KEY(IdTerrain) REFERENCES Terrain(IdTerrain)
)ENGINE=InnoDB;

CREATE TABLE `Joueur`(
   IdJoueur INT,
   Poste VARCHAR(50),
   PRIMARY KEY(IdJoueur)
)ENGINE=InnoDB;

CREATE TABLE `Reservation`(
   IdReservation INT,
   Horaire DATETIME,
   Duree TIME,
   Prix DECIMAL(3,2),
   IdDisponibilité INT NOT NULL,
   PRIMARY KEY(IdReservation),
   UNIQUE(IdDisponibilité),
   FOREIGN KEY(IdDisponibilité) REFERENCES Disponibilité(IdDisponibilité)
)ENGINE=InnoDB;

CREATE TABLE `Paiement`(
   IdPaiement INT,
   IdReservation INT,
   Montant DECIMAL(3,2),
   Mode_Paiement VARCHAR(50),
   DatePaiement DATETIME,
   PRIMARY KEY(IdPaiement),
   FOREIGN KEY(IdReservation) REFERENCES Reservation(IdReservation)
)ENGINE=InnoDB;
   



    -- a partir de ici les table ne sont pas cree trouvez une solution
CREATE TABLE `RELIER`(
   IdTerrain INT,
   IdTypeTerrain VARCHAR(50),
   PRIMARY KEY(IdTerrain, IdTypeTerrain),
   FOREIGN KEY(IdTerrain, IdTypeTerrain)
   FOREIGN KEY REFERENCES Terrain(IdTerrain),
   FOREIGN KEY(IdTypeTerrain) REFERENCES TypeTerrain(IdTypeTerrain)
)ENGINE=InnoDB;

CREATE TABLE `Reçevoir`(
   IdUtilisateur INT,
   IdNotification INT,
   PRIMARY KEY(IdUtilisateur, IdNotification),
   FOREIGN KEY(IdUtilisateur) REFERENCES User(IdUtilisateur),
   FOREIGN KEY(IdNotification) REFERENCES Notification(IdNotification)
);

CREATE TABLE `Reserver`(
   IdUtilisateur INT,
   IdReservation INT,
   PRIMARY KEY(IdUtilisateur, IdReservation),
   FOREIGN KEY(IdUtilisateur) REFERENCES User(IdUtilisateur),
   FOREIGN KEY(IdReservation) REFERENCES reservation(IdReservation)
)ENGINE=InnoDB;

CREATE TABLE `Obtenir`(
   IdEquipe INT,
   IdJoueur INT,
   PRIMARY KEY(IdEquipe, IdJoueur),
   FOREIGN KEY(IdEquipe) REFERENCES Equipe(IdEquipe),
   FOREIGN KEY(IdJoueur) REFERENCES Joueur(IdJoueur)
)ENGINE=InnoDB;


CREATE TABLE `scores`(
   IdMatch INT,
   IdEquipe INT,
   points INT,
   PRIMARY KEY(IdMatch, IdEquipe),
   FOREIGN KEY(IdMatch) REFERENCES `Match`(IdMatch),
   FOREIGN KEY(IdEquipe) REFERENCES `Equipe`(IdEquipe)
)ENGINE=InnoDB;


