-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: localhost    Database: seoweb
-- ------------------------------------------------------
-- Server version	8.0.39-0ubuntu0.24.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agency`
--

DROP TABLE IF EXISTS `agency`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agency` (
  `id` int NOT NULL AUTO_INCREMENT,
  `photo_profile` text,
  `username` text,
  `image_post` text NOT NULL,
  `likes` int NOT NULL,
  `caption` text NOT NULL,
  `link` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agency`
--

LOCK TABLES `agency` WRITE;
/*!40000 ALTER TABLE `agency` DISABLE KEYS */;
INSERT INTO `agency` VALUES (2,'https://ik.imagekit.io/cretivox/filename_UOndhHtk9','Cretivox','https://ik.imagekit.io/cretivox/filename_3wBleaUxX',400,'test caption','https://google.com'),(4,'https://ik.imagekit.io/cretivox/filename_d15rC18-9','asdasdasd','https://ik.imagekit.io/cretivox/filename_dTYY5jaSs',123123123,'asdasd','asdasd');
/*!40000 ALTER TABLE `agency` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `article_data`
--

DROP TABLE IF EXISTS `article_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `total_visitor` text NOT NULL,
  `total_article` text NOT NULL,
  `last_post` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_data`
--

LOCK TABLES `article_data` WRITE;
/*!40000 ALTER TABLE `article_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `article_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `id` int NOT NULL AUTO_INCREMENT,
  `client_name` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=153 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES (35,'ABC Soya','https://ik.imagekit.io/cretivox/filename_TMudRgXbc'),(36,'Acer x HMNS',''),(37,'Ajinomoto',''),(38,'APC by Schneider Electric',''),(39,'Astro',''),(40,'Authenticity ID',''),(41,'Avian Brands',''),(42,'Bango',''),(43,'BCA',''),(44,'BCA Paylater',''),(45,'Binus University',''),(46,'Biore UV',''),(47,'BRI',''),(48,'Bridestory Market by Danamon',''),(49,'BRImo',''),(50,'Buttonscarves',''),(51,'Chitato',''),(52,'City Vision',''),(53,'Clarks',''),(54,'Clear x Grab (Unbranded)',''),(55,'Clozette Unbranded',''),(56,'CSR Scarlett Whitening',''),(57,'Dancow UGM',''),(58,'Danone',''),(59,'Darlie',''),(60,'Disney',''),(61,'Djarum Robotic',''),(62,'Dove',''),(63,'Durex Unbranded',''),(64,'DXI (Deep & Extreme Indonesia)',''),(65,'Femmy Fiber',''),(66,'Festival Like 2',''),(67,'Flip.id',''),(68,'Galeri 24',''),(69,'Garmin',''),(70,'Gaung Merah',''),(71,'Gojek',''),(72,'Gopay Tabungan by Bank Jago',''),(73,'Grab',''),(74,'Grabmart',''),(75,'Greenfields',''),(76,'Gudang Garam',''),(77,'HAUS',''),(78,'HealthyWay Kids',''),(79,'Honeye Lens',''),(80,'Hyundai',''),(81,'IM3',''),(82,'IMPLORA',''),(83,'Indomilk',''),(84,'Jago Syariah',''),(85,'Jenius',''),(86,'Kampus Merdeka',''),(87,'Kanzler',''),(88,'Kapal Api',''),(89,'Kitchenette',''),(90,'Kemenpora',''),(91,'KIN Yogurt',''),(92,'Kodomo',''),(93,'Lazada',''),(94,'Le Minerale',''),(95,'Lifebuoy x PMI',''),(96,'Line Bank x Hana Bank',''),(97,'LG',''),(98,'Maybelline',''),(99,'Moko Moko',''),(100,'Mola',''),(101,'Moon Chicken',''),(102,'Mr DIY',''),(103,'Ms Glow',''),(104,'Nexon',''),(105,'Nipis Madu',''),(106,'NVMEE',''),(107,'OCBC',''),(108,'One Piece',''),(109,'Oronamin C',''),(110,'Ovale',''),(111,'Pandora Experience',''),(112,'Pantene',''),(113,'Plossa',''),(114,'Pocari Sweat',''),(115,'Pond\'s Men Sunscreen',''),(116,'Pop Mie',''),(117,'Posh',''),(118,'PT. Kreasi Antar Rupa - Ancol',''),(119,'Puma',''),(120,'R1 For Men',''),(121,'Royal Canin',''),(122,'Royco',''),(123,'Salonpas',''),(124,'Samsung Galaxy Watch',''),(125,'Samsung Galaxy',''),(126,'Sasa',''),(127,'Scentplus',''),(128,'Soffell',''),(129,'Somethinc',''),(130,'Sony Pictures',''),(131,'Sunlight',''),(132,'Sunpride LYFE',''),(133,'Sunsilk',''),(134,'Superbank',''),(135,'Spotify',''),(136,'Teamup',''),(137,'Telkom Indonesia',''),(138,'Telkomsel',''),(139,'The Palace',''),(140,'The People\'s Cafe',''),(141,'Tiket.com',''),(142,'Tokopedia',''),(143,'Toyota',''),(144,'Ultramilk',''),(145,'Vaseline',''),(146,'Vidio.com',''),(147,'Vit',''),(148,'Vixal',''),(149,'Wall\'s Ice Cream',''),(150,'Wuling',''),(151,'Yaris',''),(152,'Zinc','');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `division`
--

DROP TABLE IF EXISTS `division`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `division` (
  `id` int NOT NULL AUTO_INCREMENT,
  `division_name` text,
  `image` text,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `division`
--

LOCK TABLES `division` WRITE;
/*!40000 ALTER TABLE `division` DISABLE KEYS */;
INSERT INTO `division` VALUES (8,'Creative','https://ik.imagekit.io/cretivox/filename_JPcRD9n2J','Lorem Ipsum'),(9,'Digital','https://ik.imagekit.io/cretivox/filename_2rOYwhAAM','loremipsum'),(10,'Production','https://ik.imagekit.io/cretivox/filename_lTObKQf7e','Loremipsum'),(11,'Video Editor','https://ik.imagekit.io/cretivox/filename_SwldEP8Vj','Loremipsum'),(12,'Finance','https://ik.imagekit.io/cretivox/filename_ugtUYnwq-','Loremipsum'),(13,'HRBP','https://ik.imagekit.io/cretivox/filename_PUZGTuwoW','Loremipsum'),(14,'Sales & Marketing','https://ik.imagekit.io/cretivox/filename_D8U9tI-N1','Loremipsum'),(15,'Tech','https://ik.imagekit.io/cretivox/filename_sjvlnPGqJ','Loremipsum'),(16,'Community','https://ik.imagekit.io/cretivox/filename_B6pYGHUvS','Loremipsum');
/*!40000 ALTER TABLE `division` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `employee_name` text,
  `role` text,
  `image` text,
  `division_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `division_id` (`division_id`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`division_id`) REFERENCES `division` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (2,'Bryan Josep Trioctotatema Halawa','Creative Director','https://ik.imagekit.io/cretivox/filename_UsSowMYm0',8),(3,'Camarray Taraka Prattiwa','Graphic Designer','https://ik.imagekit.io/cretivox/filename_AzzfJHyFD',8),(4,'Fadhillah Nurlita Ahmad','Head of Digital','https://ik.imagekit.io/cretivox/filename_e7BZcGlsM',9),(5,'Annisa Latifah','Art Director','https://ik.imagekit.io/cretivox/filename_DPSiZce_0',8),(6,'Aurelia Syifa Indrayana','Social Media Officer Instagram','https://ik.imagekit.io/cretivox/filename_Wuu-cttrw',8),(7,'Kareem Reza','Social Media Officer Tiktok','https://ik.imagekit.io/cretivox/filename_U5zfctFTG',9),(8,'Mohammad Belmiro Hasballah','Sec Head Creative','https://ik.imagekit.io/cretivox/filename_N23j-PtLg',8),(9,'Putri Fatimah','Social Media Officer Instagram','https://ik.imagekit.io/cretivox/filename_0cjNR_UqL',9),(10,'Savira Puteri ','Graphic Designer Cretivox','https://ik.imagekit.io/cretivox/filename_cC3xazol5',8),(11,'Setyo Ajie Darmawa','Copywriter','https://ik.imagekit.io/cretivox/filename_1oUToMiGn',8),(12,'Aurel Azalia Syahdira','Producer','https://ik.imagekit.io/cretivox/filename_Ckbk1LHeZ',10),(13,'Josua Exel Astha Gama','Production','https://ik.imagekit.io/cretivox/filename_Y_9tYG3hP',10),(14,'Muhammad Naufal Hadafiz','Video Production','https://ik.imagekit.io/cretivox/filename_6_9Xsc9SJ',10),(15,'Bintang Raditya Putra Pamungkas','Video Editor','https://ik.imagekit.io/cretivox/filename_6Cqj9qEVU',11),(16,'Muhammad Hafizh Budi','Video Editor','https://ik.imagekit.io/cretivox/filename_h8hC8dMp-',11),(17,'Radityo Bagaskoro','Video Editor','https://ik.imagekit.io/cretivox/filename_efQBNp0mM',11),(18,'Rafsanjani Mauliza D','Production','https://ik.imagekit.io/cretivox/filename_NHRn_m76L',10),(19,'Nyawung Gagat Windarum Rasmi','Sr. Accounting Officer','https://ik.imagekit.io/cretivox/filename_L_ILROtmZ',12),(20,'Anggita Anggun Apsari','Finance & Tax Officer','https://ik.imagekit.io/cretivox/filename__cVZk_m1P',12),(21,'Vina Amelia','General Administration','https://ik.imagekit.io/cretivox/filename_xJNFrRSyv',12),(22,'Nabilla Ayu Syahrani','HRBP','https://ik.imagekit.io/cretivox/filename_PM8ZkEoTc',13),(23,'Rido Prasetyo','Account Manager','https://ik.imagekit.io/cretivox/filename_hPK2Dh2pG',14),(24,'Ayu Kemala Putri','Account Executive','https://ik.imagekit.io/cretivox/filename_sXZ5SufeI',14),(25,'Alishia ','Account Executive','https://ik.imagekit.io/cretivox/filename_W9ffJ1CMa',14),(26,'Maria Noelani Christin Pua','Account Executive','https://ik.imagekit.io/cretivox/filename_y2OEhZ1V9',14),(27,'Moch Aggiat Rachmana','Head of Tech','https://ik.imagekit.io/cretivox/filename_BWOuii9qX',15),(28,'Abdhul Rhohim','Software Engineer','https://ik.imagekit.io/cretivox/filename_DHxQI59RN',15),(30,'Afifa Fauziya Rinaldi','Sr. Community Officer','https://ik.imagekit.io/cretivox/filename_WcC-JLyQX',16),(31,'Hania Adiva Perpati','Community Officer','https://ik.imagekit.io/cretivox/filename_-Z6HHMtKi',16),(34,'Rama Rahman','IT Support','https://ik.imagekit.io/cretivox/filename_OhQz0uMKs',15);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` text,
  `date` text,
  `description` text,
  `background_color` text,
  `image` text,
  `background_image` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
INSERT INTO `history` VALUES (2,'aggiat','aggiat','asdasd','#000000','https://ik.imagekit.io/cretivox/filename_zCQ0yzc6P','https://ik.imagekit.io/cretivox/filename_grqv1O7YW');
/*!40000 ALTER TABLE `history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ig_data`
--

DROP TABLE IF EXISTS `ig_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ig_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `total_followers` text,
  `ER` text,
  `last_post` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ig_data`
--

LOCK TABLES `ig_data` WRITE;
/*!40000 ALTER TABLE `ig_data` DISABLE KEYS */;
INSERT INTO `ig_data` VALUES (1,'811K+','27M+','[{\"title\":\"MEME\",\"description\":\"Description\",\"year\":\"2024\",\"brand\":\"IM3\",\"imageurl\":\"https://ik.imagekit.io/cretivox/IM3_SobSxtEc8.png\",\"link\":\"https://www.instagram.com/p/C4UxuAcyxF1/?img_index=1\"},{\"title\":\"Belacan\",\"description\":\"Description\",\"year\":\"2024\",\"brand\":\"Tokopedia\",\"imageurl\":\"https://ik.imagekit.io/cretivox/Snapinsta.app_449863918_350401751426743_5477483165085870402_n_1080_bLam_hR_x.jpg\",\"link\":\"https://www.instagram.com/p/C9FSbjCyOfx/?img_index=1\"},{\"title\":\"Tanya Kantor\",\"description\":\"Description\",\"year\":\"2024\",\"brand\":\"Gaung Merah\",\"imageurl\":\"https://ik.imagekit.io/cretivox/Image-738_jNW9WU7dH.jpg\",\"link\":\"https://drive.google.com/file/d/13EeCiV59f6yCwUG48h7hlY6qbe-utAN8/view?usp=drive_link\"}]');
/*!40000 ALTER TABLE `ig_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `intern_batch`
--

DROP TABLE IF EXISTS `intern_batch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `intern_batch` (
  `id` int NOT NULL AUTO_INCREMENT,
  `batch` text,
  `title` text,
  `image` text,
  `siapa` text,
  `reveal` text,
  `dua_tipe` text,
  `best_intern` text,
  `philosophy` text,
  `instagram` text,
  `season` text,
  `periode` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `intern_batch`
--

LOCK TABLES `intern_batch` WRITE;
/*!40000 ALTER TABLE `intern_batch` DISABLE KEYS */;
INSERT INTO `intern_batch` VALUES (1,'Batch 8','The Dream Boat','https://ik.imagekit.io/cretivox/WhatsApp_Image_2024-07-04_at_08.38.34_nE7VtbFQU.jpeg','http://placeimg.com/640/480/nature','http://placeimg.com/640/480/nature','http://placeimg.com/640/480/nature','Mas maszeh','Perahu perahu perahuuu','dreamboat','1','2021'),(2,'Batch X','Season Finale','https://ik.imagekit.io/cretivox/510_-_Mama_vLfowQsBS.jpeg','http://placeimg.com/640/480/nature','http://placeimg.com/640/480/nature','http://placeimg.com/640/480/nature','Mas Mas lagi','Final banget iniiiii','batchxseasonfinale','1','2023'),(3,'Batch S.E','Resistance in bloom','https://ik.imagekit.io/cretivox/MAIN_POSTER_2__1__QZj4F5mM6.jpg','http://placeimg.com/640/480/nature','http://placeimg.com/640/480/nature','http://placeimg.com/640/480/nature','cipaa','Special edition banget inii','sdn.mekarwangi03','1','2023'),(4,'Batch 1','Perpetual Arrival','https://ik.imagekit.io/cretivox/1722017124918_8VskBJ8HP.jpeg','http://placeimg.com/640/480/nature','http://placeimg.com/640/480/nature','http://placeimg.com/640/480/nature','Rahasia','Ngeri ngeri di sinii','tongxsetanz','2','2023');
/*!40000 ALTER TABLE `intern_batch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `intern_contact`
--

DROP TABLE IF EXISTS `intern_contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `intern_contact` (
  `id` int NOT NULL AUTO_INCREMENT,
  `contact_name` text,
  `university` text,
  `email` text,
  `phone` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `intern_contact`
--

LOCK TABLES `intern_contact` WRITE;
/*!40000 ALTER TABLE `intern_contact` DISABLE KEYS */;
/*!40000 ALTER TABLE `intern_contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `intern_member`
--

DROP TABLE IF EXISTS `intern_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `intern_member` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_name` text,
  `image` text,
  `university` text,
  `division` text,
  `batch_id` int DEFAULT NULL,
  `periode` text,
  `instagram` text,
  PRIMARY KEY (`id`),
  KEY `batch_id` (`batch_id`),
  CONSTRAINT `intern_member_ibfk_1` FOREIGN KEY (`batch_id`) REFERENCES `intern_batch` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `intern_member`
--

LOCK TABLES `intern_member` WRITE;
/*!40000 ALTER TABLE `intern_member` DISABLE KEYS */;
INSERT INTO `intern_member` VALUES (1,'bluetooth','https://ik.imagekit.io/cretivox/okmas-bry__1__V93Jab10S.jpeg','3X45hhCEK8vGNuXJxVm68B6dmTWcevYuh','New Shermanton',4,NULL,'primary');
/*!40000 ALTER TABLE `intern_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `platform`
--

DROP TABLE IF EXISTS `platform`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `platform` (
  `id` int NOT NULL AUTO_INCREMENT,
  `value_1` text,
  `unit_1` text,
  `value_2` text,
  `unit_2` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `platform`
--

LOCK TABLES `platform` WRITE;
/*!40000 ALTER TABLE `platform` DISABLE KEYS */;
/*!40000 ALTER TABLE `platform` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portfolio_highlight`
--

DROP TABLE IF EXISTS `portfolio_highlight`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `portfolio_highlight` (
  `id` int NOT NULL AUTO_INCREMENT,
  `portfolio_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `portfolio_id` (`portfolio_id`),
  CONSTRAINT `portfolio_highlight_ibfk_1` FOREIGN KEY (`portfolio_id`) REFERENCES `portofolio` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portfolio_highlight`
--

LOCK TABLES `portfolio_highlight` WRITE;
/*!40000 ALTER TABLE `portfolio_highlight` DISABLE KEYS */;
INSERT INTO `portfolio_highlight` VALUES (1,1),(2,2);
/*!40000 ALTER TABLE `portfolio_highlight` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portofolio`
--

DROP TABLE IF EXISTS `portofolio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `portofolio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `introduction` text,
  `client_id` int DEFAULT NULL,
  `services_id` int DEFAULT NULL,
  `year_project` int DEFAULT NULL,
  `scope` varchar(255) DEFAULT NULL,
  `team` varchar(255) DEFAULT NULL,
  `slug` text,
  `meta_description` text,
  `content_1` varchar(255) DEFAULT NULL,
  `content_2` varchar(255) DEFAULT NULL,
  `portofolio_cover` varchar(255) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `client_id` (`client_id`),
  KEY `services_id` (`services_id`),
  CONSTRAINT `portofolio_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`),
  CONSTRAINT `portofolio_ibfk_2` FOREIGN KEY (`services_id`) REFERENCES `services` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portofolio`
--

LOCK TABLES `portofolio` WRITE;
/*!40000 ALTER TABLE `portofolio` DISABLE KEYS */;
INSERT INTO `portofolio` VALUES (1,'aku adalah anak Gembala Selalu riang serta gembira','Lowell Corner',44,1,2024,'Lavada Mill','Marcos Haven','/aku-adalah-anak-gembala-selalu-riang-serta-gembira','hahaskduasdanwdawdk','https://ik.imagekit.io/cretivox/f3a9a38b-116d-4b35-8f46-8d8abb78166f_gjybVtpH8.png','https://ik.imagekit.io/cretivox/Snapinsta.app_432321962_7194902193950675_6589581037930994979_n_1080_B8rMRJLow.jpg','https://ik.imagekit.io/cretivox/Snapinsta.app_432321962_7194902193950675_6589581037930994979_n_1080_3S3Q9PeTO.jpg','2024-09-03'),(2,'aku adalah anak Gembala Selalu riang serta gembira','Alessia Ridges',42,2,2024,'Brooke Village','Kshlerin Mill','/aku-adalah-anak-gembala-selalu-riang-serta-gembira','hahaskduasdanwdawdk','https://ik.imagekit.io/cretivox/f3a9a38b-116d-4b35-8f46-8d8abb78166f_vXdd7fKg3.png','https://ik.imagekit.io/cretivox/Snapinsta.app_432321962_7194902193950675_6589581037930994979_n_1080_aPqdTDQY6.jpg','https://ik.imagekit.io/cretivox/Snapinsta.app_432321962_7194902193950675_6589581037930994979_n_1080_nbKwQQqsj.jpg','2024-09-03'),(3,'aku adalah anak Gembala Selalu riang serta gembira','Schowalter Trace',42,2,2024,'Rogahn Drive','Hickle Prairie','/aku-adalah-anak-gembala-selalu-riang-serta-gembira','hahaskduasdanwdawdk','https://ik.imagekit.io/cretivox/f3a9a38b-116d-4b35-8f46-8d8abb78166f_aLY_Mpo-9.png','https://ik.imagekit.io/cretivox/Snapinsta.app_432321962_7194902193950675_6589581037930994979_n_1080_TNZuVrFd9.jpg','https://ik.imagekit.io/cretivox/Snapinsta.app_432321962_7194902193950675_6589581037930994979_n_1080__9bmPPnwN.jpg','2024-09-03'),(4,'aku adalah anak Gembala Selalu riang serta gembira','Horacio Trace',50,2,2024,'Frontend, GSAP','Mathilde Orchard','/aku-adalah-anak-gembala-selalu-riang-serta-gembira','hahaskduasdanwdawdk','https://ik.imagekit.io/cretivox/f3a9a38b-116d-4b35-8f46-8d8abb78166f_NZ_U-DQpj.png','https://ik.imagekit.io/cretivox/Snapinsta.app_432321962_7194902193950675_6589581037930994979_n_1080_MfjDIPMVD.jpg','https://ik.imagekit.io/cretivox/Snapinsta.app_432321962_7194902193950675_6589581037930994979_n_1080_wpN2mvEP3.jpg','2024-09-04');
/*!40000 ALTER TABLE `portofolio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `random_img`
--

DROP TABLE IF EXISTS `random_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `random_img` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` text,
  `alt_image` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `random_img`
--

LOCK TABLES `random_img` WRITE;
/*!40000 ALTER TABLE `random_img` DISABLE KEYS */;
INSERT INTO `random_img` VALUES (3,'https://ik.imagekit.io/cretivox/f3a9a38b-116d-4b35-8f46-8d8abb78166f_ij5mJXthA.png','agis');
/*!40000 ALTER TABLE `random_img` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `services_name` varchar(255) DEFAULT NULL,
  `cover` varchar(255) DEFAULT NULL,
  `short_description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'Social Media Handling','https://ik.imagekit.io/cretivox/filename_rI-z2gPoG','Socmed Handling Test'),(2,'KOL Specialist','https://ik.imagekit.io/cretivox/filename_PEjKmJqFF','KOL Specialist Description');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tiktok_data`
--

DROP TABLE IF EXISTS `tiktok_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tiktok_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `total_followers` text,
  `total_views` text,
  `last_post` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tiktok_data`
--

LOCK TABLES `tiktok_data` WRITE;
/*!40000 ALTER TABLE `tiktok_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `tiktok_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin_cbn360','$2a$12$tg.p0n7qBq4w/I4WMI9FOuFNTa/wiEjEBWdMvouJfGJcdHC09ktZmdULl98s');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `youtube_data`
--

DROP TABLE IF EXISTS `youtube_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `youtube_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `total_subscribers` text,
  `total_views` text,
  `last_post` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `youtube_data`
--

LOCK TABLES `youtube_data` WRITE;
/*!40000 ALTER TABLE `youtube_data` DISABLE KEYS */;
INSERT INTO `youtube_data` VALUES (2,'910K+','142M+','[{\"title\":\"Blind Date\",\"description\":\"Description\",\"year\":\"2023\",\"brand\":\"Axe\",\"imageurl\":\"https://ik.imagekit.io/cretivox/Blind_Date_Axe_00000_52Y4IjjJ5.jpg\",\"link\":\"https://www.youtube.com/watch?v=NuVgJUXx2cc\"},{\"title\":\"Coba Tebak\",\"description\":\"Description\",\"year\":\"2023\",\"brand\":\"Cussons Baby Newborn\",\"imageurl\":\"https://ik.imagekit.io/cretivox/CT_BAYI_00000_JiCxu1Mnx.jpg\",\"link\":\"https://www.youtube.com/watch?v=kCJV_qClfu0\"},{\"title\":\"Ternyata Begini\",\"description\":\"Description\",\"year\":\"2024\",\"brand\":\"Jago Syariah\",\"imageurl\":\"https://ik.imagekit.io/cretivox/TB_JAGO_SYARIAH_00000_fJ6xTXi-w.jpg\",\"link\":\"https://www.youtube.com/watch?v=xajQbRSm_Hw\"}]');
/*!40000 ALTER TABLE `youtube_data` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-10  2:57:38
