# Drop all the tables created by import_data
## This is useful if you want to recreate the schema from scratch

import psycopg2

# Read credentials from *PRIVATE* credentials.txt file
separator = '='
credentials_file = open("credentials.txt", "r")
db = credentials_file.readline().split(separator)[1].strip()
username = credentials_file.readline().split(separator)[1].strip()
myhost = credentials_file.readline().split(separator)[1].strip()
pw = credentials_file.readline().split(separator)[1].strip()
myport = credentials_file.readline().split(separator)[1].strip()

# Connect to the db
conn = psycopg2.connect(database = db, user = username, host = myhost, password = pw, port = myport)

def drop_table(conn, table_name):
    # Create a cursor object using the connection
    cur = conn.cursor()
    
    # Construct the SQL DROP TABLE statement
    drop_query = f"DROP TABLE IF EXISTS {table_name};"
    
    # Execute the DROP TABLE statement
    cur.execute(drop_query)
    
    # Commit the transaction
    conn.commit()
    
    # Close the cursor
    cur.close()

# Drop the "movies" table
drop_table(conn, 'movies')

# Drop the "actors" table
drop_table(conn, 'actors')

conn.close()