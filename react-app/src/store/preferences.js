// constants
const ADD_PREFERENCES = "preferences/ADD_PREFERENCES"

// action creators
const addPreferences = (preference) => ({
    type: ADD_PREFERENCES,
    payload: preference
})

//thunks
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


const initialState = {preferences: null}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_PREFERENCES:
            return {preferences: action.payload}
        default:
            return state;
    }
}
