from flask import Blueprint, request
from sqlalchemy.sql.elements import Null
from app.models import Message, db, Match
from psycopg2.extras import Json


messages_routes = Blueprint('messages', __name__)


@messages_routes.route('/update', methods=['PUT'])
def update_messages():
    data = request.get_json()

    # check if our user has deleted the other user first
    checkMatch = Match.query.filter_by(id=data['matchId']).first()
    if checkMatch is None:
        return {}

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
    if messageRecord is not None:
        return messageRecord.to_dict()
    else:
        return {}
