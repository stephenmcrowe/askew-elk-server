-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: us-cdbr-east-06.cleardb.net    Database: heroku_a0126caf6ceeffc
-- ------------------------------------------------------
-- Server version	5.5.62-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `history` (
  `RecipeID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `DateOfEntry` datetime NOT NULL,
  `Title` varchar(115) DEFAULT NULL,
  `Notes` text NOT NULL,
  PRIMARY KEY (`RecipeID`,`UserID`,`DateOfEntry`),
  KEY `fk_UserID_idx` (`UserID`),
  CONSTRAINT `fk_HistoryRecipeID` FOREIGN KEY (`RecipeID`) REFERENCES `recipes` (`RecipeID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_HistoryUserID` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
INSERT INTO `history` VALUES (4,131,'2020-05-28 20:49:08','Title for Mahi-mahi note','Awesome poisson'),(4,131,'2020-05-28 21:01:11','Title which is super duper awesomely fantastically looonng that it appears on a separate line','Mahi mahi is the worst fish. It should be replaced  with swordfish, or if that\'s too expensive, salmon.'),(4,131,'2020-05-28 21:06:26','Title which is super duper awesomely fantastically looonng that it appears on a separate line','Mahi mahi is the worst fish. It should be replaced  with swordfish, or if that\'s too expensive, salmon. Mahi mahi is the worst fish. It should be replaced  with swordfish, or if that\'s too expensive, salmon. Mahi mahi is the worst fish. It should be replaced  with swordfish, or if that\'s too expensive, salmon. Mahi mahi is the worst fish. It should be replaced  with swordfish, or if that\'s too expensive, salmon. Mahi mahi is the worst fish. It should be replaced  with swordfish, or if that\'s too expensive, salmon.');
/*!40000 ALTER TABLE `history` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-28 21:57:31
