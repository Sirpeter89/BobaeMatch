from .db import db
from sqlalchemy.schema import ForeignKey
import datetime
import json


class Message(db.Model):
  __tablename__ = 'messages'

  id = db.Column(db.Integer, primary_key = True)
  message = db.Column(db.Text)
  matchId = db.Column(db.Integer, ForeignKey('matches.id'))
  # senderUsername = db.Column(db.String(60), nullable=False)
  # created_at=db.Column(db.DateTime, default=datetime.datetime.utcnow)

  def to_dict(self):
    return {
      "id": self.id,
      "message": json.loads(self.message),
      "matchId": self.matchId
    }
