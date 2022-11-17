-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 17, 2022 at 08:59 AM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `creazione`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
CREATE TABLE IF NOT EXISTS `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_no` varchar(40) NOT NULL,
  `ifsc_code` varchar(40) NOT NULL,
  `bank` varchar(100) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `user_type` int(11) NOT NULL COMMENT '1-customer 2- associate 3-employee',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `account_no` (`account_no`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `account_no`, `ifsc_code`, `bank`, `user_id`, `user_type`, `status`) VALUES
(1, '181881818', 'UBIN0562319', 'UNION BANK OF INDIA ', 1, 1, 1),
(2, '1919191', 'IFSC19199191', 'SBI', 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(50) NOT NULL,
  `image` varchar(100) NOT NULL,
  `pass` varchar(100) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `phone`, `email`, `image`, `pass`, `status`) VALUES
(2, 'hhaha', '88888', 'jajsjsaj', 'nadnadadh', 'ajjaajja', 1),
(3, 'uuuu', '999999999', 'uuuu00', 'nnn00', '666600', 2);

-- --------------------------------------------------------

--
-- Table structure for table `associate`
--

DROP TABLE IF EXISTS `associate`;
CREATE TABLE IF NOT EXISTS `associate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `gender` tinyint(4) NOT NULL COMMENT '0-male 1-female 2-others',
  `email` varchar(80) NOT NULL,
  `commission_rate` int(11) NOT NULL,
  `employee_id` int(11) DEFAULT NULL COMMENT '0-admin anyid-employee id',
  `phone` varchar(15) NOT NULL,
  `balance` double NOT NULL DEFAULT '0',
  `pass` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '1-active 0-not active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `associate`
--

INSERT INTO `associate` (`id`, `name`, `gender`, `email`, `commission_rate`, `employee_id`, `phone`, `balance`, `pass`, `image`, `status`) VALUES
(1, 'Dummy iiiii', 1, 'dummy@gmail.com', 3, 3, '3939393939', 26000, 'ajahahhahah', 'ajjjjjjjjjjjjjjjjjjj', 1);

-- --------------------------------------------------------

--
-- Table structure for table `contact_us`
--

DROP TABLE IF EXISTS `contact_us`;
CREATE TABLE IF NOT EXISTS `contact_us` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `phone_no` varchar(15) NOT NULL,
  `subject` varchar(500) DEFAULT NULL,
  `message` varchar(1000) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `remarks` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
CREATE TABLE IF NOT EXISTS `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `gender` tinyint(4) NOT NULL COMMENT '0-male 1-female 2-others',
  `email` varchar(80) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `balance` double NOT NULL DEFAULT '0',
  `referred_by` varchar(20) DEFAULT NULL,
  `pass` varchar(100) NOT NULL,
  `image` varchar(100) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '1-active 0-not active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `name`, `gender`, `email`, `phone`, `balance`, `referred_by`, `pass`, `image`, `status`) VALUES
