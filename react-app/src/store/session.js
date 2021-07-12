// constants
const SET_USER = "session/SET_USER"
const REMOVE_USER = "session/REMOVE_USER"
const EDIT_USER = "session/EDIT_USER"

// action creators
const setUser = (user) => ({
    type: SET_USER,
    payload: user
})

const removeUser = () => ({
    type: REMOVE_USER,
})

const updateUser = (user) => ({
    type: EDIT_USER,
    payload: user
})

// thunks

export const authenticate = () => async (dispatch) => {
    const response = await fetch('/api/auth/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(setUser(data))
}

export const editProfile = (firstname, lastname, profileImage, city, zip, age, height, gender) => async (dispatch) => {
    const response = await fetch('/api/auth/editProfile', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstname,
            lastname,
            profileImage,
            city,
            zipcode:zip,
            age,
            height,
            gender
        })
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(updateUser(data))
}

export const login = (email, password) => async (dispatch) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(setUser(data))
    return {}
}

export const logout = () => async (dispatch) => {
    const response = await fetch("/api/auth/logout", {
        headers: {
            "Content-Type": "application/json",
        }
    });
    const data = await response.json();
    dispatch(removeUser());
};


export const signUp = (username, firstname, lastname, email, profileImage, city, zip, age, height, password, gender) => async (dispatch) => {
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            firstname,
            lastname,
            email,
            profileImage,
            city,
            zipcode:zip,
            age,
            height,
            password,
            gender
        }),
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(setUser(data))
    return {};
}

export const demoUser1 = () => async (dispatch) => {
    const response = await fetch('/api/auth/demo1', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    if(data.errors){
        return;
    }
    dispatch(setUser(data))
}

export const demoUser2 = () => async (dispatch) => {
    const response = await fetch('/api/auth/demo2', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    if(data.errors){
        return;
    }
    dispatch(setUser(data))
}

const initialState = {user: null}

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_USER:
            return {user: action.payload}
        case REMOVE_USER:
            return {user: null}
        case EDIT_USER:
            newState = {...state, modalOpen: true}
            newState.user.firstname=action.payload.firstname
            newState.user.lastname=action.payload.lastname
            newState.user.profileImage=action.payload.profileImage
            newState.user.city=action.payload.city
            newState.user.zipcode=action.payload.zipcode
            newState.user.age=action.payload.age
            newState.user.height=action.payload.height
            newState.user.gender=action.payload.gender
            return newState
        default:
            return state;
    }
}
