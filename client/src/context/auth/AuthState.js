import React, { useReducer } from 'react';

import AuthContext from './AuthContext';
import authReducer from './AuthReducer';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';

const  AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'), // we store token in local storage. 
        isAuthenticated: null,// is authentcated will tell us if we are logged in or not.
        loading: true,
        user: null, // we want to know which user we're dealing with
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load User - responsible for checking which user is logged in.

    // Register User - sign user up and get a token back

    // Login User - log user in and get a token

    // Logout - will destroy the token

    // Clear Errors - will clear out any errors in the state


    return (
        <AuthContext.Provider
            value={{
                token: state.token, 
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;