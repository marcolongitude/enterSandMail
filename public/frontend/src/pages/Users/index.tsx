import React, { useEffect, useState } from 'react';

import { getAllContacts, removeUser } from '../../api'
import { flowService } from "../../helpers/flow"

import { UserContainer, UserCard, UserList, ButtonWrapper, InfoUser, ContainerTags } from './styles';

import { Button } from '../../components/button'
import { Text, TextButton } from '../../components/typography'
import { Tag } from '../../components/tag'
import { SimpleCard } from '../../components/card'

import { ROUTES } from '../../constants';

import { toast, ToastContainer } from 'react-toastify';


export const Users = (): JSX.Element => {

  const [dataContacts, setDataContacts] = useState([])
  const [tokenAuth, setTokenAuth] = useState('')

  async function getContacts() {
    const token: any = localStorage.getItem('reduxState')
    setTokenAuth(token)
    
    const contacts: any = await getAllContacts('/users', token)
    setDataContacts(contacts?.data)
  }
  
  useEffect(()=> {

    getContacts()
  }, [])
  
  const redirectAddUser = () => {
    flowService.goTo(ROUTES.ADD_USERS)
  }

  const handleRemoveUser = async(id_user: number) => {

    try {
      const response: any = await removeUser('/users', id_user, tokenAuth)

      if(response.status === 200) {
        toast.success(` ${response.status} : ${response.data}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
        getContacts()
      }

      if(response.status === 409) {
        toast.error(` ${response.status} : ${response.data} `, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
      
    } catch (error) {

      console.log(error)
      
    }

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
      {dataContacts &&
        <div>
          <UserList>
            {renderContactsCard()}  
          </UserList>
        </div>
      }
      {!dataContacts &&
        <SimpleCard text="Nenhum usuário encontrado, cadastre um usuário" />
      }
    </UserContainer>  
  );

}

export default Users;