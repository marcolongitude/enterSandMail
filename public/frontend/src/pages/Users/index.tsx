import React, { useEffect, useState } from 'react';

import { getAllContacts } from '../../api'

import { UserContainer, UserCard, UserList, ButtonWrapper } from './styles';

import { ButtonSubmit } from '../../components/buttonSubmit'
import { Text } from '../../components/typography'

export const Users = (): JSX.Element => {

  const [dataContacts, setDataContacts] = useState([])
  async function getContacts(token: string) {
    const contacts: any = await getAllContacts('/users', token)
    setDataContacts(contacts.data)
  }
  useEffect(()=> {
    const token: any = localStorage.getItem('reduxState')
    getContacts(token)
  }, [])
  
  console.log(dataContacts)

  const renderContactsCard = () => {
    return (
      <>
        {dataContacts && dataContacts.map((contact: any, index) => (
          <UserCard key={index}>
            <p >{contact.user_name}</p>
            <p >{contact.user_email}</p>
          </UserCard>
        ))}
      </>
    )
  }

  return (
    <UserContainer>
      <Text size="large" color="blue" >Lista de usuários</Text>
      <ButtonWrapper>
        <ButtonSubmit width="exsmall" color="blue" type="submit">Adicionar Usuário</ButtonSubmit>
      </ButtonWrapper>
      <UserList>
        {renderContactsCard()}  
      </UserList>
    </UserContainer>  
  );

}

export default Users;