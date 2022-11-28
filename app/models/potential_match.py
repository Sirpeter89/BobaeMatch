from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey

class Potential_match(db.Model):
  __tablename__ = 'potential_matches'

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key = True)
  # userId = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
  # matchedUserId = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
  userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  matchedUserId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  matchedUsername = db.Column(db.String(60), nullable = False)
  accepted = db.Column(db.Boolean, nullable = False)
  declined = db.Column(db.Boolean, nullable = False)

  def to_dict(self):
    return {
      "id": self.id,
      "userId": self.userId,
      "matchedUserId": self.matchedUserId,
      "matchedUsername": self.matchedUsername,
      "accepted": self.accepted,
      "declined": self.declined
    }
