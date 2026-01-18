# Database Setup Instructions

## Quick Setup

Run this command from the project root:

```bash
mysql -u root -p < backend/database/schema.sql
```

This will:
- Prompt you for your MySQL root password
- Create the database `applyrec`
- Create the `users` table
- Create the `applications` table with all indexes and foreign keys

## What the Schema Creates

### Database
- **Name**: `applyrec`

### Tables

#### 1. `users`
- `id` - Primary key (auto-increment)
- `email` - Unique email address
- `password` - Hashed password (bcrypt)
- `created_at` - Timestamp

#### 2. `applications`
- `id` - Primary key (auto-increment)
- `user_id` - Foreign key to users.id
- `company` - Company name
- `role` - Job role
- `status` - ENUM: Applied, OA, Interview, Rejected, Offer
- `applied_date` - Date of application

## Verify Database Creation

After running the schema, verify it worked:

```bash
mysql -u root -p -e "USE applyrec; SHOW TABLES;"
```

You should see:
```
+--------------------------+
| Tables_in_applyrec |
+--------------------------+
| applications             |
| users                    |
+--------------------------+
```

## Troubleshooting

### "Access denied" error
- Make sure you're using the correct MySQL username and password
- If you haven't set a password, try: `mysql -u root < backend/database/schema.sql`

### "Command not found: mysql"
- Install MySQL first
- Or use full path: `/opt/homebrew/bin/mysql` (on macOS with Homebrew)

### "Can't connect to MySQL server"
- Make sure MySQL is running
- On macOS: `brew services start mysql` (if installed via Homebrew)
- Or start MySQL service from System Preferences

## Manual Setup (Alternative)

If the command doesn't work, you can:

1. Open MySQL:
   ```bash
   mysql -u root -p
   ```

2. Copy and paste the contents of `schema.sql` into the MySQL prompt

3. Or use (replace with your actual path):
   ```sql
   source /path/to/backend/database/schema.sql;
   ```
