import os
import psycopg2
from dotenv import load_dotenv

# Try loading .env from root directory
dotenv_paths = [".env", "../.env", "../../.env"]
loaded = False
for path in dotenv_paths:
    if os.path.exists(path):
        load_dotenv(dotenv_path=path)
        loaded = True
        print(f"Loaded .env from: {path}")
        break

if not loaded:
    print("WARNING: No .env file found!")

db_url = os.getenv("DATABASE_URL")
if not db_url:
    print("ERROR: DATABASE_URL not found!")
    exit(1)

# Handle SSL mode for psycopg2 in Python
if "sslmode=verify-full" in db_url:
    db_url = db_url.replace("sslmode=verify-full", "sslmode=require")

try:
    print("Connecting to database...")
    conn = psycopg2.connect(db_url)
    cur = conn.cursor()
    
    # Query all tables in public schema
    cur.execute("""
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
        ORDER BY table_name;
    """)
    tables = cur.fetchall()
    print("\nTables found in database:")
    for t in tables:
        print(f" - {t[0]}")
        
    # Check student record count
    cur.execute('SELECT COUNT(*) FROM "Student";')
    student_count = cur.fetchone()[0]
    print(f"\nNumber of students: {student_count}")
    
    # Check payments record count
    cur.execute('SELECT COUNT(*) FROM "Payment";')
    payment_count = cur.fetchone()[0]
    print(f"Number of payments: {payment_count}")
    
    # Check fee assignments record count
    cur.execute('SELECT COUNT(*) FROM "FeeAssignment";')
    fee_assignment_count = cur.fetchone()[0]
    print(f"Number of fee assignments: {fee_assignment_count}")

    cur.close()
    conn.close()
except Exception as e:
    print("Database error:", e)
