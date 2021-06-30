from .db import db
from sqlalchemy.schema import ForeignKey

class Potential_match(db.Model):
  __tablename__ = 'potential_matches'

  id = db.Column(db.Integer, primary_key = True)
  userId = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
  matchedUserId = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
  matchedUsername = db.Column(db.String(60), nullable = False)
  accepted = db.Column(db.Boolean, nullable = False)
