# All endpoints that relate to movie tables
from flask import Blueprint, jsonify, request
import psycopg2

base_url = '/movies'
movies_controller = Blueprint("api", __name__)

def db_wrapper(sql_query, args=None):
    """
    A wrapper function ("query builder") that opens and closes the database connection
    Required: passing the raw sql_query
    Optional: args, the arguments to the sql_query. None if unused.
    Note: use of parameterized queries (cur.execute) sanitizes the queries.
    """
    
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
        json_data=[]
        for result in tuples:
            json_data.append(dict(zip(cols,result)))

        ret = (jsonify({'response': 201 , 'value': json_data}), 201)
    except: # TODO: fix error handling (no tuples returned?)
        print("Exception occurred.")
    finally:
        cur.close()
        conn.close()
    
    # Add headers for CORS - https://stackoverflow.com/questions/26980713/solve-cross-origin-resource-sharing-with-flask
    ret[0].headers.add('Access-Control-Allow-Origin', '*')
    return ret

@movies_controller.route(f'{base_url}', methods=['GET'])
def get_all_movies():
    """
    Get all movies
    """
    sql_query = '''SELECT * FROM movies'''
    return db_wrapper(sql_query, args=None)

@movies_controller.route(f'{base_url}/<int:movie_id>', methods=['GET'])
def get_movie_by_id(movie_id):
    """
    Get movie by id
    """
    sql_query = 'SELECT * FROM movies WHERE id = %s'
    return db_wrapper(sql_query, args=[movie_id])

@movies_controller.route(f'{base_url}/filtered', methods=['GET'])
def get_movies_filtered():
    """
    Get movies by filters, including date range, name, etc.

    Examples Endpoints:
        http://localhost:8000/movies/filtered,
        http://localhost:8000/movies/filtered?title=Blue
        http://localhost:8000/movies/filtered?title=%Blue%
        http://localhost:8000/movies/filtered?runtime_from=50&runtime_to_100&genre=Adventure
    """
    separator = '_'

    # TODO: make more resilient (no hard coding...)
    order_by = 'order_by'
    order_direction = 'order_direction'
    non_comparable_placeholder = 'XXX'
    non_comparables = [order_by, 'groupby', order_direction]

    # The RHS column to query from in the database
    filters = ['title', 'rating_from', 'rating_to', 'genre', 'year_from', 'year_to', 'score_from', 'score_to', 'star', 'runtime_from', 'runtime_to', order_by, order_direction]

    # Comparison operator between argument and column
    # XXX is a placeholder, for orderby we use the user supplied ASC/DESC
    ops = ['LIKE', '>= ', '<=', '=', '>=', '<=', '>=', '<=', '=', '>=', '<=', non_comparable_placeholder, non_comparable_placeholder]

    # TODO: better string builder logic (concat is slow)
    # TODO: also lower-case/upper-case cleaning of arguments.
    query = 'SELECT * FROM movies'
    args = []

    for f, op in zip(filters, ops):
        if f in request.args:
            parsed_filter = f.split(separator)[0]
            rhs = ' %s'
            if f not in non_comparables:
                # String column, title, genre, star, etc.
                #   Enforce string insensitivity
                if len(f.split(separator)) == 1:
                    parsed_filter = 'LOWER(' + parsed_filter + ')'
                    rhs = ' LOWER(%s)'

                # Comparison filter
                if len(args) == 0:
                    # TODO: use string.format(...)
                    query += ' WHERE ' + parsed_filter + ' ' + op + rhs
                else:
                    query += ' AND ' + parsed_filter + ' ' + op + rhs
                
                # If comparer is LIKE, we want to search anywhere in string, wrap in %
                if op == 'LIKE':
                    args.append('%'+request.args.get(f)+'%')
                else:
                    args.append(request.args.get(f))
            elif f == order_by:
                # Sortby filter (likely) TODO: enforce non-comparables are always checked at the end.
                col_to_order_by = request.args.get(f)
                query += ' ORDER BY ' + col_to_order_by
            elif f == order_direction:
                # Handled ORDER BY above (before the sort order). At the end, let's append the order direction
                order = 'ASC' # default for now TODO
                if request.args.get(f) == 'DESC':
                    order = 'DESC'
                query += ' ' + order

    return db_wrapper(query, args)