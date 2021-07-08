// constants
const ADD_PREFERENCES = "preferences/ADD_PREFERENCES"
const GET_PREFERENCES = "preferences/GET_PREFERENCES"
const REPLACE_PREFERENCES = "preferences/REPLACE_PREFERENCES"
const EDIT_PREFERENCES = "preferences/EDIT_PREFERENCES"

// action creators
const addPreferences = (preference) => ({
    type: ADD_PREFERENCES,
    payload: preference
})

const getPreferences = (preference) =>({
    type: GET_PREFERENCES,
    payload: preference
})

const editPreferences = (preference) => ({
    type: REPLACE_PREFERENCES,
    payload: preference
})

//thunks
export const changePreferences = (tea, sugar, addons, gender, userId, description, lactose, fruit) => async (dispatch) => {
    const response = await fetch('/api/preferences/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tea,
            sugar,
            addons,
            gender,
            userId,
            description,
            lactose,
            fruit
        })
    });
    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(editPreferences(data))
}

export const enterPreferences = (tea, sugar, addons, gender, userId, description, lactose, fruit) => async (dispatch) => {
    const response = await fetch('/api/preferences/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tea,
            sugar,
            addons,
            gender,
            userId,
            description,
            lactose,
            fruit
        })
    });
    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(addPreferences(data))
}

export const loadPreferences = (id) => async (dispatch) => {
    const response = await fetch(`/api/preferences/${id}`)
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(getPreferences(data))
}


const initialState = {preferences: null}

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case ADD_PREFERENCES:
            return {preferences: action.payload}
        case GET_PREFERENCES:
            newState = {...state}
            newState.preferences = action.payload
            return newState
        case EDIT_PREFERENCES:
            return {preferences: action.payload}
        default:
            return state;
    }
}
