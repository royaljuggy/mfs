# All endpoints that relate to actors tables
from flask import Blueprint, jsonify, request
import psycopg2

base_url = '/actors'
actors_controller = Blueprint("actors_api", __name__)
SEARCH_LIMIT = 250

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
        # Since the actors table is VERY large, we will limit how many entries can be returned.
        tuples = cur.fetchmany(size=SEARCH_LIMIT)

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

@actors_controller.route(f'{base_url}', methods=['GET'])
def get_all_actors():
    """
    Get all actors
    """
    sql_query = '''SELECT * FROM actors'''
    return db_wrapper(sql_query, args=None)

@actors_controller.route(f'{base_url}/<int:actor_id>', methods=['GET'])
def get_movie_by_id(actor_id):
    """
    Get movie by id
    """
    sql_query = 'SELECT * FROM actors WHERE id = %s'
    return db_wrapper(sql_query, args=[actor_id])
