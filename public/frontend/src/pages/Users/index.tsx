import React, { useEffect, useState } from 'react';

import { getAllContacts } from '../../api'

import { UserContainer, UserCard, UserList, ButtonWrapper, InfoUser } from './styles';

import { Button } from '../../components/button'
import { Text, TextButton } from '../../components/typography'
import { Tag } from '../../components/tag'

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
            <InfoUser>
              <p >{contact.user_name}</p>
              <p >{contact.user_email}</p>
            </InfoUser>
            <Tag width="medium" height="thin">
              <TextButton size="tiny" color="white" >Editar</TextButton>
            </Tag>
          </UserCard>
        ))}
      </>
    )
  }

  return (
    <UserContainer>
      <Text size="large" color="blue" >Lista de usuários</Text>
      <ButtonWrapper>
        <Button width="exsmall" color="blue" type="submit">Adicionar Usuário</Button>
      </ButtonWrapper>
      <UserList>
        {renderContactsCard()}  
      </UserList>
    </UserContainer>  
  );

}

export default Users;