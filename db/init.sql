SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

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
INSERT INTO `user`(employeeid, email, password, role) VALUES ('Pirjo Mäkinen', 'user1@test.com', 'somePW', 1);
INSERT INTO `user`(employeeid, email, password, role) VALUES ('Tatu Ihaksi', 'user2@test.com', 'somePW', 2);
INSERT INTO `user`(employeeid, email, password, role) VALUES ('Matti Stenvall', 'user3@test.com', 'somePW', 2);
INSERT INTO `user`(employeeid, email, password, role) VALUES ('Merili Elnadi', 'user@test.com', 'somePW', 2);

INSERT INTO `post` (userid, description, type, title, location, areamarker, state) VALUES (2, 'Vessanpöntössä ei ole vettä.', 2, "Vessa rikki", "Vessa kerros 2", "{""top"":57.52162678350747,""left"":43.87596899224806}", 1);
INSERT INTO `post` (userid, description, type, title, location, areamarker) VALUES (3, 'Keittiö on pysynyt siistinä viime viikon konferensista huolimatta.', 1, "Homma toimii!", "", "{""top"":57.52162678350747,""left"":43.87596899224806}");
INSERT INTO `post` (userid, description, type, title, location, areamarker) VALUES (4, 'Aulassa olevan sähköpistokkeen johdot roikkuvat.', 3, "Aulan sähköpistoke", "Kerros 3 aula", "{""top"":57.52162678350747,""left"":43.87596899224806}");

INSERT INTO message(userid, postid, text) VALUES (1, 1, "Tarkentaisitko, mikä vessa on kyseessä?");

ALTER TABLE `sample`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `sample`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;