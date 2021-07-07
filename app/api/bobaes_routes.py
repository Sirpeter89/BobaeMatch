from flask import Blueprint, request
from app.models import Preference, db


bobaes_routes = Blueprint('bobaes', __name__)


@bobaes_routes.route('/')
def get_bobaes():
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
