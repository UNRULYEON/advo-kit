CREATE TABLE `accounts` (
	`cuid` varchar(256) PRIMARY KEY NOT NULL,
	`user_id` int,
	`type` text,
	`provider` text,
	`providerAccountId` text,
	`refresh_token` text,
	`access_token` text,
	`expires_at` int,
	`token_type` text,
	`scope` text,
	`id_token` text,
	`session_state` text);

CREATE TABLE `cards` (
	`cuid` varchar(256) PRIMARY KEY NOT NULL,
	`deck_id` text,
	`content` text,
	`cardType` enum('normal'));

CREATE TABLE `decks` (
	`cuid` varchar(256) PRIMARY KEY NOT NULL,
	`emoji` text,
	`name` text);

CREATE TABLE `sessions` (
	`cuid` varchar(256) PRIMARY KEY NOT NULL,
	`user_id` int,
	`expires` timestamp,
	`sessionToken` text);

CREATE TABLE `users` (
	`cuid` varchar(256) PRIMARY KEY NOT NULL,
	`name` text,
	`email` text,
	`image` text,
	`emailVerified` timestamp);

CREATE TABLE `verificationTokens` (
	`identifier` text,
	`token` text,
	`expires` timestamp);
