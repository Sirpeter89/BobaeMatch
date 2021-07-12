from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from app.forms import EditProfileForm
from flask_login import current_user, login_user, logout_user, login_required

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
    print(request.get_json())
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
    print(request.get_json())
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = request.get_json()
        user = User.query.filter(User.id == current_user.id).first()
        user.firstName=data['firstname']
        user.lastName=data['lastname']
        user.profileImage=data['profileImage']
        user.city=data['city']
        user.zipcode=data['zipcode']
        user.age=data['age']
        user.height=data['height']
        user.gender=data['gender']
        db.session.commit()
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


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
        data = request.get_json()
        print(data)
        user = User(
            userName=data['username'],
            firstName=data['firstname'],
            lastName=data['lastname'],
            email=data['email'],
            profileImage=data['profileImage'],
            password=data['password'],
            city=data['city'],
            zipcode=data['zipcode'],
            age=data['age'],
            height=data['height'],
            gender=data['gender']
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
    user=User.query.filter(User.userName == "Demo1").first()
    login_user(user)
    return user.to_dict()

@auth_routes.route('/demo2', methods=['POST'])
def demo2_user():
    user=User.query.filter(User.userName == "Demo2").first()
    login_user(user)
    return user.to_dict()
