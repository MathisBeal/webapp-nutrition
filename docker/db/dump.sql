-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: nutrition_webapp
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE = @@TIME_ZONE */;
/*!40103 SET TIME_ZONE = '+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS = 0 */;
/*!40101 SET @OLD_SQL_MODE = @@SQL_MODE, SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES = @@SQL_NOTES, SQL_NOTES = 0 */;

--
-- Table structure for table `Aliments`
--

DROP TABLE IF EXISTS `Aliments`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Aliments`
(
  `ID_aliment`    int                                                           NOT NULL AUTO_INCREMENT,
  `nom`           varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantite_base` int                                                           NOT NULL,
  `unite`         varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci  NOT NULL,
  `calories`      decimal(10, 2)                                                NOT NULL,
  `glucides`      decimal(10, 2)                                                NOT NULL,
  `lipides`       decimal(10, 2)                                                NOT NULL,
  `proteines`     decimal(10, 2)                                                NOT NULL,
  `image`         text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`ID_aliment`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 81
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Aliments`
--

LOCK TABLES `Aliments` WRITE;
/*!40000 ALTER TABLE `Aliments`
  DISABLE KEYS */;
INSERT INTO `Aliments`
VALUES (1, 'Pomme', 1, 'pièce', 52.00, 14.00, 0.20, 0.30, 'image_pomme.jpg'),
       (2, 'Banane', 1, 'pièce', 96.00, 22.00, 0.30, 1.20, 'image_banane.jpg'),
       (3, 'Orange', 1, 'pièce', 47.00, 12.00, 0.10, 0.90, 'image_orange.jpg'),
       (4, 'Carotte', 100, 'g', 41.00, 10.00, 0.20, 0.90, 'image_carotte.jpg'),
       (5, 'Tomate', 100, 'g', 18.00, 3.90, 0.20, 0.90,
        'https://media.istockphoto.com/id/2164745442/photo/tomato-on-white.jpg?b=1&s=612x612&w=0&k=20&c=7PDmAVhBAwNfo9r1SNraixtwwo58zJG5Oe8DGhyQFr4='),
       (6, 'Brocoli', 100, 'g', 55.00, 6.00, 0.60, 4.00, 'image_brocoli.jpg'),
       (7, 'Lait (entier)', 100, 'ml', 64.00, 4.80, 3.60, 3.30, 'image_lait.jpg'),
       (8, 'Yaourt nature', 100, 'g', 63.00, 4.00, 3.50, 5.00, 'image_yaourt.jpg'),
       (9, 'Pâtes (crues)', 100, 'g', 350.00, 72.00, 1.50, 12.00,
        'https://media.istockphoto.com/id/168492383/photo/pasta-tubes-penne.jpg?b=1&s=612x612&w=0&k=20&c=yk-SE_xi5wrsBFtr3asGVoqD--OQeYJBmo88bfufiE0='),
       (10, 'Riz (basmati)', 100, 'g', 365.00, 80.00, 0.50, 7.10, 'image_riz.jpg'),
       (11, 'Riz (complet)', 100, 'g', 370.00, 77.00, 2.90, 7.90, 'image_riz_complet.jpg'),
       (12, 'Huile d\'olive', 10, 'ml', 90.00, 0.00, 10.00, 0.00,
        'https://media.istockphoto.com/id/1341249523/photo/extra-virgin-olive-oil-on-white.jpg?b=1&s=612x612&w=0&k=20&c=vk5qAYpWOkppgHiSpLjJgzdkn-nTKqh95YxiAo1XFhA='),
       (13, 'Beurre', 10, 'g', 75.00, 0.00, 8.00, 0.10, 'image_beurre.jpg'),
       (14, 'Sel', 1, 'g', 0.00, 0.00, 0.00, 0.00, 'image_sel.jpg'),
       (15, 'Poivre', 1, 'g', 251.00, 64.00, 3.30, 10.00,
        'https://media.istockphoto.com/id/171329660/photo/dried-herb-and-spices-black-pepper.jpg?b=1&s=612x612&w=0&k=20&c=9UsEc-43moo56FEqJGYl_ib_euvtJkpi1sPtRyEiOUg='),
       (16, 'Poulet (cuit)', 100, 'g', 165.00, 0.00, 3.60, 31.00, 'image_poulet.jpg'),
       (17, 'Saumon (cru)', 100, 'g', 206.00, 0.00, 13.00, 20.00, 'image_saumon.jpg'),
       (18, 'Bœuf (haché)', 100, 'g', 250.00, 0.00, 18.00, 26.00,
        'https://img-3.journaldesfemmes.fr/SFp-8xzyuMZZLC59bRuGHZvoohQ=/1500x/smart/a9e53b751f6a47748c6dd5b64c93a8af/ccmcms-jdf/35554472.jpg'),
       (19, 'Pain (blanc)', 100, 'g', 265.00, 49.00, 3.20, 9.00, 'image_pain_blanc.jpg'),
       (20, 'Pain (complet)', 100, 'g', 250.00, 45.00, 3.00, 9.50, 'image_pain_complet.jpg'),
       (21, 'Oeuf', 1, 'pièce', 68.00, 0.60, 4.80, 5.50, 'image_oeuf.jpg'),
       (22, 'Lentilles (cuites)', 100, 'g', 116.00, 20.00, 0.40, 9.00, 'image_lentilles.jpg'),
       (23, 'Pois chiches (cuits)', 100, 'g', 164.00, 27.00, 2.60, 8.90, 'image_pois_chiches.jpg'),
       (24, 'Avoine (flocons)', 100, 'g', 389.00, 66.00, 7.00, 16.00, 'image_avoine.jpg'),
       (25, 'Pomme de terre (cuite)', 100, 'g', 77.00, 17.00, 0.10, 2.00, 'image_pomme_de_terre.jpg'),
       (26, 'Courgette', 100, 'g', 17.00, 3.10, 0.10, 1.20, 'image_courgette.jpg'),
       (27, 'Épinards (cuits)', 100, 'g', 23.00, 3.60, 0.30, 2.90, 'image_epinards.jpg'),
       (28, 'Chou-fleur (cuit)', 100, 'g', 23.00, 4.10, 0.30, 1.80, 'image_chou_fleur.jpg'),
       (29, 'Fromage (emmental)', 100, 'g', 402.00, 1.50, 33.00, 29.00, 'image_fromage_emmental.jpg'),
       (30, 'Fromage (chèvre)', 100, 'g', 364.00, 2.00, 30.00, 21.00, 'image_fromage_chevre.jpg'),
       (31, 'Thon (en conserve)', 100, 'g', 116.00, 0.00, 1.00, 26.00, 'image_thon.jpg'),
       (32, 'Crevettes (crues)', 100, 'g', 99.00, 0.00, 0.30, 24.00, 'image_crevettes.jpg'),
       (33, 'Chocolat noir (70%)', 100, 'g', 598.00, 45.00, 42.00, 7.50, 'image_chocolat_noir.jpg'),
       (34, 'Sucre blanc', 100, 'g', 400.00, 100.00, 0.00, 0.00, 'image_sucre_blanc.jpg'),
       (35, 'Miel', 100, 'g', 304.00, 82.00, 0.00, 0.30, 'image_miel.jpg'),
       (36, 'Jus d\'orange', 100, 'g', 45.00, 10.00, 0.20, 0.70, 'image_jus_orange.jpg'),
       (37, 'Noix (crues)', 100, 'g', 654.00, 13.70, 65.00, 15.00, 'image_noix.jpg'),
       (38, 'Amandes (crues)', 100, 'g', 576.00, 21.60, 49.90, 21.20, 'image_amandes.jpg'),
       (39, 'Pistaches (crues)', 100, 'g', 562.00, 27.00, 45.00, 20.00, 'image_pistaches.jpg'),
       (40, 'Avocat', 100, 'pièce', 160.00, 9.00, 15.00, 2.00, 'image_avocat.jpg'),
       (41, 'Courge (1 tranche)', 1, 'g', 50.00, 12.00, 0.20, 1.10, 'image_courge.jpg'),
       (42, 'Haricots verts (100 g)', 100, 'g', 31.00, 7.00, 0.20, 1.80, 'image_haricots_verts.jpg'),
       (43, 'Betterave (1 pièce)', 1, 'g', 43.00, 10.00, 0.10, 1.20, 'image_betterave.jpg'),
       (44, 'Radis (1 pièce)', 1, 'g', 16.00, 3.40, 0.10, 0.70, 'image_radis.jpg'),
       (45, 'Poireau (1 pièce)', 1, 'g', 61.00, 14.00, 0.30, 1.50, 'image_poireau.jpg'),
       (46, 'Fenouil (1 bulbe)', 1, 'g', 31.00, 7.30, 0.20, 1.20, 'image_fenouil.jpg'),
       (47, 'Patate douce (100 g)', 100, 'g', 86.00, 20.00, 0.10, 1.60, 'image_patate_douce.jpg'),
       (48, 'Aubergine (1 pièce)', 1, 'g', 25.00, 5.90, 0.20, 1.00, 'image_aubergine.jpg'),
       (49, 'Poivron rouge (1 pièce)', 1, 'pièce', 31.00, 6.00, 0.30, 1.00, 'image_poivron_rouge.jpg'),
       (50, 'Céleri branche (1 branche)', 1, 'g', 7.00, 1.50, 0.05, 0.30, 'image_celeri.jpg'),
       (51, 'Champignon (1 pièce)', 1, 'g', 3.00, 0.50, 0.05, 0.40, 'image_champignon.jpg'),
       (52, 'Pois cassés (100 g)', 100, 'g', 117.00, 21.00, 0.40, 8.00, 'image_pois_casses.jpg'),
       (53, 'Tapioca (100 g)', 100, 'g', 358.00, 88.00, 0.10, 0.20, 'image_tapioca.jpg'),
       (54, 'Quinoa (100 g)', 100, 'g', 120.00, 21.30, 1.90, 4.10, 'image_quinoa.jpg'),
       (55, 'Blé (100 g)', 100, 'g', 121.00, 25.00, 0.50, 3.60, 'image_ble.jpg'),
       (56, 'Fromage (parmesan, 100 g)', 100, 'g', 431.00, 4.10, 29.00, 38.00, 'image_parmesan.jpg'),
       (57, 'Fromage (roquefort, 100 g)', 100, 'g', 369.00, 2.00, 31.00, 21.00, 'image_roquefort.jpg'),
       (58, 'Fromage blanc 0% (100 g)', 100, 'g', 46.00, 4.00, 0.20, 8.00, 'image_fromage_blanc.jpg'),
       (59, 'Sardines (100 g)', 100, 'g', 208.00, 0.00, 11.00, 25.00, 'image_sardines.jpg'),
       (60, 'Maquereau (100 g)', 100, 'g', 205.00, 0.00, 13.80, 19.00, 'image_maquereau.jpg'),
       (61, 'Crabe (100 g)', 100, 'g', 82.00, 0.00, 1.10, 17.00, 'image_crabe.jpg'),
       (62, 'Dinde (100 g)', 100, 'g', 155.00, 0.00, 2.00, 29.00, 'image_dinde.jpg'),
       (63, 'Porc (100 g)', 100, 'g', 143.00, 0.00, 5.00, 21.00, 'image_porc.jpg'),
       (64, 'Agneau (100 g)', 100, 'g', 230.00, 0.00, 16.00, 20.00, 'image_agneau.jpg'),
       (65, 'Pintade (100 g)', 100, 'g', 162.00, 0.00, 7.50, 22.00, 'image_pintade.jpg'),
       (66, 'Céréales (100 g)', 100, 'g', 389.00, 65.00, 6.00, 10.00, 'image_muesli.jpg'),
       (67, 'Compote de pommes (100 g)', 100, 'g', 68.00, 16.00, 0.10, 0.30, 'image_compote_pommes.jpg'),
       (68, 'Gelée de fruits (100 g)', 100, 'g', 252.00, 62.00, 0.00, 0.00, 'image_gelee_fruits.jpg'),
       (69, 'Sorbet (100 g)', 100, 'g', 120.00, 30.00, 0.10, 0.20, 'image_sorbet_citron.jpg'),
       (70, 'Chips (100 g)', 100, 'g', 536.00, 50.00, 35.00, 6.30, 'image_chips.jpg'),
       (71, 'Biscottes (100 g)', 100, 'g', 421.00, 70.00, 8.50, 11.00, 'image_biscottes.jpg'),
       (72, 'Confiture de fraises (100 g)', 100, 'g', 250.00, 65.00, 0.10, 0.40, 'image_confiture_fraises.jpg'),
       (73, 'Beurre de cacahuète (100 g)', 100, 'g', 589.00, 19.60, 50.00, 25.00, 'image_beurre_cacahuete.jpg'),
       (74, 'Crème fraîche (100 ml)', 100, 'ml', 292.00, 3.00, 30.00, 2.40, 'image_creme_fraiche.jpg'),
       (75, 'Lait d amande (100 ml)', 100, 'ml', 17.00, 0.30, 1.00, 0.60, 'image_lait_amande.jpg'),
       (76, 'Lait de coco (100 ml)', 100, 'ml', 230.00, 6.00, 24.00, 2.30, 'image_lait_coco.jpg'),
       (77, 'Tofu (100 g)', 100, 'g', 144.00, 1.90, 8.00, 15.00, 'image_tofu.jpg'),
       (78, 'Seitan (100 g)', 100, 'g', 120.00, 6.00, 1.00, 21.00, 'image_seitan.jpg'),
       (79, 'Tempeh (100 g)', 100, 'g', 195.00, 9.40, 11.00, 20.00, 'image_tempeh.jpg'),
       (80, 'Laitue (1 feuille)', 1, 'feuille', 5.00, 1.00, 0.05, 0.30, 'image_laitue.jpg');
/*!40000 ALTER TABLE `Aliments`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Day_Sections`
--

