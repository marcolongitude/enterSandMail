import React, { useEffect, useState } from 'react';

import { getAllContacts } from '../../api'

import { ContactWrapper, ContactCard } from './styles';

export const Users = (): JSX.Element => {

  const [dataContacts, setDataContacts] = useState([])
  useEffect(()=> {

    const token: any = localStorage.getItem('reduxState')

    async function getContacts() {
      const contacts: any = await getAllContacts('/users',token)
      setDataContacts(contacts.data)
    }
    
    getContacts()
    
  }, [])
  console.log(dataContacts)

  const renderContactsCard = () => {
    return (
      <>
        {dataContacts && dataContacts.map((contact: any, index) => (
          <ContactCard key={index}>
            <p >{contact.user_name}</p>
            <p >{contact.user_email}</p>
          </ContactCard>
        ))}
      </>
    )
  }

  return (
    <ContactWrapper>
      {renderContactsCard()}
    </ContactWrapper>  
  );

}

export default Users;