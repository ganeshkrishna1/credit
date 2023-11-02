-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 02, 2023 at 02:59 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `credit`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `UpdateApplicationStatus` (IN `application_id` INT, IN `new_status` VARCHAR(255))   BEGIN
    -- Check if the application exists
    IF (SELECT COUNT(*) FROM customerapplication WHERE id = application_id) = 1 THEN
        -- Update the status
        UPDATE customerapplication
        SET stat = new_status
        WHERE id = application_id;
        
        SELECT 'Success' AS Status, 'Status updated successfully.' AS Message;
    ELSE
        SELECT 'Error' AS Status, 'Application not found.' AS Message;
    END IF;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Stand-in structure for view `application_status_view`
-- (See below for the actual view)
--
CREATE TABLE `application_status_view` (
`application_id` int(11)
,`applicant_name` varchar(30)
,`date_of_birth` varchar(20)
,`phone_number` varchar(20)
,`applicant_email` varchar(20)
,`applicant_occupation` varchar(20)
,`applicant_income` varchar(20)
,`payslip1_path` varchar(40)
,`payslip2_path` int(11)
,`application_status` varchar(30)
);

-- --------------------------------------------------------

--
-- Table structure for table `creditcard`
--

CREATE TABLE `creditcard` (
  `credit_id` int(11) NOT NULL,
  `credit_application_id` varchar(30) NOT NULL,
  `credit_number` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL,
  `customername` varchar(30) NOT NULL,
  `payslip_id` varchar(30) NOT NULL,
  `application_id` varchar(30) NOT NULL,
  `cibilscore` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customerapplication`
--

CREATE TABLE `customerapplication` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `dob` varchar(20) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `occupation` varchar(20) NOT NULL,
  `income` varchar(20) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `payslip1Path` varchar(40) NOT NULL,
  `payslip2Path` int(11) NOT NULL,
  `stat` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customerapplication`
--

INSERT INTO `customerapplication` (`id`, `name`, `dob`, `phone`, `email`, `occupation`, `income`, `date`, `payslip1Path`, `payslip2Path`, `stat`) VALUES
(1, 'Ganesh', '26/07/2002', '1234567890', '', 'Software ', '500000', '2023-10-25 21:35:23', '', 0, 'no'),
(2, 'Krishna', '12/07/2001', '987654321', '123@gmail.com', 'Business', '50000', '2023-10-25 21:53:24', '', 0, 'yes'),
(3, 'ganesh', '26/07/2002', '1234567890', '123@gmail.com', 'Job', '50000', '2023-10-25 22:22:34', 'uploads\\1698252753994-IT 7103 Mid Term Q', 0, 'no'),
(4, 'Akash', '1/07/2001', '123456799', 'abc@gmail.com', 'engineer', '80000', '2023-10-26 00:17:38', 'uploads\\1698259658437-annotated-sprint2-', 0, 'no'),
(5, 'Pavan Chintakayala', '18/06/2002', '7671831838', 'pa1chintakayala@gmai', 'Software Engineer', '50000', '2023-11-02 19:17:59', 'uploads\\1698932879210-Database+-+Part+II', 0, 'no');

--
-- Triggers `customerapplication`
--
DELIMITER $$
CREATE TRIGGER `application_added_trigger` AFTER INSERT ON `customerapplication` FOR EACH ROW BEGIN
    -- You can perform any action you want here.
    -- In this example, we will insert a record into a log table with a timestamp.
    INSERT INTO application_log (application_id, timestamp)
    VALUES (NEW.id, NOW());
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `payslips`
--

CREATE TABLE `payslips` (
  `slip_id` int(11) NOT NULL,
  `slip_month1` varchar(30) NOT NULL,
  `slip_month2` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role_type` varchar(30) NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userid` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userid`, `name`, `username`, `email`, `password`) VALUES
(1, 'ganesh', 'ganesh123', 'admin@gmail.com', 'admin');

-- --------------------------------------------------------

--
-- Structure for view `application_status_view`
--
DROP TABLE IF EXISTS `application_status_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `application_status_view`  AS SELECT `c`.`id` AS `application_id`, `c`.`name` AS `applicant_name`, `c`.`dob` AS `date_of_birth`, `c`.`phone` AS `phone_number`, `c`.`email` AS `applicant_email`, `c`.`occupation` AS `applicant_occupation`, `c`.`income` AS `applicant_income`, `c`.`payslip1Path` AS `payslip1_path`, `c`.`payslip2Path` AS `payslip2_path`, `c`.`stat` AS `application_status` FROM `customerapplication` AS `c` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `creditcard`
--
ALTER TABLE `creditcard`
  ADD PRIMARY KEY (`credit_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `customerapplication`
--
ALTER TABLE `customerapplication`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payslips`
--
ALTER TABLE `payslips`
  ADD PRIMARY KEY (`slip_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `creditcard`
--
ALTER TABLE `creditcard`
  MODIFY `credit_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customerapplication`
--
ALTER TABLE `customerapplication`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `payslips`
--
ALTER TABLE `payslips`
  MODIFY `slip_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
