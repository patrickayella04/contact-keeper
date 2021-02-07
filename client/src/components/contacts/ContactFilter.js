import React, { useContext, useRef, useEffect } from 'react'
import ContactContext from '../../context/contact/contactContext'; 

// UseRef hook used to represent or reference a dom object, and an alternative for forms. We are not acutlly going to create a piece of state for our input/filter, we instead use a ref. We want our form to filter right when it changes. 
export const ContactFilter = () => {
    const contactContext = useContext(ContactContext);
    const text = useRef('');
    // We also want to use useEffect because if the filter part of our state is equal to null we want the value to be empty in the filter form. 
    useEffect(() => {
        if (filtered === null) {
            text.current.value = '';
        }
        
    })

    const { filterContacts, clearFilter, filtered } = contactContext;
    const onChange = e => {
        if (text.current.value !== '') {
            filterContacts(e.target.value);
        } else {
           clearFilter();
        }
    }
    return (
        <form>
            <input ref={text} type="text" placeholder="Filter Contacts..." onChange={onChange}/>
        </form>
    )
}

export default ContactFilter