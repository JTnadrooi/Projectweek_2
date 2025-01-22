-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.32-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table quiz.q_quiz
CREATE TABLE IF NOT EXISTS `q_quiz` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `questions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`questions`)),
  `difficulty` varchar(50) DEFAULT 'normal',
  `log` longtext DEFAULT NULL,
  `author` varchar(50) DEFAULT 'quizza',
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table quiz.q_quiz: ~4 rows (approximately)
INSERT INTO `q_quiz` (`id`, `title`, `questions`, `difficulty`, `log`, `author`) VALUES
	(1, 'Auto', '[{"question":"Welke automaker produceert de Golf?","answers":["BMW","Volkswagen","Audi","Ford"],"correctAnswer":"Volkswagen"},{"question":"Welke automaker heeft het logo met een ster in een cirkel?","answers":["Mercedes-Benz","Toyota","Opel","Honda"],"correctAnswer":"Mercedes-Benz"},{"question":"Welke automaker komt uit Japan?","answers":["Ferrari","Toyota","Porsche","Volvo"],"correctAnswer":"Toyota"},{"question":"Welke automaker produceert de Mustang?","answers":["Chevrolet","Ford","Dodge","Tesla"],"correctAnswer":"Ford"},{"question":"Welke automaker heeft het model 911?","answers":["BMW","Audi","Porsche","Lamborghini"],"correctAnswer":"Porsche"},{"question":"Welke automaker heeft een logo met vier ringen?","answers":["Audi","Mazda","Ford","Subaru"],"correctAnswer":"Audi"},{"question":"Welke automaker komt oorspronkelijk uit Zweden?","answers":["Volvo","Volkswagen","Peugeot","Renault"],"correctAnswer":"Volvo"},{"question":"Welke automaker produceert elektrische auto\'s met het Model S?","answers":["Tesla","Nissan","BMW","Rivian"],"correctAnswer":"Tesla"},{"question":"Welke automaker produceert de Fiesta?","answers":["Ford","Chevrolet","Toyota","Hyundai"],"correctAnswer":"Ford"},{"question":"Welke automaker heeft een logo met een paard?","answers":["Ferrari","Lamborghini","Jaguar","Tesla"],"correctAnswer":"Ferrari"}]', 'easy', NULL, 'quizza'),
	(2, 'Films', '[{"question":"Wie regisseerde de film \'Ttitanic\'?","answers":["Steven Spielberg","James Cameron","George Lucas","Martin Scorsese"],"correctAnswer":"James Cameron"},{"question":"Welke film won de Oscar voor Beste Film in 1994?","answers":["Forrest Gump","Pulp Fiction","The Shawshank Redemption","The Lion King"],"correctAnswer":"Forrest Gump"},{"question":"Wie speelde de hoofdrol in de film \'The Matrix\'?","answers":["Keanu Reeves","Brad Pitt","Tom Cruise","Leonardo DiCaprio"],"correctAnswer":"Keanu Reeves"},{"question":"Welke film bevat de beroemde uitspraak \'May the Force be with you\'?","answers":["Star Wars","Indiana Jones","Jurassic Park","Avatar"],"correctAnswer":"Star Wars"},{"question":"Wie regisseerde de film \'Jaws\'?","answers":["Steven Spielberg","Christopher Nolan","Ridley Scott","Quentin Tarantino"],"correctAnswer":"Steven Spielberg"},{"question":"In welke film speelt Leonardo DiCaprio de hoofdrol als Jack Dawson?","answers":["Inception","Titanic","The Revenant","Catch Me If You Can"],"correctAnswer":"Titanic"},{"question":"Welke film gaat over een jongen die op een eiland leeft met een robotvriend genaamd Wilson?","answers":["Cast Away","The Terminal","Saving Private Ryan","Forrest Gump"],"correctAnswer":"Cast Away"},{"question":"Wie speelt de hoofdrol in de film \'Iron Man\'?","answers":["Chris Hemsworth","Robert Downey Jr.","Chris Evans","Mark Ruffalo"],"correctAnswer":"Robert Downey Jr."},{"question":"Welke film speelt zich af in een dystopische toekomst waar mensen deelnemen aan gevaarlijke, realistische spellen?","answers":["The Hunger Games","Divergent","Ready Player One","The Maze Runner"],"correctAnswer":"The Hunger Games"},{"question":"Welke film won de Oscar voor Beste Film in 2017?","answers":["La La Land","Moonlight","The Revenant","Spotlight"],"correctAnswer":"Moonlight"}]', 'normal', NULL, 'quizza'),
	(3, 'Vlaggen', '[{"question":"Welke kleur heeft de vlag van Japan?","answers":["Blauw en wit","Rood en wit","Groen en geel","Zwart en geel"],"correctAnswer":"Rood en wit"},{"question":"Welke van de volgende landen heeft een vlag met een maan en een ster?","answers":["Frankrijk","Turkije","Spanje","Italië"],"correctAnswer":"Turkije"},{"question":"Wat is de kleur van de vlag van Duitsland?","answers":["Blauw, wit en rood","Zwart, rood en geel","Groen, geel en wit","Zwart, groen en blauw"],"correctAnswer":"Zwart, rood en geel"},{"question":"Welke kleur heeft de vlag van Italië?","answers":["Blauw, wit en groen","Rood, groen en wit","Rood, wit en blauw","Geel, groen en zwart"],"correctAnswer":"Rood, groen en wit"},{"question":"Welke kleur komt voor op de vlag van Brazilië?","answers":["Blauw, geel en groen","Rood, geel en zwart","Blauw, rood en groen","Geel, groen en zwart"],"correctAnswer":"Blauw, geel en groen"},{"question":"Welke vlag heeft een Union Jack in de hoek?","answers":["Canada","Verenigd Koninkrijk","Australië","Verenigde Staten"],"correctAnswer":"Australië"},{"question":"Wat is het symbool op de vlag van Mexico?","answers":["Een leeuw","Een adelaar met een slang","Een boom","Een schip"],"correctAnswer":"Een adelaar met een slang"},{"question":"Welke van de volgende landen heeft een driehoek op zijn vlag?","answers":["Nepal","Zwitserland","Indonesië","Pakistan"],"correctAnswer":"Nepal"},{"question":"Welke kleur heeft de vlag van Frankrijk?","answers":["Blauw, wit en rood","Blauw, geel en groen","Rood, wit en zwart","Groen, blauw en wit"],"correctAnswer":"Blauw, wit en rood"},{"question":"Welke kleur komt voor op de vlag van Zuid-Afrika?","answers":["Blauw, groen, geel, zwart en rood","Rood, groen en geel","Blauw en wit","Zwart, wit en blauw"],"correctAnswer":"Blauw, groen, geel, zwart en rood"}]', 'hard', NULL, 'quizza'),
	(54, 'quiz', '[{"question":"113 41313144","answers":["34 3411","2","3","4"],"correctAnswer":"34 3411"},{"question":"41 4 13413 4134","answers":["1","2"],"correctAnswer":"1"}]', 'normal', NULL, 'quizza'),
	(55, 'quiz', '[]', 'normal', NULL, 'quizza'),
	(56, 'quiz', '[]', 'normal', NULL, 'quizza'),
	(57, 'quiz', '[{"question":"13 431 3413 4","answers":["131","1"],"correctAnswer":"131"}]', 'normal', NULL, 'quizza'),
	(58, 'quiz', '[{"question":"13 431 3413 4","answers":["131","1"],"correctAnswer":"131"},{"question":"1 43 14234 31413","answers":["1","1"],"correctAnswer":"1"}]', 'normal', NULL, 'quizza');

-- Dumping structure for table quiz.q_users
CREATE TABLE IF NOT EXISTS `q_users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `accountType` varchar(50) DEFAULT 'student',
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `elo` int(11) DEFAULT 0,
  `log` longtext DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=203 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table quiz.q_users: ~17 rows (approximately)
