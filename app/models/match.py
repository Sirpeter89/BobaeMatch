from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey

class Match(db.Model):
  __tablename__ = 'matches'

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key = True)
  # useroneId = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
  # usertwoId = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
  useroneId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  usertwoId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

  rel_matchId = db.relationship('Message', cascade="all,delete", backref='match_Id', lazy='dynamic', foreign_keys='Message.matchId')


  def to_dict(self):
    return {
      "id": self.id,
      "useroneId": self.useroneId,
      "usertwoId": self.usertwoId
    }
