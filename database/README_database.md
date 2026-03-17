# ClearPath Finance – Database Setup Guide

This guide explains how to set up the project database locally using **PostgreSQL** and connect to it using **VS Code (SQLTools)**.

---

## Requirements

Make sure you have the following installed:

* PostgreSQL (with pgAdmin recommended)
* VS Code
* SQLTools extension
* SQLTools PostgreSQL/Redshift Driver

---

## Project Structure

```text
project-root/
  database/
    schema.sql
    seed.sql
    reset.sql
    README.md
```

---

## Step 1: Create the Database

### Option A (Recommended – pgAdmin)

1. Open **pgAdmin**
2. Connect to your server
3. Right-click **Databases → Create → Database**
4. Name it:

```
clearpath_finance
```

---

### Option B (Terminal)

```bash
createdb -U postgres clearpath_finance
```

---

## Step 2: Load Schema and Sample Data

Navigate to the `database/` folder, then run:

```bash
psql -U postgres -d clearpath_finance -f schema.sql
psql -U postgres -d clearpath_finance -f seed.sql
```

OR (recommended):

```bash
psql -U postgres -d clearpath_finance -f reset.sql
```

---

## Step 3: Connect Using VS Code (SQLTools)

### Install Extensions

In VS Code Extensions tab, install:

* SQLTools
* SQLTools PostgreSQL/Cockroach Driver

---

### Create Connection

1. Press:

```
Ctrl + Shift + P
```

2. Select:

```
SQLTools: Add New Connection
```

3. Choose:

```
PostgreSQL
```

4. Enter the following:

```
Name: ClearPath Finance
Server: localhost
Port: 5432
Database: clearpath_finance
Username: postgres
Password: (your PostgreSQL password)
```

5. Save the connection

---

### Connect to Database

1. Open SQLTools sidebar
2. Click your connection
3. Click **Connect**

You should now see:

* Tables
* Schemas
* Data

---

## Step 4: Test the Connection

Create a new `.sql` file and run:

```sql
SELECT * FROM app_user;
SELECT * FROM expense;
```

---

## Reset Database (Important)

If schema changes:

```bash
psql -U postgres -d clearpath_finance -f reset.sql
```

---

## Team Workflow Rules

* All database changes must be made in:

  * `schema.sql`
  * `seed.sql`

* After pulling changes:

  * rerun `reset.sql`

* Do NOT:

  * commit database files
  * commit passwords
  * manually change schema without updating SQL files

---

## Common Issues

### Cannot connect in VS Code

* Make sure PostgreSQL is running

---

### Password issues

* Use the password set in pgAdmin
* If forgotten, reset in pgAdmin

---

### Tables not showing

* Make sure you ran `schema.sql`
* Refresh SQLTools connection

---

## You're Ready!

You can now:

* query the database
* test features
* build backend APIs
* demo your project

---
