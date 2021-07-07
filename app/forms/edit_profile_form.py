from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class EditProfileForm(FlaskForm):
    firstname = StringField('firstname', validators=[DataRequired()])
    lastname = StringField('lastname', validators=[DataRequired()])
    profileImage = StringField('profileImage')
    city = StringField('city', validators=[DataRequired()])
    zipcode = IntegerField('zipcode', validators=[DataRequired()])
    age = IntegerField('age', validators=[DataRequired()])
    height = IntegerField('height', validators=[DataRequired()])