DROP TABLE IF EXISTS `Day_Sections`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Day_Sections`
(
  `ID_moments` int                                                           NOT NULL AUTO_INCREMENT,
  `nom`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID_moments`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 6
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Day_Sections`
--

LOCK TABLES `Day_Sections` WRITE;
/*!40000 ALTER TABLE `Day_Sections`
  DISABLE KEYS */;
INSERT INTO `Day_Sections`
VALUES (1, 'Petit déjeuner'),
       (2, 'Déjeuner'),
       (3, 'Goûter'),
       (4, 'Dîner'),
       (5, 'Grignotage');
/*!40000 ALTER TABLE `Day_Sections`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `IMC_apports`
--

DROP TABLE IF EXISTS `IMC_apports`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `IMC_apports`
(
  `imc_min`   decimal(10, 2) NOT NULL,
  `imc_max`   decimal(10, 2) NOT NULL,
  `calories`  decimal(10, 2) NOT NULL,
  `eau`       decimal(10, 2) NOT NULL,
  `glucides`  decimal(10, 2) NOT NULL,
  `lipides`   decimal(10, 2) NOT NULL,
  `proteines` decimal(10, 2) NOT NULL,
  PRIMARY KEY (`imc_min`, `imc_max`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `IMC_apports`
--

LOCK TABLES `IMC_apports` WRITE;
/*!40000 ALTER TABLE `IMC_apports`
  DISABLE KEYS */;
INSERT INTO `IMC_apports`
VALUES (0.00, 16.40, 2800.00, 3.70, 350.00, 124.40, 105.00),
       (16.50, 17.90, 2700.00, 3.70, 337.50, 120.00, 101.25),
       (18.00, 18.40, 2600.00, 3.70, 325.00, 115.60, 97.50),
       (18.50, 19.90, 2500.00, 3.70, 312.50, 111.10, 93.75),
       (20.00, 21.40, 2400.00, 3.70, 300.00, 106.70, 90.00),
       (21.50, 22.90, 2300.00, 3.70, 287.50, 102.20, 86.25),
       (23.00, 24.40, 2200.00, 3.70, 275.00, 97.80, 82.50),
       (24.50, 25.90, 2100.00, 3.70, 262.50, 93.30, 78.75),
       (26.00, 27.40, 2000.00, 3.70, 250.00, 88.90, 75.00),
       (27.50, 28.90, 1900.00, 3.70, 237.50, 84.40, 71.25),
       (29.00, 30.40, 1800.00, 3.70, 225.00, 80.00, 67.50),
       (30.50, 31.90, 1700.00, 3.70, 212.50, 75.60, 63.75),
       (32.00, 33.40, 1600.00, 3.70, 200.00, 71.10, 60.00),
       (33.50, 34.90, 1500.00, 3.70, 187.50, 66.70, 56.25),
       (35.00, 36.40, 1400.00, 3.70, 175.00, 62.20, 52.50),
       (36.50, 40.00, 1300.00, 3.70, 162.50, 57.80, 48.75);
/*!40000 ALTER TABLE `IMC_apports`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ingredients_Recettes`
--

