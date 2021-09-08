CREATE DATABASE IF NOT EXISTS integrator CHARACTER SET = 'utf8mb4' COLLATE = 'utf8mb4_general_ci';

USE integrator;

DROP TABLE IF EXISTS incomings;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS parcels;
DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS accounts;

CREATE TABLE accounts (
    id INTEGER PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    avatar VARCHAR(100),
    email VARCHAR(100) NOT NULL UNIQUE,
	password VARCHAR(100) NOT NULL
);


CREATE TABLE incomings (
    id INTEGER PRIMARY KEY,
    date DATE NOT NULL,
    income DECIMAL(10,2) NOT NULL,
    account_id INTEGER NOT NULL,
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE TABLE categories (
    id INTEGER PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    account_id INTEGER NOT NULL,
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE TABLE cards (
    id INTEGER PRIMARY KEY,
    number VARCHAR(20) NOT NULL UNIQUE,
    type VARCHAR(20) NOT NULL,
    flag SMALLINT NOT NULL,
    limitt DECIMAL(10,2) NOT NULL,
    closed_at SMALLINT NOT NULL,
    current_value DECIMAL(10,2),
    account_id INTEGER NOT NULL,
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE TABLE expenses (
    id INTEGER PRIMARY KEY,
    amount DECIMAL(10,2) NOT NULL,
    date DATE NOT NULL,
    description VARCHAR(100),
    parcel SMALLINT NOT NULL,
    status TINYINT NOT NULL,
    category_id INTEGER NOT NULL,
    card_id INTEGER,
    account_id INTEGER NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (card_id) REFERENCES cards(id),
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE
);

CREATE TABLE parcels (
    id INTEGER PRIMARY KEY,
    due_date DATE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    expense_id INTEGER NOT NULL,
    FOREIGN KEY (expense_id) REFERENCES expenses(id) ON DELETE CASCADE
);