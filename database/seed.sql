-- Sample users
INSERT INTO app_user
(first_name, last_name, email, password, user_type)
VALUES
('Kelsey','Mwangi','kelsey.mwangi@vt.edu','budgetpass1','User'),
('Ariya','Das','ariya.das@vt.edu','budgetpass2','User'),
('Faith','Yuan','faith.yuan@gmail.com','budgetpass3','User'),
('Jordan','Rivera','jrivera@vt.edu','budgetpass4','Admin'),
('Mina','Lopez','mina.lopez@vt.edu','budgetpass5','User'),
('Ethan','Kim','ethan.kim@vt.edu','budgetpass6','User'),
('Sofia','Garcia','sofia.garcia@vt.edu','budgetpass7','User'),
('Liam','Nguyen','liam.nguyen@vt.edu','budgetpass8','User'),
('Olivia','Patel','olivia.patel@vt.edu','budgetpass9','User'),
('Noah','Smith','noah.smith@gmail.com','budgetpass10','User'),
('Emma','Brown','emma.brown@vt.edu','budgetpass11','User'),
('Ava','Johnson','ava.johnson@vt.edu','budgetpass12','User'),
('Lucas','Martinez','lucas.martinez@vt.edu','budgetpass13','Admin'),
('Mason','Davis','mason.davis@vt.edu','budgetpass14','User'),
('Isabella','Wilson','isabella.wilson@vt.edu','budgetpass15','User'),
('James','Taylor','james.taylor@vt.edu','budgetpass16','Admin'),
('Charlotte','Anderson','charlotte.anderson@vt.edu','budgetpass17','User'),
('Benjamin','Thomas','benjamin.thomas@vt.edu','budgetpass18','User'),
('Amelia','Hernandez','amelia.hernandez@vt.edu','budgetpass19','User'),
('Elijah','Moore','elijah.moore@gmail.com','budgetpass20','User');
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
(5, 300.00,  'Family support',  'One-time',  '2026-02-05', 'Help with textbooks'),
(6, 600.00,'Part-time job','Recurring','2026-02-01','Campus dining job'),
(7, 2100.00,'Graduate stipend','Recurring','2026-02-01','Monthly stipend'),
(8, 400.00,'Tutoring','Recurring','2026-02-02','Math tutoring'),
(9, 2300.00,'Research assistant','Recurring','2026-02-01','RA position'),
(10,5000.00,'Salary','Recurring','2026-02-01','Tech job'),
(11,350.00,'Freelance','One-time','2026-02-03','Design project'),
(12,2000.00,'Stipend','Recurring','2026-02-01','Grad stipend'),
(13,7000.00,'Faculty salary','Recurring','2026-02-01','Professor pay'),
(14,450.00,'Campus job','Recurring','2026-02-01','Library assistant'),
(15,2200.00,'TA stipend','Recurring','2026-02-01','Teaching assistant'),
(16,6500.00,'Salary','Recurring','2026-02-01','Admin role'),
(17,300.00,'Side hustle','One-time','2026-02-05','Selling items'),
(18,2400.00,'Graduate stipend','Recurring','2026-02-01','Monthly stipend'),
(19,500.00,'Internship','Recurring','2026-02-01','Part-time internship'),
(20,4800.00,'Salary','Recurring','2026-02-01','Industry job');

-- Sample budgets
INSERT INTO budget (user_id, category_id, budget_limit, budget_remaining, start_date, end_date) VALUES
(1, 1, 120.00, 45.50,  '2026-02-01', '2026-02-28'),
(1, 3,  35.00, 10.01,  '2026-02-01', '2026-02-28'),
(2, 5, 600.00, 220.00, '2026-02-01', '2026-02-28'),
(3, 2, 1400.00, 150.00,'2026-02-01', '2026-02-28'),
(4, 4, 250.00, 80.00,  '2026-02-01', '2026-02-28'),
(6,1,150.00,80.00,'2026-02-01','2026-02-28'),
(7,4,300.00,150.00,'2026-02-01','2026-02-28'),
(8,3,50.00,20.00,'2026-02-01','2026-02-28'),
(9,5,800.00,400.00,'2026-02-01','2026-02-28'),
(10,2,1500.00,200.00,'2026-02-01','2026-02-28'),
(11,1,100.00,60.00,'2026-02-01','2026-02-28'),
(12,4,200.00,120.00,'2026-02-01','2026-02-28'),
(13,2,2000.00,500.00,'2026-02-01','2026-02-28'),
(14,3,40.00,15.00,'2026-02-01','2026-02-28'),
(15,1,130.00,70.00,'2026-02-01','2026-02-28'),
(16,4,400.00,200.00,'2026-02-01','2026-02-28'),
(17,1,120.00,50.00,'2026-02-01','2026-02-28'),
(18,5,700.00,300.00,'2026-02-01','2026-02-28'),
(19,3,60.00,30.00,'2026-02-01','2026-02-28'),
(20,2,1300.00,100.00,'2026-02-01','2026-02-28');

