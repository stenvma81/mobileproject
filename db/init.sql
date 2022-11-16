-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Jun 27, 2019 at 01:14 AM
-- Server version: 5.7.26
-- PHP Version: 7.2.19

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
  `created_date` date DEFAULT(CURRENT_TIMESTAMP),
  `closed_date` date DEFAULT(NULL)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `message` (
  `id` int(10) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `userid` int(10) NOT NULL,
  FOREIGN KEY(userid) REFERENCES user(id),
  `postid` int(10) NOT NULL,
  FOREIGN KEY(postid) REFERENCES post(id),
  `text` varchar(250),
  `created_date` date DEFAULT(CURRENT_TIMESTAMP),
  `closed_date` date
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sample`
--

INSERT INTO `role` (`id`, `description`) VALUES (1, 'admin'), (2, 'user');
INSERT INTO `posttype`(`id`, `title`) VALUES 
(1, 'feeback'),
(2, 'service advice'), 
(3, 'safety advice');

INSERT INTO `poststate`(`id`, `title`) VALUES 
(0, 'open'),
(1, 'processing'), 
(2, 'closed');

-- Insert for test
INSERT INTO `user`(employeeid, email, password, role) VALUES ('123456', 'user@test.com', 'somePW', 1);
INSERT INTO `user`(employeeid, email, password, role) VALUES ('654321', 'user@test.com', 'somePW', 2);
INSERT INTO `post` (userid, description, type, title, location) VALUES (1, 'Some desc', 1, "Vessa rikki", "Vessa kerros 2");
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