INSERT INTO `q_users` (`id`, `username`, `accountType`, `email`, `password`, `elo`, `log`) VALUES
	(10, NULL, 'user', '6047730@mborijnland.nl', '1', 0, NULL),
	(11, NULL, 'teacher', 'alem@gmail.com', 'alem', 0, NULL),
	(12, NULL, 'teacher', 'alem@mborijnland.nl', '1', 0, NULL),
	(13, NULL, 'user', 'redarbib48@gmail.com', '1', 0, NULL),
	(14, NULL, 'user', 'jtnadrooi@gmail.com', 'amogus', 0, NULL),
	(21, NULL, 'user', '1@gmail.com', '1', 0, NULL),
	(92, NULL, 'user', 'redarbib48@gmail.com', '123456', 0, NULL),
	(93, NULL, 'user', '1@gmail.com', '2', 0, NULL),
	(94, NULL, 'user', '2223@gmail.com', '1', 0, NULL),
	(95, NULL, 'teacher', 'alemal569@gmail.com', '1', 0, NULL),
	(197, NULL, 'user', 'sander@flopper.nl', 'sander', 0, NULL),
	(198, NULL, 'user', 'salehn@nigger.com', '12345', 0, NULL),
	(199, NULL, 'user', 'brandon@mail.com', 'brandon', 0, NULL),
	(200, NULL, 'user', 'jtnadrooi@gmail.com', 'a', 0, NULL),
	(201, NULL, 'user', 'sander@sander.nl', '1234', 0, NULL),
	(202, NULL, 'teacher', 'test@test.com', 'test', 0, NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
