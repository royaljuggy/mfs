# Programming Notes
Order of development; bottom-up?
1. Schema design, data import script and schema creation scripts
2. Flask endpoints
3. React front-end

Some notes about how I'm structuring this full-stack app

## Front-end
Built in React with:

home-page

search page with filters including
- genre (drop-down menu)
- title (text search)
- date (date range)
- loading icon while search API is querying DB

## Back-end
Flask (Python)

### Queries
- `get` all movies
- `get` movies by exact genre 
- `get` movies within date range
- `get` movies by title
- `get` movies by score range
- `update` or `add` a new movie entry
- `delete` a movie entry

IDEA: api endpoints for each get query that all call a 'all-in-one' query that sets unused parameters to default values

For example, a get all movies query may try
```
SELECT * from movies
WHERE date > 1900-01-01 AND date < 3000-01-01
  AND 1 == 1 # in normal places this would be genre == ...
  AND 1 LIKE 1 # in normal places this would be the title; this clause itself would be supplied by subqueries
  AND score => 0 AND score <= 10
```
While querying by title and date would try:
```
SELECT * from movies
WHERE date > 2001-01-01 AND date < 2004-01-01
  AND 1 == 1 # genre
  AND title LIKE 'christmas'
  AND score => 0 AND score <= 10
```

## Database
Postgres

### Schema design
Tables:
- movies (PK: id, FK: star (name)) **FK TODO**
- ~~genres~~ no table used. Just use groupBy rather than a table-join to search by genre.
- actors (PK: star (name))
- directors (PK: name) - dataset does NOT have this data - need to saearch for it.
- writers - dataset does NOT have this data - need to saearch for it.

#### Issues
Firstly, if the primary key of actors is their name, there would be no way to avoid ambiguity with actors of the same name. However, this goes the same for the dataset. We wouldn't know the difference between John Doe in Star Wars and John Doe in Toy Story without delving deep into the cast list (which would take too long.)

### Bonus
Ease-of-use: Python script that automatically parses and injects movie data in a .csv into the relevant postgres tables

Find ways to supplement our dataset. That is, add more data to each movie. A simple example would be to add the director's name.


## Other functionality
Terminal side functionality built into back-end. That is, when running the flask server, you're also able to use the application in the terminal. What's the benefit? Simplicity.
