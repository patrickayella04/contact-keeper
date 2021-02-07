import React, { useState, useContext, useEffect } from 'react'; // Since this a form we will need some component level state(i.e. as we type in the input the state changes).
import ContactContext from '../../../context/contact/contactContext';

const ContactForm = () => {
    const contactContext = useContext(ContactContext);

    // We want the form filled out based on if there is anything in the current value. And we want this to run as soon as the form is created or mounted.So we use useEffect hook which will mimic the lifecycle method, componentDidMount.
    const { addContact, updateContact, clearCurrent, current } = contactContext; 
    useEffect(() => {
        if (current !== null) {
            setContact(current);
        } else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            });
        }
    }, [contactContext, current]); // We add dependencies, as we only want this to happen on certain occasions- when the contactContext is changed or the current is changed. 

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    // Here we pull the values above from contact.
    const { name, email, phone, type } = contact;

    const onChange = e => setContact({ ...contact, [e.target.name]: e.target.value }); // name and value in the input should be the same. i.e. name: email is same value as value:{email} below. 

    // We add a submit handler to the form so we can connect our form to our context state via a function we create called addContact() which will add a contact when we submit our form values. 
    const onSubmit = e => {
        e.preventDefault();
        if (current === null) {
            addContact(contact);
        } else {
            updateContact(contact);
            
        }
        clearAll();
        // setContact({
        //     name: '',
        //     email: '',
        //     phone: '',
        //     type: 'personal'
        // });
    };

    const clearAll = () => {
        clearCurrent();
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
            <input
                type="text"
                placeholder='Name'
                name='name'
                value={name}
                onChange={onChange}
            />
            <input
                type="text"
                placeholder='Email'
                name='email'
                value={email}
                onChange={onChange}
            />
            <input
                type="text"
                placeholder='Phone'
                name='phone'
                value={phone}
                onChange={onChange}
            />
            <h5>Contact Type</h5>
            <input
                type="radio"
                name="type"
                value="personal"
                checked={type === 'personal'}
                onChange={onChange}
            />{' '}
            Personal{' '}
            <input
                type="radio"
                name="type"
                value="professional"
                checked={type === 'professional'}
                onChange={onChange}
            />{' '}
             Professional
            <div>
                <input type="submit"
                    value={current ? 'Update Contact' : 'Add Contact'}
                    className="btn btn-primary btn-block" />
            </div>
            {current && <div>
                <button className="btn btn-light btn-block"onClick={clearAll}>Clear</button>
            </div>}
        </form>
    )
}


export default ContactForm