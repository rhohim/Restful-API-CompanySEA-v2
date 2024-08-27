-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 27, 2024 at 09:46 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `seoweb`
--

-- --------------------------------------------------------

--
-- Table structure for table `agency`
--

CREATE TABLE `agency` (
  `id` int(11) NOT NULL,
  `photo_profile` text NOT NULL,
  `username` text NOT NULL,
  `image_post` text NOT NULL,
  `likes` int(11) NOT NULL,
  `caption` text NOT NULL,
  `link` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `agency`
--

INSERT INTO `agency` (`id`, `photo_profile`, `username`, `image_post`, `likes`, `caption`, `link`) VALUES
(4, 'https://ik.imagekit.io/cretivox/f3a9a38b-116d-4b35-8f46-8d8abb78166f_cgExRYbhJ.png', 'agis', 'https://ik.imagekit.io/cretivox/filename_km-MPwDNB', 123123, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ', ''),
(5, 'https://ik.imagekit.io/cretivox/f3a9a38b-116d-4b35-8f46-8d8abb78166f_WbUxY5o-p.png', 'Cretivox', 'https://ik.imagekit.io/cretivox/Plaza_Senayan_f5sjGTZtd.png', 553, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ', ''),
(27, 'https://ik.imagekit.io/cretivox/filename_7hrzsLv2m', 'asd', 'https://ik.imagekit.io/cretivox/filename_lpDpDrDoh', 0, 'asd', ''),
(28, 'https://ik.imagekit.io/cretivox/filename_19Y1S-9TG', 'agis', 'https://ik.imagekit.io/cretivox/filename_j4N0iM1GS', 100, 'caption', ''),
(29, 'https://ik.imagekit.io/cretivox/filename_oLL5XQF2Q', 'Samsung', 'https://ik.imagekit.io/cretivox/filename_8dfCn_ufx', 200, 'asdjklasd', ''),
(32, 'https://ik.imagekit.io/cretivox/WhatsApp_Image_2024-08-06_at_1.47.57_PM_1_-removebg-preview_GkuE3CVP7.png', 'update', 'https://ik.imagekit.io/cretivox/sri-sultan-hamengku-buwono-hb-ix-raja-keraton-jogja-yang-juga-bapak-pramuka-indonesia_169_eQsJTXynL.jpeg', 0, 'update', 'update');

-- --------------------------------------------------------

--
-- Table structure for table `article_data`
--

CREATE TABLE `article_data` (
  `id` int(11) NOT NULL,
  `total_visitor` int(11) NOT NULL,
  `total_article` int(11) NOT NULL,
  `last_post` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `article_data`
--

INSERT INTO `article_data` (`id`, `total_visitor`, `total_article`, `last_post`) VALUES
(2, 712000, 231666, '[{\"title\":\"update\",\"description\":\"update\",\"year\":\"update\",\"brand\":\"update\",\"imageurl\":\"https://ik.imagekit.io/cretivox/500x500_MtDlieUDY.png\"},{\"title\":\"update\",\"description\":\"update\",\"year\":\"update\",\"brand\":\"update\",\"imageurl\":\"https://ik.imagekit.io/cretivox/Deluxe_Room__1__mMzle4c2z.png\"},{\"title\":\"update\",\"description\":\"update\",\"year\":\"update\",\"brand\":\"update\",\"imageurl\":\"https://ik.imagekit.io/cretivox/Logo_in_White_-_The_pine_forest_villas_WFCu995A_.png\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(255) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `color` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `category_name`, `color`) VALUES
(1, '', '6'),
(2, '2', 'a'),
(3, '', '');

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `id` int(11) NOT NULL,
  `client_name` varchar(255) NOT NULL,
  `logo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`id`, `client_name`, `logo`) VALUES
(1, 'asd', 'https://ik.imagekit.io/cretivox/filename_32obq1NCe');

-- --------------------------------------------------------

--
-- Table structure for table `division`
--

CREATE TABLE `division` (
  `id` int(11) NOT NULL,
  `division_name` text NOT NULL,
  `image` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `division`
--

INSERT INTO `division` (`id`, `division_name`, `image`, `description`) VALUES
(2, 'Creative', 'https://ik.imagekit.io/cretivox/filename_JHOuD3-rH', ''),
(3, 'Tech', 'https://ik.imagekit.io/cretivox/Man_Technologist_Light_Skin_Tone_7Z_YBhjMq.png', ''),
(7, 'update', 'https://ik.imagekit.io/cretivox/cvox_e9_OU6gjR.jpg', 'update');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `employee_name` text NOT NULL,
  `role` text NOT NULL,
  `image` text NOT NULL,
  `division_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `employee_name`, `role`, `image`, `division_id`) VALUES
(1, 'Moch Aggiat Rachmana', 'update2', 'https://ik.imagekit.io/cretivox/filename_8etKZCJUF', 3),
(3, 'Aggiat Rachmana', 'Head', 'https://ik.imagekit.io/cretivox/filename_EOntDFoWQ', 2);

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `date` text NOT NULL,
  `description` text NOT NULL,
  `background_color` text NOT NULL,
  `image` text NOT NULL,
  `background_image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`id`, `title`, `date`, `description`, `background_color`, `image`, `background_image`) VALUES
(2, 'The day where we begin', '4th September 2024', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ullamcorper sit amet massa id viverra. Donec sollicitudin risus eget magna sodales ullamcorper. Ut at varius orci. In aliquet est dui, eget sodales erat rhoncus sit amet. Nunc vel ornare tellus. Etiam enim magna, tempor ut ex quis, eleifend hendrerit metus. Phasellus ac tortor lectus. Aenean gravida purus nec congue congue. Aliquam nec porttitor sem. Phasellus vitae dictum mi. Duis scelerisque velit cursus suscipit tincidunt. Phasellus congue efficitur quam, sit amet commodo ipsum condimentum nec. Donec cursus ipsum ac lorem egestas ornare. Donec malesuada purus eu dui viverra ornare. Mauris in commodo nulla. In fermentum libero eget efficitur pulvinar. Proin orci est, dapibus in euismod eu, pretium vel nibh. Phasellus blandit urna vitae dui facilisis, ac congue elit laoreet.', '#880808', 'https://ik.imagekit.io/cretivox/filename_P3G7QSTPY', 'https://ik.imagekit.io/cretivox/1920x1080_i8IM0UZ8w.png'),
(4, 'Journey 1', '4th September 2024', 'Testing description', '#0040ff', 'https://ik.imagekit.io/cretivox/filename_nULKh_ZVH', 'https://ik.imagekit.io/cretivox/filename_ZC8FuRgCa'),
(5, 'The Journeey', '4th September 2024', 'testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest', '#000000', 'https://ik.imagekit.io/cretivox/filename_r7ujNPL4p', 'https://ik.imagekit.io/cretivox/filename_S3Z8W7AHg');

-- --------------------------------------------------------

--
-- Table structure for table `ig_data`
--

CREATE TABLE `ig_data` (
  `id` int(11) NOT NULL,
  `total_followers` int(11) NOT NULL,
  `ER` int(11) NOT NULL,
  `last_post` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ig_data`
--

INSERT INTO `ig_data` (`id`, `total_followers`, `ER`, `last_post`) VALUES
(1, 712000, 3, '[{\"title\":\"Buku Kunjaw\",\"description\":\"Lorem ipsum dolor sit amet, consectetur adipi scing elit, sed do eiusmod tempor.\",\"year\":\"2019\",\"brand\":\"Internal\",\"imageurl\":\"https://ik.imagekit.io/cretivox/Konten_nrurabh-4.PNG\",\"link\":\"https://google.com\"},{\"title\":\"Pernah Ngga Pernah\",\"description\":\"Lorem ipsum dolor sit amet, consectetur adipi scing elit, sed do eiusmod tempor.\",\"year\":\"2020\",\"brand\":\"Samsung\",\"imageurl\":\"https://ik.imagekit.io/cretivox/Konten_68H93ySs-.PNG\",\"link\":\"https://google.com\"},{\"title\":\"Siapa\",\"description\":\"Lorem ipsum dolor sit amet, consectetur adipi scing elit, sed do eiusmod tempor.\",\"year\":\"2024\",\"brand\":\"Softex\",\"imageurl\":\"https://ik.imagekit.io/cretivox/Konten_l-ZYfox-H.PNG\",\"link\":\"https://google.com\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `intern_batch`
--

CREATE TABLE `intern_batch` (
  `id` int(11) NOT NULL,
  `batch` text NOT NULL,
  `title` text NOT NULL,
  `image` text NOT NULL,
  `siapa` text NOT NULL,
  `reveal` text NOT NULL,
  `dua_tipe` text NOT NULL,
  `best_intern` text NOT NULL,
  `periode` text NOT NULL,
  `instagram` text NOT NULL,
  `philosophy` text NOT NULL,
  `season` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `intern_batch`
--

INSERT INTO `intern_batch` (`id`, `batch`, `title`, `image`, `siapa`, `reveal`, `dua_tipe`, `best_intern`, `periode`, `instagram`, `philosophy`, `season`) VALUES
(1, 'Batch 8', 'The Dream Boat', 'https://ik.imagekit.io/cretivox/MAIN_POSTER_2__1__jwUkN8Cw1.jpg', 'http://placeimg.com/640/480/nature', 'http://placeimg.com/640/480/nature', 'http://placeimg.com/640/480/nature', 'Bang abang', '2022', '@dream.boat', 'Suatu ketika dalam sebuah perahu menuju ketenangan', '1'),
(2, 'Batch X', 'Finale Season', 'https://ik.imagekit.io/cretivox/MAIN_POSTER_2__1___j71T0jlR.jpg', 'http://placeimg.com/640/480/nature', 'http://placeimg.com/640/480/nature', 'http://placeimg.com/640/480/nature', 'Bang abang', '2023', '@finaleseason', 'Finale season bgt nihhhhhhhhhh', '1'),
(3, 'Batch S.E', 'Resistance in Bloom', 'https://ik.imagekit.io/cretivox/MAIN_POSTER_2__1__WzqNZmGSb.jpg', 'http://placeimg.com/640/480/nature', 'http://placeimg.com/640/480/nature', 'http://placeimg.com/640/480/nature', 'Ka cips', '2023', '@sdn.mekarwangi03', 'Special edition anjayyy special bgttttt', '1'),
(4, 'S2B1', 'Perpetual Arrival', 'https://ik.imagekit.io/cretivox/WhatsApp_Image_2024-07-04_at_08.38.34_k34ePMapwv.jpeg', 'http://placeimg.com/640/480/nature', 'http://placeimg.com/640/480/nature', 'http://placeimg.com/640/480/nature', 'Masih Rahasia', '2024', '@tong_setan_b2s1', 'Orang nya si sini serem serem tapi lucu', '2');

-- --------------------------------------------------------

--
-- Table structure for table `intern_contact`
--

CREATE TABLE `intern_contact` (
  `id` int(11) NOT NULL,
  `contact_name` text NOT NULL,
  `university` text NOT NULL,
  `email` text NOT NULL,
  `phone` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `intern_contact`
--

INSERT INTO `intern_contact` (`id`, `contact_name`, `university`, `email`, `phone`) VALUES
(1, 'sini', 'university sini', 'university@gmail.com', '085726632123'),
(3, 'SAS', 'http://placeimg.com/640/480/animals', '04319820', 'Auto Loan Account');

-- --------------------------------------------------------

--
-- Table structure for table `intern_member`
--

CREATE TABLE `intern_member` (
  `id` int(11) NOT NULL,
  `member_name` text NOT NULL,
  `image` text NOT NULL,
  `university` text NOT NULL,
  `division` text NOT NULL,
  `instagram` text NOT NULL,
  `batch_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `intern_member`
--

INSERT INTO `intern_member` (`id`, `member_name`, `image`, `university`, `division`, `instagram`, `batch_id`) VALUES
(1, 'Yuds', 'https://ik.imagekit.io/cretivox/Hi_BKXZ8pB6h.jpeg', 'Gunadarma University', 'Front end Developer', '@yudhiazhr', 4),
(2, 'Rambs', 'https://ik.imagekit.io/cretivox/Chelsea_Smile_od_IQEDpi.jpeg', 'President University', 'Human Resource', '@rambs', 4),
(3, 'wireless', 'https://ik.imagekit.io/cretivox/WhatsApp_Image_2024-07-04_at_08.38.34_tdzSqoATF.jpeg', '1qEwx7HgrU9JTg3CqjNE2SYS9B', 'South Kenton', 'open-source', 2);

-- --------------------------------------------------------

--
-- Table structure for table `platform`
--

CREATE TABLE `platform` (
  `id` int(11) NOT NULL,
  `value_1` text NOT NULL,
  `unit_1` text NOT NULL,
  `value_2` text NOT NULL,
  `unit_2` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `portofolio`
--

CREATE TABLE `portofolio` (
  `id` int(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `introduction` text NOT NULL,
  `client_id` int(255) NOT NULL,
  `services_id` int(255) NOT NULL,
  `year_project` int(255) NOT NULL,
  `scope` varchar(255) NOT NULL,
  `team` varchar(255) NOT NULL,
  `slug` text NOT NULL,
  `meta_description` text NOT NULL,
  `content_1` varchar(255) NOT NULL,
  `content_2` varchar(255) NOT NULL,
  `portofolio_cover` varchar(255) NOT NULL,
  `created_at` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `random_img`
--

CREATE TABLE `random_img` (
  `id` int(11) NOT NULL,
  `image` text NOT NULL,
  `alt_image` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `random_img`
--

INSERT INTO `random_img` (`id`, `image`, `alt_image`) VALUES
(69, 'https://ik.imagekit.io/cretivox/FOR_BC_4UsX3tcsV.PNG', 'FOR BC.PNG'),
(71, 'https://ik.imagekit.io/cretivox/GSAP_2023_-UHqdZUiV.png', 'GSAP_2023.png');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `services_name` varchar(255) NOT NULL,
  `cover` varchar(255) NOT NULL,
  `short_description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `services_name`, `cover`, `short_description`) VALUES
(1, 'Dr.', '', 'cross-platform'),
(2, 'Dr.', '', 'haptic');

-- --------------------------------------------------------

--
-- Table structure for table `tiktok_data`
--

CREATE TABLE `tiktok_data` (
  `id` int(11) NOT NULL,
  `total_followers` int(11) NOT NULL,
  `total_views` int(11) NOT NULL,
  `last_post` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tiktok_data`
--

INSERT INTO `tiktok_data` (`id`, `total_followers`, `total_views`, `last_post`) VALUES
(1, 712000, 231666, '[{\"title\":\"update\",\"description\":\"update\",\"year\":\"update\",\"brand\":\"update\",\"imageurl\":\"https://ik.imagekit.io/cretivox/1568642069729-stib-di-pariaman_j5XeLtwM_.jpg\",\"link\":\"http://placeimg.com/640/480/animals\"},{\"title\":\"update\",\"description\":\"update\",\"year\":\"update\",\"brand\":\"update\",\"imageurl\":\"https://ik.imagekit.io/cretivox/WhatsApp_Image_2024-07-30_at_3.54.59_PM_UIXBs35MC.jpeg\",\"link\":\"http://placeimg.com/640/480/animals\"},{\"title\":\"update\",\"description\":\"update\",\"year\":\"update\",\"brand\":\"update\",\"imageurl\":\"https://ik.imagekit.io/cretivox/Capture12__mwgO2f1R.JPG\",\"link\":\"http://placeimg.com/640/480/animals\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`) VALUES
(1, 'admin_cbn360', '$2a$12$tg.p0n7qBq4w/I4WMI9FOuFNTa/wiEjEBWdMvouJfGJcdHC09ktZmdULl98s');

-- --------------------------------------------------------

--
-- Table structure for table `youtube_data`
--

CREATE TABLE `youtube_data` (
  `id` int(11) NOT NULL,
  `total_subscribers` int(11) NOT NULL,
  `total_views` int(11) NOT NULL,
  `last_post` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `youtube_data`
--

INSERT INTO `youtube_data` (`id`, `total_subscribers`, `total_views`, `last_post`) VALUES
(1, 712000, 231666, '[{\"title\":\"update\",\"description\":\"update\",\"year\":\"update\",\"brand\":\"update\",\"imageurl\":\"https://ik.imagekit.io/cretivox/1568642069729-stib-di-pariaman_USYE2woiA_.jpg\",\"link\":\"http://placeimg.com/640/480/animals\"},{\"title\":\"update\",\"description\":\"update\",\"year\":\"update\",\"brand\":\"update\",\"imageurl\":\"https://ik.imagekit.io/cretivox/Logo_in_White_-_The_pine_forest_villas_LXqwZoXon.png\",\"link\":\"http://placeimg.com/640/480/animals\"},{\"title\":\"update\",\"description\":\"update\",\"year\":\"update\",\"brand\":\"update\",\"imageurl\":\"https://ik.imagekit.io/cretivox/v2_wTj77yTPW.JPG\",\"link\":\"http://placeimg.com/640/480/animals\"}]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agency`
--
ALTER TABLE `agency`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `article_data`
--
ALTER TABLE `article_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `division`
--
ALTER TABLE `division`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_division` (`division_id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ig_data`
--
ALTER TABLE `ig_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `intern_batch`
--
ALTER TABLE `intern_batch`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `intern_contact`
--
ALTER TABLE `intern_contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `intern_member`
--
ALTER TABLE `intern_member`
  ADD PRIMARY KEY (`id`),
  ADD KEY `batch_id` (`batch_id`);

--
-- Indexes for table `platform`
--
ALTER TABLE `platform`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `portofolio`
--
ALTER TABLE `portofolio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idclient` (`client_id`),
  ADD KEY `idservices` (`services_id`);

--
-- Indexes for table `random_img`
--
ALTER TABLE `random_img`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tiktok_data`
--
ALTER TABLE `tiktok_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `youtube_data`
--
ALTER TABLE `youtube_data`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agency`
--
ALTER TABLE `agency`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `article_data`
--
ALTER TABLE `article_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `division`
--
ALTER TABLE `division`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `ig_data`
--
ALTER TABLE `ig_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `intern_batch`
--
ALTER TABLE `intern_batch`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `intern_contact`
--
ALTER TABLE `intern_contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `intern_member`
--
ALTER TABLE `intern_member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `platform`
--
ALTER TABLE `platform`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `portofolio`
--
ALTER TABLE `portofolio`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `random_img`
--
ALTER TABLE `random_img`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tiktok_data`
--
ALTER TABLE `tiktok_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `youtube_data`
--
ALTER TABLE `youtube_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`division_id`) REFERENCES `division` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `intern_member`
--
ALTER TABLE `intern_member`
  ADD CONSTRAINT `intern_member_ibfk_1` FOREIGN KEY (`batch_id`) REFERENCES `intern_batch` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `portofolio`
--
ALTER TABLE `portofolio`
  ADD CONSTRAINT `portofolio_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `portofolio_ibfk_3` FOREIGN KEY (`services_id`) REFERENCES `services` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
