from .db import db
from sqlalchemy.schema import ForeignKey

class Potential_match(db.Model):
  __tablename__ = 'potential_matches'

  id = db.Column(db.Integer, primary_key = True)
  userId = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
  matchedUserId = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
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
