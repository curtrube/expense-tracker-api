CREATE DATABASE expense_tracker;

CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY NOT NULL,
    merchant TEXT,
    amount MONEY NOT NULL,
    date DATE NOT NULL
)