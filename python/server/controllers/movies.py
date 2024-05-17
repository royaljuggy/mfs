# All endpoints that relate to movie tables
from flask import Blueprint, jsonify, request
import psycopg2

movies_controller = Blueprint("api", __name__)

# A wrapper function that opens and closes the database connection
# Required: passing the raw sql_query
# Optional: args, the arguments to the sql_query. None if unused.
def db_wrapper(sql_query, args=None):
    separator = '='

    credentials_file = open("credentials.txt", "r")
    db = credentials_file.readline().split(separator)[1].strip()
    username = credentials_file.readline().split(separator)[1].strip()
    myhost = credentials_file.readline().split(separator)[1].strip()
    pw = credentials_file.readline().split(separator)[1].strip()
    myport = credentials_file.readline().split(separator)[1].strip()

    # Connect to the db
    conn = psycopg2.connect(database = db, user = username, host = myhost, password = pw, port = myport)
    cur = conn.cursor()
    cur.execute(sql_query, args)
    conn.commit()
    ret = (jsonify({'response:': 401, 'value': []}), 401)

    try:
        tuples = cur.fetchall()

        cols=[x[0] for x in cur.description]
        print(cols)
        json_data=[]
        for result in tuples:
            json_data.append(dict(zip(cols,result)))

        ret = (jsonify({'response': 201 , 'value': json_data}), 201)
    except: # TODO: fix error handling (no tuples returned?)
        print("Exception occurred.")
    finally:
        cur.close()
        conn.close()
    return ret

# TODO: query builder class?
@movies_controller.route('/movies', methods=['GET'])
def get_all_movies():
    sql_query = '''SELECT * FROM movies'''
    return db_wrapper(sql_query, args=None)

@movies_controller.route('/movies/filtered', methods=['GET'])
# Examples: http://localhost:8000/movies/filtered,
#   http://localhost:8000/movies/filtered?title=Blue
#   http://localhost:8000/movies/filtered?title=%Blue%
#   http://localhost:8000/movies/filtered?runtime_from=50&runtime_to_100&genre=Adventure
def get_movies_filtered():
    # with filters like date range, name, etc.\
    separator = '_'

    # The RHS column to query from
    filters = ['title', 'rating_from', 'rating_to', 'genre', 'year_from', 'year_to', 'score_from', 'score_to', 'star', 'runtime_from', 'runtime_to']

    # Comparison operator between argument and column
    ops = ['LIKE', '>= ', '<=', '=', '>=', '<=', '>=', '<=', '=', '>=', '<=']

    # TODO: better string builder logic (concat is slow)
    # TODO: front-end needs to handle 'LIKE' argument: add leading and trailing % to search within whole string
    # TODO: also lower-case/upper-case cleaning of arguments.
    query = 'SELECT * FROM movies'
    args = []

    # TODO: SECURITY FLAW - need to sanitize queries.
    for f, op in zip(filters, ops):
        if f in request.args:
            parsed_filter = f.split(separator)[0]
            if len(args) == 0:
                query += ' WHERE ' + parsed_filter + ' ' + op + ' %s'
            else:
                query += ' AND ' + parsed_filter + ' ' + op + ' %s'
            args.append(request.args.get(f))
    print(query)
    return db_wrapper(query, args)
