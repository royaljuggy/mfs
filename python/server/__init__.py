from flask import Flask
from server.controllers.movies import movies_controller

# Initializes the flask server (the application that creates and runs the API)
app = Flask(__name__)
app.register_blueprint(movies_controller)

@app.route("/")
def home():
    return "Server is running!"

# def create_app():
#     app = Flask(__name__)

#     return app

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)