-- Sample users
INSERT INTO app_user (first_name, last_name, email, password, user_role, preferred_language, preferred_currency, created_at) VALUES
('Kelsey',   'Mwangi', 'kelsey.mwangi@vt.edu',   'budgetpass1', 'Undergraduate', 'English', 'USD', '2026-01-10'),
('Ariya',    'Das',    'ariya.das@vt.edu',       'budgetpass2', 'Graduate',      'English', 'USD', '2026-01-11'),
('Faith',    'Yuan',   'faith.yuan@gmail.com',   'budgetpass3', 'Alumni',        'English', 'USD', '2026-01-12'),
('Jordan',   'Rivera', 'jrivera@vt.edu',         'budgetpass4', 'FacultyStaff',  'English', 'USD', '2026-01-12'),
('Mina',     'Lopez',  'mina.lopez@vt.edu',      'budgetpass5', 'Undergraduate', 'Spanish', 'USD', '2026-01-13');

-- Sample categories
INSERT INTO category (category_name, category_type) VALUES
('Dining Out',      'Expense'),
('Rent',            'Expense'),
('Subscriptions',   'Expense'),
('Transportation',  'Expense'),
('Research Travel', 'Expense'),
('Salary',          'Income'),
('Stipend',         'Income'),
('Family Transfer', 'Income');

-- Sample income
INSERT INTO income (user_id, amount, source, income_type, date_received, notes) VALUES
(1, 450.00,  'Work-study',      'Recurring', '2026-02-01', 'February campus job payment'),
(2, 2200.00, 'Graduate stipend','Recurring', '2026-02-01', 'Monthly PhD stipend'),
(3, 5200.00, 'Employer salary', 'Recurring', '2026-02-01', 'Monthly take-home pay'),
(4, 6800.00, 'University payroll','Recurring','2026-02-01', 'Faculty salary'),
(5, 300.00,  'Family support',  'One-time',  '2026-02-05', 'Help with textbooks');

-- Sample budgets
INSERT INTO budget (user_id, category_id, budget_limit, budget_remaining, start_date, end_date) VALUES
(1, 1, 120.00, 45.50,  '2026-02-01', '2026-02-28'),
(1, 3,  35.00, 10.01,  '2026-02-01', '2026-02-28'),
(2, 5, 600.00, 220.00, '2026-02-01', '2026-02-28'),
(3, 2, 1400.00, 150.00,'2026-02-01', '2026-02-28'),
(4, 4, 250.00, 80.00,  '2026-02-01', '2026-02-28');

-- Sample expenses
INSERT INTO expense (user_id, category_id, amount, expense_date, payment_method, notes, is_reimbursable) VALUES
(1, 1, 12.50,  '2026-02-03', 'Debit Card',  'Coffee and sandwich', FALSE),
(1, 3, 10.99,  '2026-02-04', 'Credit Card', 'Spotify student plan', FALSE),
(2, 5, 180.75, '2026-02-06', 'Credit Card', 'Conference taxi fare', TRUE),
(3, 2, 1250.00,'2026-02-01', 'Bank Transfer','Monthly apartment rent', FALSE),
(4, 4, 42.30,  '2026-02-08', 'Mobile Pay',  'Gas refill', FALSE);

-- Sample goals
INSERT INTO goal (user_id, goal_name, target_amount, current_amount, target_date, goal_type) VALUES
(1, 'Spring Break Savings', 500.00, 145.00, '2026-04-15', 'Savings'),
(2, 'Conference Reimbursement Buffer', 800.00, 300.00, '2026-05-01', 'Savings'),
(3, 'Emergency Fund', 5000.00, 1800.00, '2026-12-31', 'Savings'),
(4, 'Retirement Catch-Up', 12000.00, 3500.00, '2026-12-31', 'Savings'),
(5, 'Pay Off Laptop Balance', 900.00, 200.00, '2026-08-15', 'Debt Reduction');

-- Sample recurring transactions
INSERT INTO recurring_transaction (user_id, transaction_name, amount, transaction_type, frequency, start_date, end_date) VALUES
(1, 'Netflix',           7.99,   'Expense', 'Monthly',  '2026-01-15', NULL),
(2, 'Graduate Stipend',  2200.00,'Income',  'Monthly',  '2026-01-01', NULL),
(3, 'Student Loan',      320.00, 'Expense', 'Monthly',  '2026-02-10', NULL),
(4, 'Mortgage',          1850.00,'Expense', 'Monthly',  '2026-01-01', NULL),
(5, 'Campus Shuttle Pass', 15.00,'Expense', 'Semester', '2026-01-20', '2026-05-15');

-- Sample notifications
INSERT INTO notification (user_id, notification_type, message, date, is_read) VALUES
(1, 'Budget Warning',       'You have used over 75% of your Dining Out budget.', '2026-02-20', FALSE),
(1, 'Subscription Renewal', 'Your Spotify subscription renews tomorrow.',         '2026-02-27', TRUE),
(2, 'Bill Reminder',        'Submit your reimbursable research expenses this week.', '2026-02-18', FALSE),
(3, 'Goal Milestone',       'You reached 35% of your Emergency Fund goal.',       '2026-02-16', TRUE),
(4, 'Recurring Payment',    'Mortgage payment is due in 3 days.',                 '2026-02-25', FALSE);
