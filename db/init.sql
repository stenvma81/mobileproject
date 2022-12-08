SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sampledb`
--

-- --------------------------------------------------------

--
-- Table structure for table `sample`
--

CREATE TABLE `sample` (
  `id` int(255) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `sample` (`id`, `name`) VALUES
(1, 'This'),
(2, 'is'),
(3, 'a'),
(4, 'sample'),
(5, 'database'),
(6, 'for'),
(7, 'our'),
(8, 'app');

CREATE TABLE `role` (
  `id` int(10) NOT NULL PRIMARY KEY,
  `description` varchar(20)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `posttype` (
  `id` int(10) NOT NULL PRIMARY KEY,
  `title` varchar(20)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `poststate` (
  `id` int(10) NOT NULL PRIMARY KEY,
  `title` varchar(20)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `user` (
  `id` int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `employeeid` varchar(20),
  `email` varchar(250),
  `password` varchar(50),
  `role` int(10) NOT NULL,
  FOREIGN KEY(role) REFERENCES role(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- INSERT INTO user VALUES (employeeid=1, email="email", password="passwod", role=1);

CREATE TABLE `post` (
  `id` int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `userid` int(10) NOT NULL,
  FOREIGN KEY(userid) REFERENCES user(id),
  `title` varchar(50),
  `description` varchar(250),
  `location` varchar(50),
  `type` int(10) NOT NULL,
  FOREIGN KEY(type) REFERENCES posttype(id),
  `state` int DEFAULT(0),
  FOREIGN KEY(state) REFERENCES poststate(id),
  `areamarker` varchar(100),
  `mediafilename` text,
  `created_date` datetime DEFAULT(CURRENT_TIMESTAMP),
  `closed_date` datetime
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `message` (
  `id` int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `userid` int(10) NOT NULL,
  FOREIGN KEY(userid) REFERENCES user(id),
  `postid` int(10) NOT NULL,
  FOREIGN KEY(postid) REFERENCES post(id),
  `text` varchar(250),
  `created_date` datetime DEFAULT(CURRENT_TIMESTAMP),
  `closed_date` datetime
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `message_user_viewed` (
  `id` int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `userid` int(10) NOT NULL,
  FOREIGN KEY(userid) REFERENCES user(id),
  `messageid` int(10) NOT NULL,
  FOREIGN KEY(messageid) REFERENCES message(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sample`
--

INSERT INTO `role` (`id`, `description`) VALUES (1, 'admin'), (2, 'user');
INSERT INTO `posttype`(`id`, `title`) VALUES 
(1, 'Feeback'),
(2, 'Service advice'), 
(3, 'Safety advice');

INSERT INTO `poststate`(`id`, `title`) VALUES 
(0, 'Open'),
(1, 'Processing'), 
(2, 'Closed');

-- Insert for test
INSERT INTO `user`(employeeid, email, password, role) VALUES ('123456', 'user1@test.com', 'somePW', 1);
INSERT INTO `user`(employeeid, email, password, role) VALUES ('234567', 'user2@test.com', 'somePW', 1);
INSERT INTO `user`(employeeid, email, password, role) VALUES ('345678', 'user3@test.com', 'somePW', 1);
INSERT INTO `user`(employeeid, email, password, role) VALUES ('654321', 'user@test.com', 'somePW', 2);

INSERT INTO `post` (userid, description, type, title, location, areamarker) VALUES (1, 'Some desc', 1, "Vessa rikki", "Vessa kerros 2", "{}");

INSERT INTO message(userid, postid, text) VALUES (1, 1, "This is a message");
--
-- Indexes for dumped tables
--

--
-- Indexes for table `sample`
--
ALTER TABLE `sample`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sample`
--
ALTER TABLE `sample`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;