from flask import Blueprint, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from app.forms import EditProfileForm
from flask_login import current_user, login_user, logout_user
from app.s3_helpers import (upload_file_to_s3, allowed_file, get_unique_filename, delete_file_from_s3)

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401



@auth_routes.route('/editProfile', methods=['PATCH'])
def edit_profile():
    """
    Edits User Profile
    """
    form = EditProfileForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    # if user did not change image
    url = form.data['profileImage']
    print(url)

    try:
        image = request.files['image']
    except:
        image = None
    if image != None:
        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400
        image.filename = get_unique_filename(image.filename)
        if "https://bobaematch.s3.amazonaws.com/" in url:
            key = url.split("https://bobaematch.s3.amazonaws.com/",1)[1]
            delete_file_from_s3(key)
        upload = upload_file_to_s3(image)
        if "url" not in upload:
            return upload, 400
        url = upload["url"]


    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    if form.validate_on_submit():
        data = request.get_json()
        user = User.query.filter(User.id == current_user.id).first()
        user.firstName=form.data['firstname']
        user.lastName=form.data['lastname']
        user.profileImage=url
        user.city=form.data['city']
        user.zipcode=form.data['zipcode']
        user.age=form.data['age']
        user.height=form.data['height']
        user.gender=form.data['gender']
        db.session.commit()
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    # return {}

@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']



    if form.validate_on_submit():
        try:
            image = request.files['image']
        except:
            image = None

        if not allowed_file(image.filename):
            return {"errors": "file type not permitted"}, 400

        image.filename = get_unique_filename(image.filename)

        upload = upload_file_to_s3(image)

        if "url" not in upload:
            return upload, 400

        url = upload["url"]
        # data = request.get_json()

        # user = User(
        #     userName=data['username'],
        #     firstName=data['firstname'],
        #     lastName=data['lastname'],
        #     email=data['email'],
        #     # profileImage=data['profileImage'],
        #     profileImage=url,
        #     password=data['password'],
        #     city=data['city'],
        #     zipcode=data['zipcode'],
        #     age=data['age'],
        #     height=data['height'],
        #     gender=data['gender']
        # )
        user = User(
            userName=form.data['username'],
            firstName=form.data['firstname'],
            lastName=form.data['lastname'],
            email=form.data['email'],
            # profileImage=form.data['profileImage'],
            profileImage=url,
            password=form.data['password'],
            city=form.data['city'],
            zipcode=form.data['zipcode'],
            age=form.data['age'],
            height=form.data['height'],
            gender=form.data['gender']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401

@auth_routes.route('/demo1', methods=['POST'])
def demo1_user():
    user=User.query.filter(User.userName == "DemoThree").first()
    login_user(user)
    return user.to_dict()

@auth_routes.route('/demo2', methods=['POST'])
def demo2_user():
    user=User.query.filter(User.userName == "DemoFour").first()
    login_user(user)
    return user.to_dict()
