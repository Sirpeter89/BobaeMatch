from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from wtforms.validators import DataRequired

def zip_length(form, field):
    zip = str(field.data)
    if len(zip) != 5:
        raise ValidationError("Not a valid zipcode, must be 5 digits")

def age_length(form, field):
    age = str(field.data)
    if len(age) > 3 or field.data <= 0 or field.data > 150:
        raise ValidationError("Not a valid age")


class EditProfileForm(FlaskForm):
    firstname = StringField('firstname', validators=[DataRequired()])
    lastname = StringField('lastname', validators=[DataRequired()])
    profileImage = StringField('profileImage')
    city = StringField('city', validators=[DataRequired()])
    zipcode = IntegerField('zipcode', validators=[DataRequired(), zip_length])
    age = IntegerField('age', validators=[DataRequired(), age_length])
    height = IntegerField('height', validators=[DataRequired()])
