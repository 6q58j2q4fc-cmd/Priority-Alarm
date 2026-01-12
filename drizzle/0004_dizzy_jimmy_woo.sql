CREATE TABLE `scheduler_config` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`enabled` boolean NOT NULL DEFAULT true,
	`articlesPerDay` int NOT NULL DEFAULT 2,
	`lastRunAt` timestamp,
	`nextRunAt` timestamp,
	`topics` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `scheduler_config_id` PRIMARY KEY(`id`),
	CONSTRAINT `scheduler_config_name_unique` UNIQUE(`name`)
);
