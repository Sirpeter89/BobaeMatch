from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("User is already registered.")


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    firstname = StringField('firstname', validators=[DataRequired()])
    lastname = StringField('lastname', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), user_exists])
    profileImage = StringField('profileImage')
    city = StringField('city', validators=[DataRequired()])
    zipcode = IntegerField('zipcode', validators=[DataRequired()])
    age = IntegerField('age', validators=[DataRequired()])
    gender = StringField('gender', validators=[DataRequired()])
    height = IntegerField('height', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired()])
