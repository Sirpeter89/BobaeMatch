from flask_socketio import SocketIO, emit, join_room
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
def handle_chat(data, roomid):
    # room = lol
    # join_room(room)
    # emit("chat", data, broadcast=True)
    emit("chat", data, room=roomid)


@socketio.on("join")
def join_chat(id):
    room = id
    join_room(room)
