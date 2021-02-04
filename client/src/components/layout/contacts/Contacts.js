import React, { Fragment, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext';

const Contacts = () => {
    // Initialise our contact context so we have access to any pieces of state or any method associated with this context. 
    const contactContext = useContext(ContactContext);

    const { contacts } = contactContext;
    return (
        <Fragment>
            {contacts.map(contact => (
                <h3>{contact.name}</h3>
            ))}
            
        </Fragment>
    )
}

export default Contacts;