# Programming Notes
Some notes about how I'm structuring this full-stack app

## Front-end
Built in React with:

home-page

search page with filters including
- genre (drop-down menu)
- title (text search)
- date (date range)

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
- movies
- genres
- actors
- directors
- writers

### Bonus
Ease-of-use: Python script that automatically parses and injects movie data in a .csv into the relevant postgres tables


## Other functionality
Terminal side functionality built into back-end. That is, when running the flask server, you're also able to use the application in the terminal. What's the benefit? Simplicity.
