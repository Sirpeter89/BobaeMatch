from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.schema import ForeignKey


class Preference(db.Model):
    __tablename__ = 'preferences'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    tea = db.Column(db.String(20), nullable=False)
    sugar = db.Column(db.Integer, nullable=False)
    addons = db.Column(db.String(60), nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    # userId = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    description = db.Column(db.Text, nullable=False)
    lactose = db.Column(db.Boolean, nullable=False)
    fruit = db.Column(db.Boolean, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "tea": self.tea,
            "sugar": self.sugar,
            "addons": self.addons,
            "gender": self.gender,
            "userId": self.userId,
            "description": self.description,
            "lactose": self.lactose,
            "fruit": self.fruit
        }
