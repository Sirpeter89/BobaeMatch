from flask import Blueprint, request
from app.models import Preference, db

preference_routes = Blueprint('preferences', __name__)

@preference_routes.route('/', methods=['POST'])
def make_preferences():
    data = request.get_json()
    preferenceRecord = Preference(
                tea=data['tea'],
                sugar=data['sugar'],
                addons=data['addons'],
                gender=data['gender'],
                userId=data['userId'],
                description=data['description'],
                lactose=data['lactose'],
                fruit=data['fruit']
            )
    db.session.add(preferenceRecord)
    db.session.commit()
    return preferenceRecord.to_dict()

@preference_routes.route('/', methods=['PUT'])
def edit_preferences():
    data = request.get_json()
    preferenceRecord = Preference.query.filter_by(userId=data['userId']).first()
    preferenceRecord.tea=data['tea']
    preferenceRecord.sugar=data['sugar']
    preferenceRecord.addons=data['addons']
    preferenceRecord.gender=data['gender']
    preferenceRecord.userId=data['userId']
    preferenceRecord.description=data['description']
    preferenceRecord.lactose=data['lactose']
    preferenceRecord.fruit=data['fruit']
    db.session.commit()
    return preferenceRecord.to_dict()

@preference_routes.route('/<int:id>')
def get_preferences(id):
    preferenceRecord = Preference.query.filter_by(userId=id).first()
    return preferenceRecord.to_dict()