DROP TABLE IF EXISTS `Ingredients_Recettes`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Ingredients_Recettes`
(
  `ID_plat`                 int            NOT NULL,
  `ID_aliment`              int            NOT NULL,
  `multiplicateur_quantite` decimal(10, 2) NOT NULL,
  PRIMARY KEY (`ID_plat`, `ID_aliment`),
  KEY `fk_ingredient_de_recette_aliment` (`ID_aliment`),
  KEY `fk_ingredient_de_recette_plat` (`ID_plat`),
  CONSTRAINT `fk_ingredient_de_recette_aliment` FOREIGN KEY (`ID_aliment`) REFERENCES `Aliments` (`ID_aliment`),
  CONSTRAINT `fk_ingredient_de_recette_plat` FOREIGN KEY (`ID_plat`) REFERENCES `Plats` (`ID_plat`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ingredients_Recettes`
--

LOCK TABLES `Ingredients_Recettes` WRITE;
/*!40000 ALTER TABLE `Ingredients_Recettes`
  DISABLE KEYS */;
INSERT INTO `Ingredients_Recettes`
VALUES (1, 3, 1.00),
       (1, 5, 2.00),
       (1, 26, 2.00),
       (1, 28, 2.00),
       (1, 49, 1.00),
       (2, 16, 2.00),
       (2, 19, 1.00),
       (2, 29, 1.00),
       (2, 74, 1.00),
       (2, 80, 5.00),
       (3, 12, 1.00),
       (3, 15, 1.00),
       (3, 16, 3.00),
       (3, 45, 1.00),
       (3, 76, 1.00),
       (4, 5, 3.00),
       (4, 9, 1.00),
       (4, 12, 1.00),
       (4, 15, 1.00),
       (4, 18, 2.00),
       (5, 20, 1.00),
       (5, 26, 2.00),
       (5, 28, 1.00),
       (5, 40, 1.00),
       (5, 74, 1.00),
       (6, 3, 3.00),
       (6, 9, 3.00),
       (6, 26, 3.00),
       (6, 29, 2.00),
       (6, 74, 2.00),
       (7, 5, 2.00),
       (7, 12, 1.00),
       (7, 15, 1.00),
       (7, 41, 1.00),
       (7, 74, 1.00),
       (8, 1, 1.00),
       (8, 2, 1.00),
       (8, 34, 1.00),
       (8, 35, 1.00),
       (8, 75, 100.00),
       (9, 1, 3.00),
       (9, 9, 1.00),
       (9, 19, 2.00),
       (9, 35, 1.00),
       (9, 74, 2.00),
       (10, 17, 1.00),
       (10, 19, 1.00),
       (10, 26, 2.00),
       (10, 77, 2.00),
       (10, 80, 2.00);
