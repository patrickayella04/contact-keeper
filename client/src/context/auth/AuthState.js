import React, { useReducer } from 'react';
import axios from 'axios';
import authContext from './AuthContext';
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
    const LoadUser = () => console.log('load user');

    // Register User - sign user up and get a token back
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
    
        try {
            const res = await axios.post('/api/users', formData, config);

            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            });
        
        }
    };
    // Login User - log user in and get a token
    const Login = () => console.log('login');
    // Logout - will destroy the token
    const Logout = () => console.log('logout');
    // Clear Errors - will clear out any errors in the state
    const clearError = () => console.log('clear errors');

    return (
        <authContext.Provider
            value={{
                token: state.token, 
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                LoadUser,
                Login,
                Logout,
                clearError

            }}
        >
            {props.children}
        </authContext.Provider>
    );
};

export default AuthState;