from .db import db
from sqlalchemy.schema import ForeignKey

class Match(db.Model):
  __tablename__ = 'matches'

  id = db.Column(db.Integer, primary_key = True)
  useroneId = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
  usertwoId = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