/*!40000 ALTER TABLE `Ingredients_Recettes`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Plats`
--

DROP TABLE IF EXISTS `Plats`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Plats`
(
  `ID_plat`      int                                                           NOT NULL AUTO_INCREMENT,
  `duree`        varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description`  text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci         NOT NULL,
  `etapes`       text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci         NOT NULL,
  `images`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ID_categorie` int                                                           NOT NULL,
  PRIMARY KEY (`ID_plat`),
  KEY `fk_plat_categorie` (`ID_categorie`),
  KEY `Plats_duree_idx` (`duree`),
  CONSTRAINT `fk_plat_categorie` FOREIGN KEY (`ID_categorie`) REFERENCES `Plats_Categories` (`ID_categorie`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 11
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Plats`
--

LOCK TABLES `Plats` WRITE;
/*!40000 ALTER TABLE `Plats`
  DISABLE KEYS */;
INSERT INTO `Plats`
VALUES (1, '45 minutes', 'Ratatouille maison',
        '1. Coupez les légumes en morceaux. 2. Faites revenir l’oignon dans une poêle. 3. Ajoutez les légumes et laissez mijoter.',
        'https://img.hellofresh.com/f_auto,fl_lossy,q_auto,w_1200/hellofresh_s3/image/HF_Y24_R228_W32_FR_RFR22361-1_Main_low-6af90cb5.jpg',
        3),
       (2, '30 minutes', 'Salade César',
        '1. Préparez la sauce César. 2. Coupez le poulet en morceaux et faites-le griller. 3. Mélangez avec la laitue, les croûtons et le parmesan.',
        'https://img.hellofresh.com/f_auto,fl_lossy,q_auto,w_1200/hellofresh_s3/image/5ba8a97130006c3be559c7d2-6cea7001.jpg',
        2),
       (3, '60 minutes', 'Poulet curry coco',
        '1. Faites revenir les morceaux de poulet. 2. Ajoutez les épices et le lait de coco. 3. Laissez mijoter.',
        'https://img.hellofresh.com/f_auto,fl_lossy,q_auto,w_1200/hellofresh_s3/image/HF210621_R209_W32_FR_RFR29803761-1_MB_mainlow-d3697895.jpg',
        3),
       (4, '25 minutes', 'Spaghetti bolognaise',
        '1. Préparez la sauce bolognaise avec le bœuf haché. 2. Faites cuire les pâtes. 3. Mélangez et servez.',
        'https://img.hellofresh.com/f_auto,fl_lossy,q_auto,w_1200/hellofresh_s3/image/5c26420bc445fa3b9b724f93-6c496751.jpg',
        3),
       (5, '40 minutes', 'Quiche aux légumes',
        '1. Préparez la pâte brisée. 2. Mélangez les légumes et la crème. 3. Versez sur la pâte et enfournez.',
        'https://img.hellofresh.com/f_auto,fl_lossy,q_auto,w_1200/hellofresh_s3/image/HF200326_R08_W18_NL_R2297-1_KB_Main_low-290c9500.jpg',
        3),
       (6, '50 minutes', 'Lasagnes végétariennes',
        '1. Préparez la sauce tomate avec les légumes. 2. Disposez des couches de pâtes et de sauce. 3. Enfournez et laissez gratiner.',
        'https://img.hellofresh.com/f_auto,fl_lossy,h_640,q_auto,w_1200/hellofresh_s3/image/5ca75c93e3f33925c02fc522-e2dc0906.jpg',
        3),
       (7, '35 minutes', 'Soupe de potimarron',
        '1. Épluchez et coupez le potimarron en morceaux. 2. Faites-le cuire avec des épices. 3. Mixez et servez chaud.',
        'https://img.hellofresh.com/hellofresh_s3/image/HF_Y24_R210_W40_FR_RFR20080-1_Main_high-d4fd2e39.jpg', 3),
       (8, '25 minutes', 'Smoothie énergisant',
        '1. Mixez les fruits avec le lait d’amande et le miel. 2. Ajoutez les graines de chia et mélangez. 3. Servez frais.',
        'https://img.hellofresh.com/f_auto,fl_lossy,q_auto,w_1200/hellofresh_s3/image/HF220428_R3704_W25_CA_RAOSM155565-2_Add-On_KB_Main_low-8c7b777d.jpg',
        2),
       (9, '1h 10 minutes', 'Tarte aux pommes',
        '1. Préparez une pâte brisée. 2. Disposez les pommes tranchées sur la pâte. 3. Enfournez jusqu’à ce que les pommes soient dorées.',
        'https://img.hellofresh.com/f_auto,fl_lossy,q_auto,w_1200/hellofresh_s3/image/HF_Y24_R1517_W17_NL_BAK21781-1_Main_low-6c57f0e0.jpg',
        3),
       (10, '20 minutes', 'Wrap au saumon',
        '1. Étalez le fromage frais sur la tortilla. 2. Ajoutez le saumon, les légumes et enroulez. 3. Coupez en morceaux et servez.',
        'https://img.hellofresh.com/hellofresh_s3/image/HF220329_R4635_W17_NL_KC5435-1_Add_On_KB_Main_low-91f57f1f.jpg',
        2);
