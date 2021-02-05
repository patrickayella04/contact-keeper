import React, { Fragment, useContext } from 'react';
import ContactItem from './ContactItem';
import ContactContext from '../../../context/contact/contactContext';





const Contacts = () => {
    // Initialise our contact context so we have access to any pieces of state or any method associated with this context. 
    const contactContext = useContext(ContactContext);

    const { contacts } = contactContext;
    return (
        <Fragment>
            {contacts.map(contact => (
                <ContactItem key={contact.id} contact={contact}/>
            ))}
            
        </Fragment>
    )
}

export default Contacts;