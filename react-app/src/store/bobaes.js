// constants
const GET_BOBAES = "bobaes/GET_BOBAES"


// action creators
const getBobaes = (bobae) => ({
    type: GET_BOBAES,
    payload: bobae
})


// thunks
export const loadBobaes = (userId, genderPref, userGender, tea) => async (dispatch) => {
    const response = await fetch('/api/bobaes/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            genderPref,
            userGender,
            userId,
            tea
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
    switch (action.type) {
        case GET_BOBAES:
            return {bobaes: action.payload}
        default:
            return state;
    }
}
