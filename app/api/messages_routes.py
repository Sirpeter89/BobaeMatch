from flask import Blueprint, request
from app.models import Message, db
from psycopg2.extras import Json


messages_routes = Blueprint('messages', __name__)


@messages_routes.route('/update', methods=['PUT'])
def update_messages():
    data = request.get_json()
    messageRecord =  Message.query.filter_by(matchId=data['matchId']).first()
    if messageRecord is None:
        newMessageRecord = Message(
            message = Json(data['message']),
            matchId = data['matchId']
        )
        db.session.add(newMessageRecord)
        db.session.commit()
        return newMessageRecord.to_dict()
    else:
        messageRecord.message = Json(data['message'])
        db.session.commit()
        return messageRecord.to_dict()


@messages_routes.route('/<int:id>')
def get_messages(id):
    messageRecord = Message.query.filter_by(matchId=id).first()
    return messageRecord.to_dict()
