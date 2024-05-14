# mfs
mfs - a movie file system

## Libraries/Downloads Needed
### React
### Python
- psycopg2 `pip install psycopg2-binary` or `pip install psycopg2`
- pandas `pip install pandas`
- flask `pip install flask`

### Schema
- Postgres installation
- (Optional): pgAdmin, a user-friendly way of viewing your schemas

## Initial Configurations
One-time installations you need to do. Obviously first is installing all required libraries from the above list.

Once you're done that, make sure to create an empty Postgres database for this project. I've named mine 'movie-file-system' and labelled it in my private credentials file used by the import script.

## Running the Application
### Front-end

### Back-end
A full-fledged guide is available at [https://realpython.com/flask-project/](real python)
But for our purposes, running the following in the python directory should suffice:

```
python -m venv venv
.\venv\Scripts\activate
python -m flask --app server run --port 8000 --debug
```
