from flask import Flask
from server.controllers.movies import movies_controller
from server.controllers.actors import actors_controller

# Initializes the flask server (the application that creates and runs the API)
app = Flask(__name__)
app.register_blueprint(movies_controller)
app.register_blueprint(actors_controller)

@app.route("/")
def home():
    return "Server is running!"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)