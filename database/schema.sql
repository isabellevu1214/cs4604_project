-- ClearPath Finance - PostgreSQL Setup Script
-- Creates the database schema and inserts sample data.
-- Designed for PostgreSQL 14+.
DROP TABLE IF EXISTS notification CASCADE;
DROP TABLE IF EXISTS recurring_transaction CASCADE;
DROP TABLE IF EXISTS goal CASCADE;
DROP TABLE IF EXISTS expense CASCADE;
DROP TABLE IF EXISTS budget CASCADE;
DROP TABLE IF EXISTS income CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS app_user CASCADE;

CREATE TABLE app_user (
    user_id      INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name   VARCHAR(50) NOT NULL,
    last_name    VARCHAR(50) NOT NULL,
    email        VARCHAR(255) NOT NULL UNIQUE,
    password     VARCHAR(255) NOT NULL,
    user_type    VARCHAR(30) NOT NULL CHECK (user_type IN ('User', 'Admin')),
    CHECK (char_length(password) >= 8),
    CHECK (email ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$')
);

CREATE TABLE category (
    category_id    INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    category_name  VARCHAR(50) NOT NULL UNIQUE,
    category_type  VARCHAR(20) NOT NULL CHECK (category_type IN ('Expense', 'Income'))
);

CREATE TABLE income (
    income_id      INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id        INTEGER NOT NULL REFERENCES app_user(user_id) ON DELETE CASCADE,
    amount         NUMERIC(10,2) NOT NULL CHECK (amount > 0),
    source         VARCHAR(100) NOT NULL,
    income_type    VARCHAR(20) NOT NULL CHECK (income_type IN ('Recurring', 'One-time')),
    date_received  DATE NOT NULL,
    notes          TEXT
);

CREATE TABLE budget (
    budget_id        INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id          INTEGER NOT NULL REFERENCES app_user(user_id) ON DELETE CASCADE,
    category_id      INTEGER NOT NULL REFERENCES category(category_id),
    budget_limit     NUMERIC(10,2) NOT NULL CHECK (budget_limit > 0),
    budget_remaining NUMERIC(10,2) NOT NULL CHECK (budget_remaining >= 0),
    start_date       DATE NOT NULL,
    end_date         DATE NOT NULL,
    CHECK (start_date < end_date),
    CHECK (budget_remaining <= budget_limit)
);

CREATE TABLE expense (
    expense_id      INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES app_user(user_id) ON DELETE CASCADE,
    category_id     INTEGER NOT NULL REFERENCES category(category_id),
    amount          NUMERIC(10,2) NOT NULL CHECK (amount > 0),
    expense_date    DATE NOT NULL,
    payment_method  VARCHAR(30) NOT NULL CHECK (payment_method IN ('Cash', 'Debit Card', 'Credit Card', 'Bank Transfer', 'Mobile Pay')),
    notes           TEXT,
    is_reimbursable BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE goal (
    goal_id         INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES app_user(user_id) ON DELETE CASCADE,
    goal_name       VARCHAR(100) NOT NULL,
    target_amount   NUMERIC(10,2) NOT NULL CHECK (target_amount > 0),
    current_amount  NUMERIC(10,2) NOT NULL CHECK (current_amount >= 0),
    target_date     DATE NOT NULL,
    goal_type       VARCHAR(30) NOT NULL CHECK (goal_type IN ('Savings', 'Debt Reduction')),
    CHECK (current_amount <= target_amount)
);

CREATE TABLE recurring_transaction (
    recurring_id    INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES app_user(user_id) ON DELETE CASCADE,
    transaction_name VARCHAR(100) NOT NULL,
    amount          NUMERIC(10,2) NOT NULL CHECK (amount > 0),
    transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('Income', 'Expense')),
    frequency       VARCHAR(20) NOT NULL CHECK (frequency IN ('Weekly', 'Biweekly', 'Monthly', 'Semester')),
    start_date      DATE NOT NULL,
    end_date        DATE,
    CHECK (end_date IS NULL OR start_date < end_date)
);

CREATE TABLE notification (
    notification_id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id         INTEGER NOT NULL REFERENCES app_user(user_id) ON DELETE CASCADE,
    notification_type VARCHAR(40) NOT NULL CHECK (
        notification_type IN ('Budget Warning', 'Bill Reminder', 'Goal Milestone', 'Subscription Renewal', 'Recurring Payment')
    ),
    message         TEXT NOT NULL,
    date            DATE NOT NULL,
    is_read         BOOLEAN NOT NULL DEFAULT FALSE
);
