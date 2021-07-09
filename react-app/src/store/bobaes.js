// constants
const GET_BOBAES = "bobaes/GET_BOBAES"
const UPDATE_BOBAES = "bobaes/UPDATE_BOBAES"


// action creators
const getBobaes = (bobae) => ({
    type: GET_BOBAES,
    payload: bobae
})

const updateBobaes = (bobae) => ({
    type: UPDATE_BOBAES,
    payload: bobae
})


// thunks
export const acceptBobae = (userId, matchedUserId) => async(dispatch) => {
    const response = await fetch('/api/bobaes/accept', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId,
            matchedUserId
        })
    });
    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(updateBobaes(data))
}

export const loadBobaes = (userId, genderPref, userGender, tea, addons, sugar, fruit) => async (dispatch) => {
    const response = await fetch('/api/bobaes/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            genderPref,
            userGender,
            userId,
            tea,
            addons,
            sugar,
            fruit
        })
    });
    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(getBobaes(data))
}

//reducer
const initialState = {bobaes: null}

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_BOBAES:
            return {bobaes: action.payload}
        case UPDATE_BOBAES:
            newState = {...state}
            newState.bobaes.PotentialMatches[action.payload.matchedUserId] = action.payload
            return newState
        default:
            return state;
    }
}