/*!40000 ALTER TABLE `Plats`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Plats_Categories`
--

DROP TABLE IF EXISTS `Plats_Categories`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Plats_Categories`
(
  `ID_categorie` int                                                           NOT NULL AUTO_INCREMENT,
  `nom`          varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`ID_categorie`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 6
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Plats_Categories`
--

LOCK TABLES `Plats_Categories` WRITE;
/*!40000 ALTER TABLE `Plats_Categories`
  DISABLE KEYS */;
INSERT INTO `Plats_Categories`
VALUES (1, 'Apéritif'),
       (2, 'Entrée'),
       (3, 'Plat principal'),
       (4, 'Déssert'),
       (5, 'Digéstif');
/*!40000 ALTER TABLE `Plats_Categories`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Restriction_Types`
--

DROP TABLE IF EXISTS `Restriction_Types`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Restriction_Types`
(
  `ID_restriction` int                                                           NOT NULL AUTO_INCREMENT,
  `nom`            varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `est_regime`     bool                                                          NOT NULL,
  PRIMARY KEY (`ID_restriction`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 17
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Restriction_Types`
--

LOCK TABLES `Restriction_Types` WRITE;
/*!40000 ALTER TABLE `Restriction_Types`
  DISABLE KEYS */;
INSERT INTO `Restriction_Types`
VALUES (1, 'Général', 1),
       (2, 'Végétarisme', 1),
       (3, 'Véganisme', 1),
       (4, 'Pescétarisme', 1),
       (5, 'Flexitarisme', 1),
       (6, 'Frugivorisme', 1),
       (7, 'Crudivorisme', 1),
       (8, 'Sans gluten', 0),
       (9, 'Sans lactose', 0),
       (10, 'Hyperprotéiné', 0),
       (11, 'Lactose', 0),
       (12, 'Arachides', 0),
       (13, 'Fruits à coque', 0),
       (14, 'Poisson', 0),
       (15, 'Fruit de mer', 0),
       (16, 'Légumineuse', 0);
