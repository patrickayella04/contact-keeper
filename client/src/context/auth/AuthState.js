import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import authReducer from './AuthReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    AUTH_ERROR
} from '../types';
// import { response } from 'express';

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
    const LoadUser = async () => {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
        }
        try {
    
        const res = await axios.get('/api/auth');
            
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
        
        } catch (error) {
            dispatch({ type: AUTH_ERROR });
        }
    
    }
        
    // Register User - sign user up and get a token back
    const register = async formData => {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
    
        try {
          const res = await axios.post('/api/users', formData, config);
    
          dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
          });

          LoadUser();
          
        } catch (err) {
          dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data.msg
          });
        }
      };
    
    // Login User - log user in and get a token
    const login = async formData => {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        };
    
        try {
          const res = await axios.post('/api/auth', formData, config);
    
          dispatch({
            type: LOGIN_FAIL,
            payload: res.data
          });
          
          LoadUser();
          
        } catch (err) {
          dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data.msg
          });
        }
      };
    
    // Logout - will destroy the token
    const Logout = () => console.log('logout');
    // Clear Errors - will clear out any errors in the state
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    return (
        <AuthContext.Provider
            value={{
                token: state.token, 
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                LoadUser,
                login,
                Logout,
                clearErrors
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;