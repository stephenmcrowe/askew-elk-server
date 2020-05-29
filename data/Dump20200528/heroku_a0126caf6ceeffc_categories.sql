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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `CategoryID` int(11) NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(25) NOT NULL,
  PRIMARY KEY (`CategoryID`),
  UNIQUE KEY `CategoryName_UNIQUE` (`CategoryName`)
) ENGINE=InnoDB AUTO_INCREMENT=391 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (141,'Advance Prep Required'),(176,'Alcoholic'),(224,'Almond'),(269,'Anise'),(248,'Anniversary'),(185,'Appetizer'),(8,'Apple'),(149,'Apricot'),(200,'Artichoke'),(236,'Arugula'),(331,'asdf'),(120,'Asian Pear'),(57,'Asparagus'),(156,'Australia'),(164,'Avocado'),(151,'Back to School'),(181,'Backyard BBQ'),(52,'Bacon'),(15,'Bake'),(95,'Banana'),(51,'Basil'),(16,'Bastille Day'),(2,'Bean'),(69,'Beef'),(101,'Beef Tenderloin'),(258,'Beer'),(274,'Beet'),(153,'Bell Pepper'),(232,'Berry'),(98,'Birthday'),(174,'Bitters'),(222,'Blackberry'),(145,'Blender'),(235,'Blue Cheese'),(62,'Boil'),(22,'Bon Appétit'),(259,'Bourbon'),(116,'Braise'),(102,'Brandy'),(108,'Bread'),(131,'Breadcrumbs'),(87,'Breakfast'),(261,'Brisket'),(169,'Broccoli Rabe'),(109,'Brunch'),(234,'Bulgur'),(219,'Buttermilk'),(160,'Butternut Squash'),(273,'Cabbage'),(91,'Cake'),(50,'California'),(119,'Capers'),(59,'Carrot'),(243,'Cashew'),(158,'Casserole/Gratin'),(44,'Cheese'),(150,'Cherry'),(246,'Chestnut'),(84,'Chicken'),(217,'Chile Pepper'),(21,'Chill'),(106,'Chive'),(92,'Chocolate'),(110,'Christmas'),(189,'Christmas Eve'),(193,'Cilantro'),(255,'Cinco de Mayo'),(168,'Cinnamon'),(182,'Citrus'),(221,'Clove'),(177,'Cocktail'),(67,'Cocktail Party'),(88,'Coconut'),(125,'Cod'),(229,'Coffee Grinder'),(205,'Collard Greens'),(270,'Condiment'),(136,'Condiment/Spread'),(11,'Cookie'),(216,'Corn'),(220,'Cornmeal'),(180,'Crab'),(257,'Cranberry'),(238,'Cream Cheese'),(140,'Cucumber'),(24,'Dairy'),(39,'Dairy Free'),(167,'Deep-Fry'),(93,'Dessert'),(253,'Dill'),(35,'Dinner'),(233,'Double Boiler'),(18,'Dried Fruit'),(179,'Drink'),(55,'Easter'),(65,'Egg'),(213,'Eggplant'),(130,'Endive'),(190,'Engagement Party'),(107,'Escarole'),(49,'Fall'),(129,'Family Reunion'),(100,'Father\'s Day'),(26,'Fennel'),(206,'Fig'),(29,'Fish'),(163,'Fontina'),(12,'Food Processor'),(165,'Fortified Wine'),(215,'Fourth of July'),(183,'Freeze/Chill'),(3,'Fruit'),(212,'Fruit Juice'),(137,'Fry'),(85,'Garlic'),(70,'Ginger'),(187,'Goat Cheese'),(27,'Gourmet'),(263,'Grains'),(194,'Grapefruit'),(147,'Green Bean'),(170,'Grill'),(171,'Grill/Barbecue'),(208,'Ground Beef'),(126,'Halibut'),(56,'Ham'),(202,'HarperCollins'),(240,'Hazelnut'),(36,'Healthy'),(139,'Herb'),(34,'High Fiber'),(113,'Honey'),(252,'Horseradish'),(198,'Hot Pepper'),(381,'Hotdog'),(192,'Jalapeño'),(114,'Jam or Jelly'),(341,'Javscript'),(245,'Jícama'),(267,'Kansas'),(7,'Kid-Friendly'),(115,'Kidney Friendly'),(43,'Kosher'),(68,'Kumquat'),(268,'Lamb Shank'),(127,'Leafy Green'),(155,'Lemon'),(90,'Lemongrass'),(9,'Lentil'),(10,'Lettuce'),(172,'Lime'),(173,'Lime Juice'),(175,'Liqueur'),(311,'lmfao'),(371,'lobster'),(281,'LOLOLOL'),(33,'Low Cal'),(99,'Low Carb'),(32,'Low Fat'),(124,'Low Sodium'),(254,'Low/No Sugar'),(75,'Lunch'),(264,'Mango'),(247,'Maple Syrup'),(103,'Massachusetts'),(76,'Mayonnaise'),(260,'Meat'),(225,'Microwave'),(79,'Milk/Cream'),(188,'Mint'),(199,'Mixer'),(218,'Molasses'),(111,'Mother\'s Day'),(207,'Mozzarella'),(197,'Mushroom'),(73,'Mustard'),(112,'New Year\'s Day'),(17,'New Year\'s Eve'),(28,'New York'),(64,'No Sugar Added'),(66,'No-Cook'),(132,'Nut'),(83,'Nutmeg'),(30,'Olive'),(201,'One-Pot Meal'),(13,'Onion'),(195,'Orange'),(231,'Oregano'),(272,'Oregon'),(186,'Oscars'),(142,'Paleo'),(138,'Pan-Fry'),(128,'Parmesan'),(228,'Parsley'),(96,'Party'),(45,'Pasta'),(77,'Pea'),(105,'Peach'),(241,'Peanut'),(97,'Peanut Butter'),(40,'Peanut Free'),(143,'Pear'),(134,'Pecan'),(86,'Pepper'),(38,'Pescatarian'),(74,'Picnic'),(250,'Pistachio'),(154,'Poker/Game Night'),(196,'Pomegranate'),(14,'Pork'),(262,'Pork Chop'),(19,'Port'),(271,'Portland'),(25,'Potato'),(191,'Potluck'),(249,'Poultry'),(203,'Prosciutto'),(210,'Pumpkin'),(351,'Python'),(48,'Quick & Easy'),(204,'Quick and Healthy'),(118,'Radish'),(239,'Raspberry'),(184,'Rice'),(244,'Ricotta'),(146,'Roast'),(321,'rofllmao'),(81,'Rosemary'),(178,'Rye'),(251,'Saffron'),(162,'Sage'),(54,'Salad'),(230,'Salad Dressing'),(265,'Salmon'),(1,'Sandwich'),(214,'Santa Monica'),(104,'Sauce'),(31,'Sauté'),(361,'Seafood'),(211,'Seed'),(123,'Self'),(122,'Sesame'),(135,'Shower'),(89,'Shrimp'),(46,'Side'),(37,'Simmer'),(23,'Soup/Stew'),(42,'Soy Free'),(72,'Soy Sauce'),(144,'Spice'),(58,'Spinach'),(60,'Spring'),(159,'Squash'),(152,'Steak'),(71,'Stir-Fry'),(223,'Strawberry'),(78,'Sugar Conscious'),(61,'Sugar Snap Pea'),(53,'Summer'),(133,'Super Bowl'),(82,'Sweet Potato/Yam'),(161,'Swiss Cheese'),(80,'Thanksgiving'),(227,'Thyme'),(226,'Tofu'),(256,'Tomatillo'),(4,'Tomato'),(242,'Tree Nut'),(41,'Tree Nut Free'),(94,'Tropical Fruit'),(117,'Tuna'),(5,'turkey'),(237,'Valentine\'s Day'),(209,'Veal'),(148,'Vegan'),(6,'Vegetable'),(47,'Vegetarian'),(157,'Vinegar'),(121,'Watercress'),(63,'Wheat/Gluten-Free'),(166,'White Wine'),(20,'Winter'),(266,'Yogurt');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-28 21:57:29