/*!40000 ALTER TABLE `Restriction_Types`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Restrictions_aliments`
--

DROP TABLE IF EXISTS `Restrictions_aliments`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Restrictions_aliments`
(
  `ID_restriction` int NOT NULL,
  `ID_aliment`     int NOT NULL,
  PRIMARY KEY (`ID_restriction`, `ID_aliment`),
  KEY `fk_restriction_aliment` (`ID_aliment`),
  KEY `fk_restriction_restriction` (`ID_restriction`),
  CONSTRAINT `fk_restriction_aliment` FOREIGN KEY (`ID_aliment`) REFERENCES `Aliments` (`ID_aliment`),
  CONSTRAINT `fk_restriction_restriction` FOREIGN KEY (`ID_restriction`) REFERENCES `Restriction_Types` (`ID_restriction`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Restrictions_aliments`
--

LOCK TABLES `Restrictions_aliments` WRITE;
/*!40000 ALTER TABLE `Restrictions_aliments`
  DISABLE KEYS */;
INSERT INTO `Restrictions_aliments`
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (1, 4),
       (1, 5),
       (1, 6),
       (1, 7),
       (2, 7),
       (8, 7),
       (9, 7),
       (1, 8),
       (2, 8),
       (9, 8),
       (1, 9),
       (2, 9),
       (8, 9),
       (1, 10),
       (2, 10),
       (1, 11),
       (2, 11),
       (8, 11),
       (9, 11),
       (1, 12),
       (2, 12),
       (13, 12),
       (1, 13),
       (2, 13),
       (8, 13),
       (1, 14),
       (2, 14),
       (1, 15),
       (1, 16),
       (1, 17),
       (14, 17),
       (15, 17),
       (1, 18),
       (1, 19),
       (2, 19),
       (1, 20),
       (2, 20),
       (1, 21),
       (2, 21),
       (8, 21),
       (1, 22),
       (2, 22),
       (1, 23),
       (2, 23),
       (1, 24),
       (2, 24),
       (1, 25),
       (2, 25),
       (1, 26),
       (2, 26),
       (1, 27),
       (2, 27),
       (1, 28),
       (2, 28),
       (1, 29),
       (2, 29),
       (9, 29),
       (1, 30),
       (2, 30),
       (9, 30),
       (1, 31),
       (14, 31),
       (1, 32),
       (14, 32),
       (15, 32),
       (1, 33),
       (2, 33),
       (1, 34),
       (2, 34),
       (1, 35),
       (2, 35),
       (1, 36),
       (2, 36),
       (1, 37),
       (2, 37),
       (12, 37),
       (13, 37),
       (1, 38),
       (2, 38),
       (12, 38),
       (13, 38),
       (1, 39),
       (2, 39),
       (12, 39),
       (13, 39),
       (1, 40),
       (2, 40),
       (1, 41),
       (2, 41),
       (1, 42),
       (2, 42),
       (1, 43),
       (2, 43),
       (1, 44),
       (2, 44),
       (1, 45),
       (2, 45),
       (1, 46),
       (2, 46),
       (1, 47),
       (2, 47),
       (1, 48),
       (2, 48),
       (1, 49),
       (2, 49),
       (1, 50),
       (2, 50),
       (1, 51),
       (2, 51),
       (1, 52),
       (2, 52),
       (1, 53),
       (2, 53),
       (1, 54),
       (2, 54),
       (1, 55),
       (2, 55),
       (1, 56),
       (2, 56),
       (1, 57),
       (2, 57),
       (1, 58),
       (2, 58),
       (1, 59),
       (14, 59),
       (1, 60),
       (14, 60),
       (1, 61),
       (14, 61),
       (15, 61),
       (1, 62),
       (10, 62),
       (1, 63),
       (10, 63),
       (1, 64),
       (1, 65),
       (1, 66),
       (2, 66),
       (1, 67),
       (2, 67),
       (1, 68),
       (2, 68),
       (1, 69),
       (2, 69),
       (1, 70),
       (1, 71),
       (2, 71),
       (1, 72),
       (2, 72),
       (1, 73),
       (12, 73),
       (1, 74),
       (2, 74),
       (1, 75),
       (2, 75),
       (1, 76),
       (2, 76),
       (1, 77),
       (2, 77),
       (10, 77),
       (1, 78),
       (2, 78),
       (10, 78),
       (1, 79),
       (2, 79),
       (10, 79),
       (1, 80),
       (2, 80);
