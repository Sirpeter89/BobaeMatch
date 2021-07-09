from flask import Blueprint, request
from sqlalchemy.sql.sqltypes import Boolean
from app.models import Preference, db, User, Potential_match
from sqlalchemy import or_, and_


bobaes_routes = Blueprint('bobaes', __name__)


@bobaes_routes.route('/', methods=['POST'])
def get_bobaes():
    data = request.get_json()

    #query users by the gender the current user wants, not including themselves
    userRecords = User.query.filter(and_(User.gender == data['genderPref'], User.id != data['userId'] ) )
    pref_gender_users = [user.to_dict() for user in userRecords]

    # print (pref_gender_users)
    potential_matches = []
    for user in pref_gender_users:
        teaQuery = Preference.query.filter(and_(Preference.userId == user['id'], Preference.gender.like(data['userGender']), Preference.tea.like(data['tea']))).first()
        if teaQuery != None:
            potential_matches.append(teaQuery.to_dict())

        # If theres less than 5 matches by tea, then match by addons
        if len(potential_matches) < 5:
            addonsQuery = Preference.query.filter(and_(Preference.userId == user['id'], Preference.gender.like(data['userGender']), Preference.addons.like(data['addons']))).first()
        if addonsQuery != None:
            potential_matches.append(addonsQuery.to_dict())

        # If theres less than 5 matches by addons and tea, then match by sugarLevel
        if len(potential_matches) < 5:
            sugarQuery = Preference.query.filter(and_(Preference.userId == user['id'], Preference.gender.like(data['userGender']), Preference.sugar==data['sugar'])).first()
        if sugarQuery != None:
            potential_matches.append(sugarQuery.to_dict())

        if len(potential_matches) < 5:
            fruitQuery = Preference.query.filter(and_(Preference.userId == user['id'], Preference.gender.like(data['userGender']), Preference.fruit.is_(data['fruit']))).first()
        if fruitQuery != None:
            potential_matches.append(fruitQuery.to_dict())

    #filter out duplicates
    if potential_matches:
        potential_matches = list({users['id']:users for users in potential_matches}.values())
        print (potential_matches)

    #Get main profiles to display for potential matches
    profiles = []
    for person in potential_matches:
        profile = User.query.filter(User.id == person['id']).first()
        profiles.append(profile.to_dict())

    #get all user preferences
    userPrefs = {}
    for match in potential_matches:
        userPrefs[match['id']] = match

    #get all user profiles
    userProfiles = {}
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
            db.session.add(potentialMatchRecord)
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
    print("TO DICCCCCCCCTTT", updatePotentialMatch.to_dict())
    return updatePotentialMatch.to_dict()