-- Sample expenses
INSERT INTO expense (user_id, category_id, amount, expense_date, payment_method, notes, is_reimbursable) VALUES
(1, 1, 12.50,  '2026-02-03', 'Debit Card',  'Coffee and sandwich', FALSE),
(1, 3, 10.99,  '2026-02-04', 'Credit Card', 'Spotify student plan', FALSE),
(2, 5, 180.75, '2026-02-06', 'Credit Card', 'Conference taxi fare', TRUE),
(3, 2, 1250.00,'2026-02-01', 'Bank Transfer','Monthly apartment rent', FALSE),
(4, 4, 42.30,  '2026-02-08', 'Mobile Pay',  'Gas refill', FALSE),
(6,1,15.00,'2026-02-02','Debit Card','Lunch',FALSE),
(7,4,60.00,'2026-02-03','Credit Card','Uber rides',TRUE),
(8,3,9.99,'2026-02-04','Credit Card','Netflix',FALSE),
(9,5,300.00,'2026-02-05','Credit Card','Flight booking',TRUE),
(10,2,1300.00,'2026-02-01','Bank Transfer','Rent',FALSE),
(11,1,20.00,'2026-02-06','Debit Card','Dinner',FALSE),
(12,4,35.00,'2026-02-07','Mobile Pay','Bus pass',FALSE),
(13,2,1800.00,'2026-02-01','Bank Transfer','Mortgage',FALSE),
(14,3,12.99,'2026-02-08','Credit Card','Spotify',FALSE),
(15,1,18.50,'2026-02-09','Debit Card','Food',FALSE),
(16,4,50.00,'2026-02-10','Credit Card','Gas',FALSE),
(17,1,25.00,'2026-02-11','Debit Card','Dining',FALSE),
(18,5,200.00,'2026-02-12','Credit Card','Conference',TRUE),
(19,3,14.99,'2026-02-13','Credit Card','Subscription',FALSE),
(20,2,1200.00,'2026-02-01','Bank Transfer','Rent',FALSE);

-- Sample goals
INSERT INTO goal (user_id, goal_name, target_amount, current_amount, target_date, goal_type) VALUES
(1, 'Spring Break Savings', 500.00, 145.00, '2026-04-15', 'Savings'),
(2, 'Conference Reimbursement Buffer', 800.00, 300.00, '2026-05-01', 'Savings'),
(3, 'Emergency Fund', 5000.00, 1800.00, '2026-12-31', 'Savings'),
(4, 'Retirement Catch-Up', 12000.00, 3500.00, '2026-12-31', 'Savings'),
(5, 'Pay Off Laptop Balance', 900.00, 200.00, '2026-08-15', 'Debt Reduction'),
(6,'Vacation Fund',1000.00,200.00,'2026-06-01','Savings'),
(7,'Research Travel Fund',1500.00,500.00,'2026-07-01','Savings'),
(8,'Laptop Upgrade',1200.00,300.00,'2026-08-01','Savings'),
(9,'Conference Savings',2000.00,800.00,'2026-09-01','Savings'),
(10,'Emergency Fund',6000.00,2000.00,'2026-12-31','Savings'),
(11,'Pay Off Credit Card',800.00,250.00,'2026-05-01','Debt Reduction'),
(12,'Savings Goal',2000.00,600.00,'2026-10-01','Savings'),
(13,'Retirement',15000.00,5000.00,'2026-12-31','Savings'),
(14,'Spring Trip',700.00,200.00,'2026-04-01','Savings'),
(15,'New Phone',900.00,400.00,'2026-06-15','Savings'),
(16,'Car Fund',5000.00,1200.00,'2026-11-01','Savings'),
(17,'Emergency Fund',3000.00,900.00,'2026-12-31','Savings'),
(18,'Conference Fund',1800.00,600.00,'2026-08-01','Savings'),
(19,'Debt Payoff',1200.00,300.00,'2026-07-01','Debt Reduction'),
(20,'Travel Fund',2500.00,700.00,'2026-09-01','Savings');

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
