# mfs
mfs - a movie file system

Well... not actually a file system! We're just leveraging Postgres to store our movie data and displaying it to a web interface.

## Libraries/Downloads Needed
### React
- tailwind
- next.js
- react-router-dom
### Python
- psycopg2 `pip install psycopg2-binary` or `pip install psycopg2`
- pandas `pip install pandas`
- flask `pip install flask`
- tqdm `pip install tqdm`

### Schema
- Postgres installation
- (Optional): pgAdmin, a user-friendly way of viewing your schemas

## Initial Configurations
One-time installations you need to do. Obviously first is installing all required libraries from the above list.

Once you're done that, make sure to create an empty Postgres database for this project. I've named mine 'movie-file-system' and labelled it in my private credentials file used by the import script.

## Running the Application
In tandem, run the front-end and back-end in two different terminals.

### Front-end
In the react directory, run `npm run dev`
Or,
```
cd react
npm run dev

npx tailwindcss build globals.css -o output.css
```

### Back-end
A full-fledged guide is available at [real python](https://realpython.com/flask-project/)
But for our purposes, running the following in the python directory should suffice:

```
python -m venv venv
.\venv\Scripts\activate
python -m flask --app server run --port 8000 --debug
```
