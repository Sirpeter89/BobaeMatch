from flask import Blueprint, request
from app.models import Preference, db, User, Potential_match
from sqlalchemy import and_


bobaes_routes = Blueprint('bobaes', __name__)


@bobaes_routes.route('/', methods=['POST'])
def get_bobaes():
    data = request.get_json()

    #query users by the gender the current user wants, not including themselves
    userRecords = User.query.filter(and_(User.gender == data['genderPref'], User.id != data['userId'] ) )
    pref_gender_users = [user.to_dict() for user in userRecords]

    potential_matches = []
    for user in pref_gender_users:
        teaQuery = Preference.query.filter(and_(Preference.userId == user['id'], Preference.gender.like(data['userGender']), Preference.tea.like(data['tea']))).first()
        if teaQuery != None:
            potential_matches.append(teaQuery.to_dict())

        addonsQuery = Preference.query.filter(and_(Preference.userId == user['id'], Preference.gender.like(data['userGender']), Preference.addons.like(data['addons']))).first()
        if addonsQuery != None:
            potential_matches.append(addonsQuery.to_dict())

        sugarQuery = Preference.query.filter(and_(Preference.userId == user['id'], Preference.gender.like(data['userGender']), Preference.sugar==data['sugar'])).first()
        if sugarQuery != None:
            potential_matches.append(sugarQuery.to_dict())

        fruitQuery = Preference.query.filter(and_(Preference.userId == user['id'], Preference.gender.like(data['userGender']), Preference.fruit.is_(data['fruit']))).first()
        if fruitQuery != None:
            potential_matches.append(fruitQuery.to_dict())

        #filter out duplicates
        if potential_matches:
            potential_matches = list({users['id']:users for users in potential_matches}.values())

    #Get main profiles to display for potential matches
    profiles = []
    for person in potential_matches:
        profile = User.query.filter(User.id == person['userId']).first()
        profiles.append(profile.to_dict())


    #get all user preferences
    userPrefs = {}
    for match in potential_matches:
        userPrefs[match['userId']] = match


    #get all user profiles
    userProfiles = {}
    potentialMatchRecords = []
    for profile in profiles:
        userProfiles[profile['id']] = profile
        #Check if potential match record between user and other user doesn't already exist
        check_potential_match = Potential_match.query.filter(and_(Potential_match.userId == data['userId'], Potential_match.matchedUserId == profile['id'])).first()

        if check_potential_match is None:
            potentialMatchRecord = Potential_match(
                userId=data['userId'],
                matchedUserId=profile['id'],
                matchedUsername=profile['username'],
                accepted=False,
                declined=False
            )
            potentialMatchRecords.append(potentialMatchRecord)

    db.session.add_all(potentialMatchRecords)
    db.session.commit()

    #Get all the records again to put into the store, need them to decide what to load
    get_all_potential_matches = Potential_match.query.filter(Potential_match.userId == data['userId']).all()
    all_potential_matches = [p_match.to_dict() for p_match in get_all_potential_matches]
    potentialMatches = {}
    for p_match in all_potential_matches:
        potentialMatches[p_match['matchedUserId']] = p_match
    #Get potential match preferences and profile info together for displaying in single components
    payload = {}
    payload['PotentialMatches'] = dict(potentialMatches)
    payload['userPrefs'] = dict(userPrefs)
    payload['userProfiles'] = dict(userProfiles)
    return payload


@bobaes_routes.route('/accept', methods=['PATCH'])
def accept_bobae():
    data = request.get_json()
    updatePotentialMatch = Potential_match.query.filter(and_(Potential_match.userId == data['userId'], Potential_match.matchedUserId == data['matchedUserId'])).first()
    updatePotentialMatch.accepted = True
    db.session.commit()
    return updatePotentialMatch.to_dict()


@bobaes_routes.route('/deny', methods=['PATCH'])
def deny_bobae():
    data = request.get_json()
    updatePotentialMatch = Potential_match.query.filter(and_(Potential_match.userId == data['userId'], Potential_match.matchedUserId == data['matchedUserId'])).first()
    updatePotentialMatch.declined = True
    db.session.commit()
    return updatePotentialMatch.to_dict()


@bobaes_routes.route('/checkMatch', methods=['POST', 'GET'])
def check_bobae_match():
    data = request.get_json()
    #check if opposite match exists
    checkPotentialMatch = Potential_match.query.filter(and_(Potential_match.userId == data['matchedUserId'], Potential_match.matchedUserId == data['userId'])).first()
    if checkPotentialMatch is not None:
        return checkPotentialMatch.to_dict()
    else:
        return {}


@bobaes_routes.route('/reset', methods=['PATCH'])
def reset_bobae():
    data = request.get_json()
    updatePotentialMatch = Potential_match.query.filter(and_(Potential_match.userId == data['userId'], Potential_match.matchedUserId == data['matchedUserId'])).first()
    updatePotentialMatch.accepted = False
    db.session.commit()
    return updatePotentialMatch.to_dict()
