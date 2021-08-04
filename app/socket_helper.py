from flask_socketio import SocketIO, emit
import os

# create your SocketIO instance
# socketio = SocketIO()

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://bobaematch.herokuapp.com/",
        "https://bobaematch.herokuapp.com/"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)

# handle chat messages
@socketio.on("chat")
def handle_chat(data):
    emit("chat", data, broadcast=True)
