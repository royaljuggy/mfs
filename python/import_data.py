# This file will create all required Postgres Schemas (if needed)
# and import all data from a file movies.csv that must be in the same directory as this script.
## Helpful guide I used: https://www.datacamp.com/tutorial/tutorial-postgresql-python

import psycopg2
import pandas as pd
from tqdm import tqdm

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
                name VARCHAR(255),
                birth_year INTEGER,
                death_year INTEGER,
                professions VARCHAR(255),
                known_title VARCHAR(255));
            """)

conn.commit()

## Directors table
cur.execute("""CREATE TABLE IF NOT EXISTS directors (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255));
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
for index, row in tqdm(df.iterrows(), total=df.shape[0]):
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

conn.commit()

print("Finished importing movies.")

# Import actors
## See documentation for required columns
actors_df = pd.read_csv('actors.csv', na_values=['NaN', 'N/A', '-', ''])
actors_df = actors_df.where(pd.notnull(actors_df), None)

def clean_cell(value):
    if pd.isnull(value) or value == '':
        return None
    return value

# Parse out only columns we care for
for index, row in tqdm(actors_df.iterrows(), total=actors_df.shape[0]):
    # Extract values from the DataFrame row
    name = clean_cell(row['name'])
    birth_year = clean_cell(row['birth_year'])
    death_year = clean_cell(row['death_year'])
    professions = clean_cell(row['professions'])
    known_title = clean_cell(row['known_title'])

    # Data validation
    # TODO: if the text is too long, the insert statement won't work.
    if len(known_title) > 255 or len(professions) > 255 or len(name) > 255:
        continue

    # Construct the SQL INSERT statement
    insert_query = """
    INSERT INTO actors (name, birth_year, death_year, professions, known_title) 
    VALUES (%s, %s, %s, %s, %s)
    """

    # Execute the INSERT statement
    cur.execute(insert_query, (name, birth_year, death_year, professions, known_title))

conn.commit()

print("Finished importing actors.")
# Close connections
cur.close()
conn.close()