/*!40000 ALTER TABLE `Restrictions_aliments`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users`
(
  `ID_user`  int                                                           NOT NULL AUTO_INCREMENT,
  `nom`      varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `prenom`   varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `mail`     varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `age`      int                                                           NOT NULL,
  `taille`   int                                                           NOT NULL,
  `poids`    decimal(10, 2)                                                NOT NULL,
  `sexe`     varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `imc`      decimal(10, 2)                                                NOT NULL,
  PRIMARY KEY (`ID_user`),
  UNIQUE KEY `mail_UNIQUE` (`mail`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users`
  DISABLE KEYS */;
/*!40000 ALTER TABLE `Users`
  ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client = @@character_set_client */;
/*!50003 SET @saved_cs_results = @@character_set_results */;
/*!50003 SET @saved_col_connection = @@collation_connection */;
/*!50003 SET character_set_client = utf8mb4 */;
/*!50003 SET character_set_results = utf8mb4 */;
/*!50003 SET collation_connection = utf8mb4_0900_ai_ci */;
/*!50003 SET @saved_sql_mode = @@sql_mode */;
/*!50003 SET sql_mode =
  'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */;
DELIMITER ;;
/*!50003 CREATE */ /*!50017 DEFINER =`root`@`%`*/ /*!50003 TRIGGER `update_imc_trigger_insert`
  BEFORE INSERT
  ON `users`
  FOR EACH ROW
BEGIN
  -- Appeler la procédure pour calculer l'IMC
  CALL calculate_imc(NEW.poids, NEW.taille, @calculated_imc);
  SET NEW.imc = @calculated_imc;
END */;;
DELIMITER ;
/*!50003 SET sql_mode = @saved_sql_mode */;
/*!50003 SET character_set_client = @saved_cs_client */;
/*!50003 SET character_set_results = @saved_cs_results */;
/*!50003 SET collation_connection = @saved_col_connection */;
/*!50003 SET @saved_cs_client = @@character_set_client */;
/*!50003 SET @saved_cs_results = @@character_set_results */;
/*!50003 SET @saved_col_connection = @@collation_connection */;
/*!50003 SET character_set_client = utf8mb4 */;
/*!50003 SET character_set_results = utf8mb4 */;
/*!50003 SET collation_connection = utf8mb4_0900_ai_ci */;
/*!50003 SET @saved_sql_mode = @@sql_mode */;
/*!50003 SET sql_mode =
  'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */;
DELIMITER ;;
/*!50003 CREATE */ /*!50017 DEFINER =`root`@`%`*/ /*!50003 TRIGGER `update_imc_trigger_update`
  BEFORE UPDATE
  ON `users`
  FOR EACH ROW
BEGIN
  -- Appeler la procédure pour recalculer l'IMC
  CALL calculate_imc(NEW.poids, NEW.taille, @calculated_imc);
  SET NEW.imc = @calculated_imc;
END */;;
DELIMITER ;
/*!50003 SET sql_mode = @saved_sql_mode */;
/*!50003 SET character_set_client = @saved_cs_client */;
/*!50003 SET character_set_results = @saved_cs_results */;
/*!50003 SET collation_connection = @saved_col_connection */;

--
-- Table structure for table `Users_Alimentations`
--

DROP TABLE IF EXISTS `Users_Alimentations`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users_Alimentations`
(
  `ID_alimentation` int         NOT NULL AUTO_INCREMENT,
  `ID_user`         int         NOT NULL,
  `ID_plat`         int                  DEFAULT NULL,
  `ID_aliment`      int                  DEFAULT NULL,
  `Quantite`        int         NOT NULL DEFAULT 1,
  `date`            datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `ID_moment`       int         NOT NULL,
  PRIMARY KEY (`ID_alimentation`),
  KEY `fk_alimentation_aliment` (`ID_aliment`),
  KEY `fk_alimentation_moment` (`ID_moment`),
  KEY `fk_alimentation_plat` (`ID_plat`),
  KEY `fk_alimentation_user` (`ID_user`),
  CONSTRAINT `fk_alimentation_aliment` FOREIGN KEY (`ID_aliment`) REFERENCES `Aliments` (`ID_aliment`),
  CONSTRAINT `fk_alimentation_moment` FOREIGN KEY (`ID_moment`) REFERENCES `Day_Sections` (`ID_moments`),
  CONSTRAINT `fk_alimentation_plat` FOREIGN KEY (`ID_plat`) REFERENCES `Plats` (`ID_plat`),
  CONSTRAINT `fk_alimentation_user` FOREIGN KEY (`ID_user`) REFERENCES `Users` (`ID_user`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users_Alimentations`
