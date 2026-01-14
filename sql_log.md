### INTRO
This file will be used as a log of the SQL commands I've run

### ENTER SQL MODE
set -a
source .env
set +a
psql "$DATABASE_URL"

### CREATE & ALTER COMMANDS

### DISPLAY \d <DB-NAME>
