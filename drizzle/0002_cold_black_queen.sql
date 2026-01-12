CREATE TABLE `articles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(255) NOT NULL,
	`title` varchar(500) NOT NULL,
	`excerpt` text,
	`content` text NOT NULL,
	`category` varchar(100) NOT NULL,
	`tags` text,
	`metaDescription` varchar(160),
	`metaKeywords` varchar(500),
	`featuredImage` varchar(500),
	`authorName` varchar(100) DEFAULT 'Kevin Rea',
	`authorEmail` varchar(320) DEFAULT 'kevin@reacohomes.com',
	`authorPhone` varchar(50) DEFAULT '541-390-9848',
	`status` enum('draft','published','archived') NOT NULL DEFAULT 'published',
	`views` int NOT NULL DEFAULT 0,
	`clicks` int NOT NULL DEFAULT 0,
	`publishedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `articles_id` PRIMARY KEY(`id`),
	CONSTRAINT `articles_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `bot_activity_log` (
	`id` int AUTO_INCREMENT NOT NULL,
	`activityType` enum('content_generation','seo_optimization','keyword_research','trend_analysis','distribution','lead_outreach','performance_analysis','learning_update') NOT NULL,
	`description` text NOT NULL,
	`status` enum('started','in_progress','completed','failed') NOT NULL DEFAULT 'started',
	`result` text,
	`articlesGenerated` int DEFAULT 0,
	`leadsGenerated` int DEFAULT 0,
	`trafficIncrease` int DEFAULT 0,
	`duration` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	CONSTRAINT `bot_activity_log_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bot_learning_state` (
	`id` int AUTO_INCREMENT NOT NULL,
	`category` varchar(100) NOT NULL,
	`key` varchar(255) NOT NULL,
	`value` text NOT NULL,
	`score` int DEFAULT 0,
	`lastUpdated` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `bot_learning_state_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `distribution_queue` (
	`id` int AUTO_INCREMENT NOT NULL,
	`articleId` int NOT NULL,
	`platform` varchar(100) NOT NULL,
	`status` enum('pending','processing','completed','failed') NOT NULL DEFAULT 'pending',
	`scheduledFor` timestamp,
	`processedAt` timestamp,
	`result` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `distribution_queue_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `marketing_metrics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`articleId` int,
	`platform` varchar(100) NOT NULL,
	`impressions` int NOT NULL DEFAULT 0,
	`clicks` int NOT NULL DEFAULT 0,
	`conversions` int NOT NULL DEFAULT 0,
	`reach` int NOT NULL DEFAULT 0,
	`distributedTo` text,
	`distributedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `marketing_metrics_id` PRIMARY KEY(`id`)
);
