import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from '../types';
/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state, action) => {
    switch (action.type) {
        case GET_CONTACTS:
            return {
                ...state,
                constacts: action.payload,
                loading: false
            }
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload],
                loading: false
            };
        case UPDATE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact
                ),
                loading: false
            };
        case DELETE_CONTACT:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload),
                loading: false

            };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            };
        case FILTER_CONTACTS:
            return {
                ...state,
                filtered: state.contacts.filter(contact => {
                    const regex = new RegExp(`${action.payload}`, 'gi'); // we have a paremeter of 'gi' which is globle or insensitive because we want the input to match wether its lowercase or uppercase. 
                    return contact.name.match(regex) || contact.email.match(regex); // return any name or email that matches the payload aka the regex - regular expression. 
                })
            };
            case CLEAR_FILTER:
                return {
                    ...state,
                    filtered: null
            };
        case CONTACT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}