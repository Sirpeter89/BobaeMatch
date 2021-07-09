// constants
const CREATE_MATCH = "match/CREATE_MATCH"

// action creators
const createMatch = (match) => ({
    type: CREATE_MATCH,
    payload: match
})

// thunks
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
        default:
            return state;
    }
}
