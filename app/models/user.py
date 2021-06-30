from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  userName = db.Column(db.String(60), nullable = False, unique = True)
  firstName = db.Column(db.String(60), nullable = False)
  lastName = db.Column(db.String(60), nullable = False)
  email = db.Column(db.String(255), nullable = False, unique = True)
  profileImage = db.Column(db.String(255), nullable = False)
  hashed_password = db.Column(db.String(255), nullable = False)
  city = db.Column(db.String(255), nullable = False)
  zipcode = db.Column(db.Integer, nullable= False)
  age = db.Column(db.Integer, nullable= False)
  height = db.Column(db.Integer, nullable= False)


  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email
    }
