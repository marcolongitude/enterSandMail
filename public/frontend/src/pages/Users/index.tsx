import React, { useEffect, useState } from 'react';

import { getAllContacts, removeUser } from '../../api'
import { flowService } from "../../helpers/flow"

import { UserContainer, UserCard, UserList, ButtonWrapper, InfoUser, ContainerTags } from './styles';

import { Button } from '../../components/button'
import { Text, TextButton } from '../../components/typography'
import { Tag } from '../../components/tag'
import { ROUTES } from '../../constants';
import { toast, ToastContainer } from 'react-toastify';

export const Users = (): JSX.Element => {

  const [dataContacts, setDataContacts] = useState([])

  async function getContacts(token: string) {
    const contacts: any = await getAllContacts('/users', token)
    let contactsActive: any = contacts.data.filter((contact: any) => contact.active === 'active')
    setDataContacts(contactsActive)
  }
  useEffect(()=> {
    const token: any = localStorage.getItem('reduxState')
    getContacts(token)
  }, [])
  
  const redirectAddUser = () => {
    flowService.goTo(ROUTES.ADD_USERS)
  }

  const handleRemoveUser = async(id_user: number) => {
    const token: any = localStorage.getItem('reduxState')

    try {
      const response: any = await removeUser('/users', id_user, token)

      if(response.status === 200) {
        toast.success(` ${response.status} : Usuário deletado com sucesso`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        getContacts(token)
      }
      
    } catch (error) {
      
    }


    getContacts(token)
  }

  const renderContactsCard = () => {
    return (
      <>
        <ToastContainer />
        {dataContacts && dataContacts.map((contact: any, index) => (
          <UserCard key={index}>
            <InfoUser>
              <p >{contact.user_name}</p>
              <p >{contact.user_email}</p>
            </InfoUser>
            <ContainerTags>
              <Tag width="medium" height="thin">
                <TextButton size="tiny" color="white" >Editar</TextButton>
              </Tag>
              <Tag onClick={()=> handleRemoveUser(contact.id_user)} width="medium" height="thin" color="red">
                <TextButton size="tiny" color="white" >Excluir</TextButton>
              </Tag>
            </ContainerTags>
          </UserCard>
        ))}
      </>
    )
  }

  return (
    <UserContainer>
      <Text size="large" color="blue" >Lista de usuários</Text>
      <ButtonWrapper>
        <Button onClick={redirectAddUser} width="exsmall" color="blue" type="submit">Adicionar Usuário</Button>
      </ButtonWrapper>
      <UserList>
        {renderContactsCard()}  
      </UserList>
    </UserContainer>  
  );

}

export default Users;