CREATE TABLE IF NOT EXISTS `articles` (
    `id` int NOT NULL AUTO_INCREMENT,
    `author` varchar(255) NOT NULL,
    `title` varchar(255) NOT NULL,
    `body` text NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;