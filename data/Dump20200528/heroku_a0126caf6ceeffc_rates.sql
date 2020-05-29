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
-- Table structure for table `rates`
--

DROP TABLE IF EXISTS `rates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rates` (
  `RecipeID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Rating` decimal(4,3) DEFAULT NULL,
  PRIMARY KEY (`RecipeID`,`UserID`),
  KEY `fk_RatingsUserID_idx` (`UserID`),
  CONSTRAINT `fk_RatingsRecipeID` FOREIGN KEY (`RecipeID`) REFERENCES `recipes` (`RecipeID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_RatingsUserID` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rates`
--

LOCK TABLES `rates` WRITE;
/*!40000 ALTER TABLE `rates` DISABLE KEYS */;
INSERT INTO `rates` VALUES (1,131,2.500),(2,131,4.375),(3,131,3.750),(4,131,5.000),(5,131,3.125),(6,131,4.375),(7,131,4.375),(8,131,3.750),(9,131,4.375),(10,131,3.750),(11,131,3.750),(12,131,4.375),(13,131,4.375),(14,131,4.375),(15,131,3.125),(16,131,4.375),(17,131,1.875),(18,131,4.375),(19,131,5.000),(20,131,5.000),(21,131,4.375),(22,131,3.750),(23,131,3.750),(24,131,3.750),(25,131,3.750),(26,131,0.000),(27,131,3.750),(28,131,2.500),(29,131,4.375),(30,131,4.375),(31,131,4.375),(32,131,5.000),(33,131,4.375),(34,131,3.125),(35,131,5.000),(36,131,3.750),(37,131,0.000),(38,131,4.375),(39,131,4.375),(40,131,2.500),(41,131,4.375),(42,131,4.375),(43,131,0.000),(44,131,3.750),(45,131,4.375),(46,131,4.375),(47,131,3.750),(48,131,4.375),(49,131,4.375),(50,131,4.375),(51,131,3.125),(52,131,3.750),(53,131,4.375),(54,131,5.000),(55,131,3.750),(56,131,5.000),(57,131,4.375),(58,131,4.375),(59,131,3.750),(60,131,3.750),(61,131,3.750),(62,131,4.375),(63,131,5.000),(64,131,0.000),(65,131,3.750),(66,131,4.375),(67,131,3.125),(68,131,3.750),(69,131,4.375),(70,131,0.000),(71,131,4.375),(72,131,4.375),(73,131,3.750),(74,131,3.750),(75,131,3.750),(76,131,4.375),(77,131,3.125),(78,131,3.750),(79,131,4.375),(80,131,3.750),(81,131,4.375),(82,131,4.375),(83,131,4.375),(84,131,5.000),(85,131,4.375),(86,131,4.375),(87,131,0.000),(88,131,0.000),(89,131,4.375),(90,131,3.750),(91,131,3.750),(92,131,4.375),(93,131,4.375),(94,131,3.750),(95,131,3.125),(96,131,0.000),(97,131,4.375),(98,131,3.125),(99,131,3.125),(100,131,4.375),(961,31,5.000),(961,131,4.000);
/*!40000 ALTER TABLE `rates` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-28 21:57:26