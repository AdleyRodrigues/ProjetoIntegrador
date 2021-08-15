CREATE DATABASE IF NOT EXISTS integrator CHARACTER SET = 'utf8mb4' COLLATE = 'utf8mb4_general_ci';

USE integrator;

DROP TABLE IF EXISTS accounts;
CREATE TABLE accounts (
    id INTEGER PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    avatar VARCHAR(100),
    email VARCHAR(100) NOT NULL UNIQUE,
	password VARCHAR(100) NOT NULL
);

DROP TABLE IF EXISTS incomings;
CREATE TABLE incomings (
    id INTEGER PRIMARY KEY,
    date DATE NOT NULL,
    income DECIMAL(10,2) NOT NULL,
    accounts_id INTEGER,
    FOREIGN KEY (accounts_id) REFERENCES accounts(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS category;
CREATE TABLE category (
    id INTEGER PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

DROP TABLE IF EXISTS cards;
CREATE TABLE cards (
    id INTEGER PRIMARY KEY,
    number INTEGER NOT NULL UNIQUE,
    type VARCHAR(20) NOT NULL,
    flag VARCHAR(20) NOT NULL,
    limitt DECIMAL(10,2) NOT NULL,
    closed_at DATE NOT NULL,
    current_value DECIMAL(10,2)
);

DROP TABLE IF EXISTS expenses;
CREATE TABLE expenses (
    id INTEGER PRIMARY KEY,
    date DATE NOT NULL,
    description VARCHAR(100),
    parcel SMALLINT NOT NULL,
    status TINYINT NOT NULL,
    category_id INTEGER,
    cards_id INTEGER,
    accounts_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES category(id),
    FOREIGN KEY (cards_id) REFERENCES cards(id),
    FOREIGN KEY (accounts_id) REFERENCES accounts(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS parcels;
CREATE TABLE parcels (
    id INTEGER PRIMARY KEY,
    due_date DATE NOT NULL,
    expenses_id INTEGER,
    FOREIGN KEY (expenses_id) REFERENCES expenses(id) ON DELETE CASCADE
);