(1, 'Bilash', 1, 'emaiai@kaka.po', '919191991', 98000, 'Admin10101', '$2b$10$sK9nPs4C4WIbvkSJ5ZTBIuEsVZGvZMwRwDxhvd3eYyR3kLj570U62', '7d56806e675a892e5055ed43ba21dbbb__1667970088022.jpg', 1),
(2, 'Bilash Halder', 1, 'ibilashhalder@gmail.com', '87654331331', 6000, 'ADMIN002', '$2b$10$c7WCOj6qq6VqU7OMxfpqmel/c0JldvfGy5uORTb0vYecB1iJIfIRu', '7d56806e675a892e5055ed43ba21dbbb__1667970228324.jpg', 1),
(3, 'Bilash Halder', 1, 'ibilashhalder@gmail.co', '8765433130', 6000, 'ADMIN002', '$2b$10$2qb88J1qM7C3biaZIrCPsu2CXGCcewpcZQZdv1nmL48RMDKS0eoSi', '7d56806e675a892e5055ed43ba21dbbb__1667970445854.jpg', 1),
(4, 'full_name', 1, 'nidobe3103@otodir.com', '1188181', 6000, 'ADMIN002', '$2b$10$8u7KKNoo6.jTHKI7RfOD4.OCQFrgOtQzX3UZsJfIRFU.j4E2TG3cG', '7d56806e675a892e5055ed43ba21dbbb__1667970492122.jpg', 1),
(5, 'dipanla', 1, 'akaka@akak.com', '191919191', 6000, 'ajaaj', '$2b$10$FqtIKMkb5vYQ2LyEvATQvekXn9ueqxfES.SBZD3C9zJ1Ul4x5IKhe', '6bbd72744e99ef81f3462ac1533aa986__1667970589711.jpg', 1),
(6, 'Bilash', 1, 'a@a.com', '2828288282', 6000, 'ajajjajajaja', '$2b$10$XwmeEyLHA0HUJBSCR3xmoOX76T.hBH0Oo/cqwk4Ogrw3sBSk3qI5e', 'c6824a15d21d77b6a44a99191aae4481__1667970688449.png', 1),
(7, 'Bilash Halder', 1, 'ibilash@gmail.com', '9609327424', 0, 'ADMIN', '$2b$10$x53CGtwHcR0awJmA0nCnausv6r.E/LaxPsvyPMx/nDGngw1/aqJ3y', '45defb6d0e24986465c85346b63b2143__1668444248943.png', 1),
(8, 'Bilash Halder', 1, 'ibilash@gmail.co', '9609327428', 0, 'ADMIN', '$2b$10$soUNQkfjQ9ywWiIyrEbr4u3nl009m5pNMCc90yvhNaz02xIKFt5Wm', '45defb6d0e24986465c85346b63b2143__1668444457341.png', 1),
(9, 'Dipankar Khan', 1, 'dip@khan.com', '9876543210', 0, 'CRZNCUS10', '$2b$10$6Gmgset34lZHNmhcu8o8zeCBsQhhhRJ1BBsAeuhixc4M8psPCiXeC', '0f04ba650595a3cab8f3dad2321caf46__1668444570065.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `designation`
--

DROP TABLE IF EXISTS `designation`;
CREATE TABLE IF NOT EXISTS `designation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `designation`
--

INSERT INTO `designation` (`id`, `title`) VALUES
(1, 'System Designer'),
(2, 'Web Developer'),
(3, 'Web Developer Test'),
(4, 'Software Designer new'),
(5, 'New Desgination');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
CREATE TABLE IF NOT EXISTS `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `gender` tinyint(4) NOT NULL COMMENT '0-male 1-female 2-others',
  `email` varchar(80) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `balance` double NOT NULL DEFAULT '0',
  `pass` varchar(100) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1' COMMENT '1-active 0-not active',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `name`, `gender`, `email`, `phone`, `balance`, `pass`, `image`, `status`) VALUES
(1, 'Bilash Halder', 1, 'ibilash@gmail.op', '9876987699', 0, '$2b$10$n4WS0hPTqZsuyy16MPbfAee9NQtING9YbRGo6kGjAF6P7w9ayYwQm', 'b16e407218c05a5afcebeea41ecdbe1c__1668493515029.jpg', 1),
(2, 'Bilash Halder', 2, 'ibilash@gmail.opo', '9876987690', 0, '$2b$10$Kf4BEcrZSqrVUrTgnms/z.aFeJGyqoVq98tVvWuV8clH0N7VdRiG6', 'b16e407218c05a5afcebeea41ecdbe1c__1668493515029.jpg', 1),
(3, 'Test Employee', 2, 'test@test.com', '9872190909', 0, '$2b$10$ni.OSLKXKir09eEc2nOEr.6DUUlMOJH3odtbbpE51bMjAkYRYekMq', 'b16e407218c05a5afcebeea41ecdbe1c__1668493515029.jpg', 1),
(4, 'user nnaa', 2, 'user@emp.in', '9898238490', 0, '$2b$10$YJeVey6prQF94KWOp6jSHOMKxGeW8M.0n2pOmfU56WlpgwnBLb4Ue', 'b16e407218c05a5afcebeea41ecdbe1c__1668493515029.jpg', 1),
(5, 'akakk akak', 2, 'kkka@kak.com', '9988776655', 0, '$2b$10$YeUEjpIspF7J0lxsT598b.6OuOeCsx2L1oK2rfOpgWA7pmh1MLx8e', 'b16e407218c05a5afcebeea41ecdbe1c__1668493515029.jpg', 1),
(6, 'Amir Khan', 2, 'amir@gmail.com', '9823908070', 0, '$2b$10$0n/hTDeU.Jegrp7QgHFIVeH7POGruRVESWRJb3KRSh/MkC30TyvTG', 'b16e407218c05a5afcebeea41ecdbe1c__1668493515029.jpg', 1),
(7, 'Test Test', 2, 'test@gmail.oo', '2345987645', 0, '$2b$10$2mVp.4TqZ0ASERf2silQE.0ydlGGtG.cM7LDztEjDn8ubJLJ0vStq', 'b16e407218c05a5afcebeea41ecdbe1c__1668493515029.jpg', 1),
(8, 'Test Emp', 3, 'epm@amam.op', '8766785544', 0, '$2b$10$7Xa0PppE7H0zXWwyuf5gxu/.mmlcYyNvBoKFtMlXBgn7l.arKRqJO', 'b16e407218c05a5afcebeea41ecdbe1c__1668493515029.jpg', 1),
(9, 'Lorem user', 2, 'lorem@lorem.com', '9872340909', 0, '$2b$10$v6dji3H4dAMGgfwUB/z0hu8ZHuVefuwDYgEqY4NIEMoBWMF/JUfs.', 'b16e407218c05a5afcebeea41ecdbe1c__1668493515029.jpg', 1),
(10, 'Lorem ', 2, 'lorem@123.com', '7766554433', 0, '$2b$10$jJdenGo0o7V08LBUk/CHe.TWcVBVtgDiYbJWlG6w9EztC128N12Uq', 'b16e407218c05a5afcebeea41ecdbe1c__1668493515029.jpg', 1),
(11, 'lorem ttt', 2, 'lorem@ttt.com', '9876312345', 0, '$2b$10$AYkveEVgOKzRYkFNhjLgQe39dD456Xp/DZ7ILmdBZzAWrVMCKvISu', 'b16e407218c05a5afcebeea41ecdbe1c__1668493515029.jpg', 1),
(12, 'Lorem ', 3, 'lorem@12322.com', '2233889922', 0, '$2b$10$6kFcufdvG3d5y8.ZtlSaiO1ozIfUWQXiwDQdm.ditVk9zF6O4KWkW', 'b16e407218c05a5afcebeea41ecdbe1c__1668493515029.jpg', 1),
(13, 'Lorem ', 3, 'lorem@ttwt.com', '1122009922', 0, '$2b$10$MuBpeAIIFAf8ucUbfbc/YOhprtuhmaVSCmd.aSr8mFL.Kxb79Oj8q', 'b16e407218c05a5afcebeea41ecdbe1c__1668493515029.jpg', 1),
(14, 'lorem ttt', 2, 'lorm@ttt.com', '2211334455', 0, '$2b$10$xd2mKpcChcPhh/zw1MMLM.rn2lgt3.38kR2JxdRFDsYeR1o/Whlpy', 'b16e407218c05a5afcebeea41ecdbe1c__1668493515029.jpg', 1),
(15, 'Bilas', 2, 'bia@haa.com', '2233449098', 0, '$2b$10$ZPpNJOxlcz5oc6fz8KApAOa1EMY1sS8qWuOUokrD89YnUGj1Ht3ru', 'b16e407218c05a5afcebeea41ecdbe1c__1668493515029.jpg', 1),
(16, 'lorem ttt', 2, 'lorem@lorem.co', '3909218900', 0, '$2b$10$Y0/br5BpQkxNuNvDu2ls.eSwuiJb5x9xHAmBQ7WIx2AZT5pB1HwKW', '2c67f965c6047b1a760b2433859a8869__1668493715219.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `employee_info`
--

DROP TABLE IF EXISTS `employee_info`;
CREATE TABLE IF NOT EXISTS `employee_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `designation_id` int(11) NOT NULL,
  `salary_id` int(11) NOT NULL,
  `leave_id` int(11) DEFAULT NULL,
  `dob` date NOT NULL,
  `report_to` int(11) DEFAULT NULL,
  `joining_date` date NOT NULL,
  `acceptance_file` varchar(100) DEFAULT NULL,
  `id_card` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `investment`
--

DROP TABLE IF EXISTS `investment`;
CREATE TABLE IF NOT EXISTS `investment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `user_type` int(11) NOT NULL DEFAULT '1' COMMENT '1-customer 2-associate 3-Employee',
  `ammount` float NOT NULL,
  `date_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `roi` float NOT NULL DEFAULT '5',
  `nominee_id` int(11) NOT NULL,
  `account_no` varchar(40) NOT NULL,
  `payment_id` varchar(100) DEFAULT NULL,
  `agreement_file` varchar(100) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0-pending 1-Active 2-withdraw 3-close',
  `withdrw_req_time` datetime DEFAULT NULL,
  `is_send` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0-Not send 1-send',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `investment`
--

INSERT INTO `investment` (`id`, `user_id`, `user_type`, `ammount`, `date_time`, `roi`, `nominee_id`, `account_no`, `payment_id`, `agreement_file`, `status`, `withdrw_req_time`, `is_send`) VALUES
(1, 1, 1, 4000, '2022-11-11 10:54:35', 3, 1, '772727272772', '17', NULL, 1, '2022-11-07 12:47:29', 1),
(2, 1, 2, 4000, '2022-11-11 10:55:58', 3, 1, '772727272772', '18', NULL, 1, NULL, 1),
(3, 1, 2, 10000, '2022-11-11 10:56:21', 3, 1, '772727272772', '19', NULL, 1, NULL, 1),
(4, 1, 2, 8000, '2022-11-11 11:00:45', 3, 1, '772727272772', '20', NULL, 1, NULL, 1),
(5, 1, 2, 1000, '2022-11-11 11:01:43', 3, 1, '772727272772', '21', NULL, 1, NULL, 1),
(6, 1, 2, 1000, '2022-11-11 11:44:12', 3, 1, '772727272772', '22', NULL, 1, NULL, 1),
(7, 1, 1, 1000, '2022-11-15 10:30:40', 3, 2, '181881818', '23', NULL, 1, NULL, 1),
(8, 1, 1, 1000, '2022-11-15 10:33:17', 3, 2, '181881818', '24', NULL, 1, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `investment_payments`
--

DROP TABLE IF EXISTS `investment_payments`;
CREATE TABLE IF NOT EXISTS `investment_payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` double NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_type` int(11) NOT NULL,
  `account_no` varchar(100) DEFAULT NULL,
  `ifsc_code` varchar(100) DEFAULT NULL,
  `date_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `kyc`
--

DROP TABLE IF EXISTS `kyc`;
CREATE TABLE IF NOT EXISTS `kyc` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adhar_no` varchar(20) NOT NULL,
  `pan_no` varchar(20) NOT NULL,
  `address` varchar(200) NOT NULL,
  `adhar_verified` tinyint(1) NOT NULL,
  `pan_verified` tinyint(1) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_type` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kyc`
--

INSERT INTO `kyc` (`id`, `adhar_no`, `pan_no`, `address`, `adhar_verified`, `pan_verified`, `user_id`, `user_type`) VALUES
(1, '818818188181', 'ajajjajajja', 'Kolakkakaka', 1, 1, 1, 1),
(2, '4373 2682 6937', 'AIFPH1669F', 'kolkata', 1, 1, 2, 2),
(3, '4373 2682 6937', 'AIFPH1669F', 'Kolkata', 1, 1, 1, 2),
(4, '4373 2682 6937', 'AIFPH1669F', 'Kolkata', 1, 1, 6, 1);

-- --------------------------------------------------------

--
-- Table structure for table `nominee`
--

DROP TABLE IF EXISTS `nominee`;
CREATE TABLE IF NOT EXISTS `nominee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `dob` date NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_type` int(11) NOT NULL COMMENT '1-customer 2-associate',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nominee`
--

INSERT INTO `nominee` (`id`, `name`, `dob`, `user_id`, `user_type`, `status`) VALUES
(1, 'Dibakar Sarkar', '1993-11-12', 1, 1, 1),
(2, 'Susan Day', '2016-06-22', 1, 1, 1),
(3, 'Pallab Rao', '2010-06-17', 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
CREATE TABLE IF NOT EXISTS `payment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `transaction_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `payment_mode` varchar(50) NOT NULL COMMENT '1-offline 2-online 3-others',
  `transaction_id` varchar(40) NOT NULL,
  `ammount` double NOT NULL,
  `status` tinyint(4) NOT NULL COMMENT ' 0-failed 1-success 2-pending',
  `to_account` varchar(40) DEFAULT NULL,
  `from_account` varchar(40) DEFAULT NULL,
  `remarks` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `transaction_time`, `payment_mode`, `transaction_id`, `ammount`, `status`, `to_account`, `from_account`, `remarks`) VALUES
(1, '2022-11-11 10:34:30', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(2, '2022-11-11 10:35:57', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(3, '2022-11-11 10:36:24', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(4, '2022-11-11 10:36:41', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(5, '2022-11-11 10:39:23', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(6, '2022-11-11 10:40:11', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(7, '2022-11-11 10:40:27', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(8, '2022-11-11 10:40:55', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(9, '2022-11-11 10:41:16', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(10, '2022-11-11 10:41:30', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(11, '2022-11-11 10:41:40', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(12, '2022-11-11 10:43:01', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(13, '2022-11-11 10:44:03', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(14, '2022-11-11 10:45:50', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(15, '2022-11-11 10:46:33', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(16, '2022-11-11 10:51:21', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(17, '2022-11-11 10:54:35', '3', 'invesment', 4000, 1, 'creazione', '1_1', 'invesment'),
(18, '2022-11-11 10:55:58', '3', 'invesment', 4000, 1, 'creazione', '2_1', 'invesment'),
(19, '2022-11-11 10:56:21', '3', 'invesment', 10000, 1, 'creazione', '2_1', 'invesment'),
(20, '2022-11-11 11:00:45', '3', 'invesment', 8000, 1, 'creazione', '2_1', 'invesment'),
(21, '2022-11-11 11:01:43', '3', 'invesment', 1000, 1, 'creazione', '2_1', 'invesment'),
(22, '2022-11-11 11:44:12', '3', 'invesment', 1000, 1, 'creazione', '2_1', 'invesment'),
(23, '2022-11-15 10:30:40', '3', 'invesment', 1000, 1, 'creazione', '1_1', 'invesment'),
(24, '2022-11-15 10:33:17', '3', 'invesment', 1000, 1, 'creazione', '1_1', 'invesment');

-- --------------------------------------------------------

--
-- Table structure for table `qualification`
--

DROP TABLE IF EXISTS `qualification`;
CREATE TABLE IF NOT EXISTS `qualification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `degree_name` varchar(100) NOT NULL,
  `year_of_pass` int(11) NOT NULL,
  `degree_from` varchar(100) NOT NULL,
  `marks` float NOT NULL,
  `document_url` varchar(100) NOT NULL,
  `employee_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `qualification`
--

INSERT INTO `qualification` (`id`, `degree_name`, `year_of_pass`, `degree_from`, `marks`, `document_url`, `employee_id`) VALUES
(1, 'B.Sc. in Food Science & Technology', 2012, 'Maulana Abul Kalam Azad University of Technology', 99, '53d702ec9e94bc8f32f903857f18c1bd__1668576482127.pdf', 1),
(2, 'Computer Applications and IT', 2018, 'Jadavpur University', 99, '4b470f9bd8e920eaca3da28f78e2bb71__1668576597660.pdf', 1),
(3, 'M Tech In CSE', 2002, 'University of Kalyani', 72, '53d702ec9e94bc8f32f903857f18c1bd__1668577560199.pdf', 1),
(4, 'Computer Applications and IT', 2012, 'Jadavpur University kolkata', 90, '9eefc1d6833ca344cc0cd11bfea87f64__1668579002468.pdf', 1),
(5, 'Computer Applications and IT', 2019, 'University of Kalyani', 22, '53d702ec9e94bc8f32f903857f18c1bd__1668577720184.pdf', 1);

-- --------------------------------------------------------

--
-- Table structure for table `salary`
--

DROP TABLE IF EXISTS `salary`;
CREATE TABLE IF NOT EXISTS `salary` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `basic` float NOT NULL DEFAULT '0',
  `hra` float NOT NULL DEFAULT '0',
  `conveyance` float NOT NULL DEFAULT '0',
  `medical` float NOT NULL DEFAULT '0',
  `special` float NOT NULL DEFAULT '0',
  `pf` float NOT NULL DEFAULT '0',
  `insurance` float NOT NULL DEFAULT '0',
  `tax` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `salary`
--

INSERT INTO `salary` (`id`, `basic`, `hra`, `conveyance`, `medical`, `special`, `pf`, `insurance`, `tax`) VALUES
(6, 2000, 4000, 1000, 1000, 1000, 250, 50, 50),
(7, 2900, 2000, 1000, 200, 500, 3535, 23, 0),
(8, 3000, 3000, 2000, 3000, 1000, 200, 200, 20),
(9, 1000, 100, 100, 1000, 100, 100, 10, 100),
(10, 1200, 2000, 2000, 100, 1022, 1001, 100, 101),
(11, 1200, 2000, 2000, 100, 1022, 1001, 100, 101),
(12, 1200, 2000, 2000, 100, 1022, 1001, 100, 101),
(13, 1002, 1002, 1002, 100, 100, 100, 100, 100);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
