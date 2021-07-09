// constants
const CREATE_MATCH = "match/CREATE_MATCH"
const GET_MATCH = "match/GET_MATCH"

// action creators
const createMatch = (match) => ({
    type: CREATE_MATCH,
    payload: match
})

const getMatch = (match) => ({
    type: GET_MATCH,
    payload: match
})

// thunks
export const loadMatches = (id) => async(dispatch) => {
    const response = await fetch(`/api/match/${id}`)
    const data = await response.json();
    if (data.errors) {
        return;
    }
    const profileDetails = await fetch(`/api/users/${id}`)
    const profData = await profileDetails.json();
    if (profData.errors) {
        return;
    }
    // let combined = {}
    // combined["match"] = {data, profData};
    // combined["profile"] = profData;
    dispatch(getMatch(data))
}

export const makeMatch = (userId, matchedUserId) => async(dispatch) => {
    const response = await fetch('/api/match/', {
        method: 'POST',
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
    dispatch(createMatch(data))
}

//reducer
const initialState = {match: null}

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case CREATE_MATCH:
            return {match: action.payload}
        case GET_MATCH:
            newState = {...state}
            newState = {...state, ...action.payload}
            return newState
        default:
            return state;
    }
}
