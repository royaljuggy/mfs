# This file will create all required Postgres Schemas (if needed)
# and import all data from a file movies.csv that must be in the same directory as this script.
## Helpful guide I used: https://www.datacamp.com/tutorial/tutorial-postgresql-python

import psycopg2
import pandas as pd

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

# Create schemas
cur = conn.cursor()

## Movies table
cur.execute("""CREATE TABLE IF NOT EXISTS movies (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            rating VARCHAR(255),
            genre VARCHAR(255),
            year INTEGER,
            score FLOAT,
            star VARCHAR(255),
            runtime INTEGER);
            """)

conn.commit()

## Actors (Stars) table
cur.execute("""CREATE TABLE IF NOT EXISTS actors (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL);
            """)

conn.commit()

# Import data from .csv file
## See documentation for required columns
df = pd.read_csv('movies.csv', na_values=['NaN', 'N/A', '-', ''])
df = df.where(pd.notnull(df), None)

def clean_cell(value):
    if pd.isnull(value) or value == '':
        return None
    return value

# Parse out only columns we care for
for index, row in df.iterrows():
    # Extract values from the DataFrame row
    title = clean_cell(row['title'])
    rating = clean_cell(row['rating'])
    genre = clean_cell(row['genre'])
    year = clean_cell(row['year'])
    score = clean_cell(row['score'])
    star = clean_cell(row['star'])
    runtime = clean_cell(row['runtime'])

    # Construct the SQL INSERT statement
    insert_query = """
    INSERT INTO movies (title, rating, genre, year, score, star, runtime) 
    VALUES (%s, %s, %s, %s, %s, %s, %s)
    """
    
    # Execute the INSERT statement
    cur.execute(insert_query, (title, rating, genre, year, score, star, runtime))

    # Construct statement to insert into actors table
    insert_actor = """
    INSERT INTO actors (name)
    VALUES (%s)
    """

    if star is not None:
        cur.execute(insert_actor, (star,))

conn.commit()

# Close connections
cur.close()
conn.close()

