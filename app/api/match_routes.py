from flask import Blueprint, request
from app.models import Preference, db, User, Potential_match, Match
from sqlalchemy import and_


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