--

LOCK TABLES `Users_Alimentations` WRITE;
/*!40000 ALTER TABLE `Users_Alimentations`
  DISABLE KEYS */;
/*!40000 ALTER TABLE `Users_Alimentations`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users_Favoris`
--

DROP TABLE IF EXISTS `Users_Favoris`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users_Favoris`
(
  `ID_favoris` int NOT NULL AUTO_INCREMENT,
  `ID_user`    int NOT NULL,
  `ID_plat`    int DEFAULT NULL,
  `ID_aliment` int DEFAULT NULL,
  PRIMARY KEY (`ID_favoris`),
  KEY `fk_favoris_aliment` (`ID_aliment`),
  KEY `fk_favoris_plat` (`ID_plat`),
  KEY `fk_favoris_user` (`ID_user`),
  CONSTRAINT `fk_favoris_aliment` FOREIGN KEY (`ID_aliment`) REFERENCES `Aliments` (`ID_aliment`),
  CONSTRAINT `fk_favoris_plat` FOREIGN KEY (`ID_plat`) REFERENCES `Plats` (`ID_plat`),
  CONSTRAINT `fk_favoris_user` FOREIGN KEY (`ID_user`) REFERENCES `Users` (`ID_user`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users_Favoris`
--

LOCK TABLES `Users_Favoris` WRITE;
/*!40000 ALTER TABLE `Users_Favoris`
  DISABLE KEYS */;
/*!40000 ALTER TABLE `Users_Favoris`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users_Hydratations`
--

DROP TABLE IF EXISTS `Users_Hydratations`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users_Hydratations`
(
  `ID_user` int         NOT NULL,
  `date`    datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `volume`  int         NOT NULL,
  PRIMARY KEY (`ID_user`, `date`),
  KEY `fk_hydratation_user` (`ID_user`),
  CONSTRAINT `fk_hydratation_user` FOREIGN KEY (`ID_user`) REFERENCES `Users` (`ID_user`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users_Hydratations`
--

LOCK TABLES `Users_Hydratations` WRITE;
/*!40000 ALTER TABLE `Users_Hydratations`
  DISABLE KEYS */;
/*!40000 ALTER TABLE `Users_Hydratations`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users_restrictions`
--

DROP TABLE IF EXISTS `Users_restrictions`;
/*!40101 SET @saved_cs_client = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users_restrictions`
(
  `ID_user`        int NOT NULL,
  `ID_restriction` int NOT NULL,
  PRIMARY KEY (`ID_user`, `ID_restriction`),
  KEY `fk_user_restriction_restriction` (`ID_restriction`),
  KEY `fk_user_restriction_user` (`ID_user`),
  CONSTRAINT `fk_user_restriction_restriction` FOREIGN KEY (`ID_restriction`) REFERENCES `Restriction_Types` (`ID_restriction`),
  CONSTRAINT `fk_user_restriction_user` FOREIGN KEY (`ID_user`) REFERENCES `Users` (`ID_user`)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users_restrictions`
--

LOCK TABLES `Users_restrictions` WRITE;
/*!40000 ALTER TABLE `Users_restrictions`
  DISABLE KEYS */;
/*!40000 ALTER TABLE `Users_restrictions`
  ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'nutrition_webapp'
--

--
-- Dumping routines for database 'nutrition_webapp'
--
/*!50003 DROP PROCEDURE IF EXISTS `calculate_imc` */;
/*!50003 SET @saved_cs_client = @@character_set_client */;
/*!50003 SET @saved_cs_results = @@character_set_results */;
/*!50003 SET @saved_col_connection = @@collation_connection */;
/*!50003 SET character_set_client = utf8mb4 */;
/*!50003 SET character_set_results = utf8mb4 */;
/*!50003 SET collation_connection = utf8mb4_0900_ai_ci */;
/*!50003 SET @saved_sql_mode = @@sql_mode */;
/*!50003 SET sql_mode =
  'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */;
DELIMITER ;;
CREATE
  DEFINER = `root`@`%` PROCEDURE `calculate_imc`(
  IN poids DOUBLE,
  IN taille DOUBLE,
  OUT imc DOUBLE
)
BEGIN
  -- Vérifier que la taille est valide (supérieure à 0)
  IF taille > 0 THEN
    SET imc = poids / POW((taille / 100), 2);
  ELSE
    -- Si la taille est invalide, définir NULL comme IMC
    SET imc = NULL;
  END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode = @saved_sql_mode */;
/*!50003 SET character_set_client = @saved_cs_client */;
/*!50003 SET character_set_results = @saved_cs_results */;
/*!50003 SET collation_connection = @saved_col_connection */;
/*!40103 SET TIME_ZONE = @OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE = @OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES = @OLD_SQL_NOTES */;

-- Dump completed on 2025-01-27 14:09:50
