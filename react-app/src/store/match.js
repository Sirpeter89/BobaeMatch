// constants
const CREATE_MATCH = "match/CREATE_MATCH"
const GET_MATCH = "match/GET_MATCH"
const DELETE_MATCH = "match/DELETE_MATCH"

// action creators
const createMatch = (match) => ({
    type: CREATE_MATCH,
    payload: match
})

const getMatch = (match) => ({
    type: GET_MATCH,
    payload: match
})

const delMatch = (match) => ({
    type: DELETE_MATCH,
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
    return data;
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

export const deleteMatch = (useroneid, usertwoid) => async(dispatch) => {
    const response = await fetch('/api/match/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            useroneid,
            usertwoid
        })
    });
    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(delMatch(data))
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
        case DELETE_MATCH:
            newState = {...state}
            let index;
            for(let i = 0; i < newState.match.length; i++){
                if (newState.match[i].id === action.payload.id){
                    index = i;
                }
            }
            return {
                match:[
                    ...state.match.slice(0, index),
                    ...state.match.slice(index + 1)
                ]
            }
        default:
            return state;
    }
}
