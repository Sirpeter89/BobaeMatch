from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FileField
from wtforms.validators import DataRequired, Email, ValidationError, Required
from flask_wtf.file import FileRequired
from app.models import User


def user_exists(form, field):
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("User is already registered.")


def zip_length(form, field):
    zip = str(field.data)
    if len(zip) != 5:
        raise ValidationError("Not a valid zipcode, must be 5 digits")


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    firstname = StringField('firstname', validators=[DataRequired()])
    lastname = StringField('lastname', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired(), user_exists, Email()])
    image = FileField('image',validators=[FileRequired()])
    city = StringField('city', validators=[DataRequired()])
    zipcode = IntegerField('zipcode', validators=[DataRequired(), zip_length])
    age = IntegerField('age', validators=[DataRequired()])
    gender = StringField('gender', validators=[DataRequired()])
    height = IntegerField('height', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired()])
