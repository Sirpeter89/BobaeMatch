from flask import Blueprint, request
from app.models import db, User, Match
from sqlalchemy import or_


match_routes = Blueprint('match', __name__)


@match_routes.route('/', methods=['POST'])
def create_match():
    data = request.get_json()
    matchRecord = Match(
        useroneId=data['userId'],
        usertwoId=data['matchedUserId']
    )
    db.session.add(matchRecord)
    db.session.commit()
    return matchRecord.to_dict()


@match_routes.route('/<int:id>')
def get_matches(id):
    matchRecord =  Match.query.filter(or_(Match.useroneId == id, Match.usertwoId == id)).all()
    return {"match": [match.to_dict() for match in matchRecord]}
