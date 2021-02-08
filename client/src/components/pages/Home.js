import React, { useContext, useEffect } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/AuthContext';

const Home = () => {
    const authContext = useContext(AuthContext);
    
    useEffect(() => {
        // Once we are inside pass login, when we reload the page function below will keep us on the home page.
        authContext.LoadUser(); 
        // eslint-disable-next-line
    }, []);
    
    return (
        <div className="grid-2">
            <div>
            <ContactForm />
            </div>
            <div>
                <ContactFilter />
                <Contacts />
            </div>
        </div>
    )
}

export default Home