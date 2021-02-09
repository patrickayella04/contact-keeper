import React, { useReducer } from 'react';
import axios from 'axios';
import contactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    // eslint-disable-next-line
    CLEAR_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [],
        current: null, // when we click edit, the selected piece of state(contact) will be pulled into this current piece of state. And then we can change things in the UI based on this. 
        filtered: null,
        error: null
    };

    const [state, dispatch] = useReducer(contactReducer, initialState);

    // Get Contacts
    const getContacts = async () => {
        
        
        try {
            const res = await axios.get('/api/contacts')
            
            dispatch({
                type: GET_CONTACTS,
                payload: res.data // We'er no longer the direct contact like before, we are sending the respons.data.
            });
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }
        
    };

    // Add Contact
    const addContact = async contact => {
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            } // Now remember we're not sending the the token within the header here because we're it's set globally.

            // And that's because of our set auth token file we set that as a global value as long as the token is
            
            // in local storage and passed in.
            
            // So we don't we don't need to worry about sending it individually.
        }; 

        try {
            const res = await axios.post('/api/contacts', contact, config)
            
            dispatch({
                type: ADD_CONTACT,
                payload: res.data // We'er no longer the direct contact like before, we are sending the respons.data.
            });    
        } catch (err) {
            dispatch({
                type: CONTACT_ERROR,
                payload: err.response.msg
            });
        }
        
    }
        

    // Delete Contact
    const deleteContact = id => {
        dispatch({
            type: DELETE_CONTACT,
            payload: id
        });
    }

    // Set Current Contact 
    const setCurrent = contact => {
        dispatch({
            type: SET_CURRENT,
            payload: contact
        });
    }

    // Clear Current Contact 
    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT
        });
    }

    // Update Contact 
    const updateContact = contact => {
        dispatch({
            type: UPDATE_CONTACT,
            payload: contact
        });
    }

    // Filter Contacts
    const filterContacts = text => {
        dispatch({
            type: FILTER_CONTACTS,
            payload: text
        });
    };

    // Clear Filter 
    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER
        });
    }


    return (
        <contactContext.Provider
            value={{
                contacts: state.contacts,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                getContacts,
                addContact,
                deleteContact,
                setCurrent,
                clearCurrent,
                updateContact,
                filterContacts,
                clearFilter
            }}
        >
            {props.children}
        </contactContext.Provider>
    );
};

export default ContactState;