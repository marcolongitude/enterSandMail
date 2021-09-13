import React, { useEffect, useState } from 'react';

import { getAllContacts, removeUser, IUser } from '../../api'
import { flowService } from "../../helpers/flow"

import { UserCard, UserList, ButtonWrapper, InfoUser, ContainerTags } from './styles';

import { Button } from '../../components/button'
import { Text, TextButton } from '../../components/typography'
import { Tag } from '../../components/tag'
import { SimpleCard } from '../../components/card'

import { ROUTES } from '../../constants';

import { toast, ToastContainer } from 'react-toastify';

import Layout from '../../layout';


export const Users = (): JSX.Element => {

  const [dataContacts, setDataContacts] = useState<IUser[]>([])
  const [tokenAuth, setTokenAuth] = useState('')

  async function getContacts() {
    const token: string | null = localStorage.getItem('reduxState')

    if(!token) return

    setTokenAuth(token)

    const response: any = await getAllContacts('/users', token)
    
    if(!response) return []

    setDataContacts(response.data)
  }
  
  useEffect(()=> { getContacts() }, [])
  
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

  const handleUpdateUser = async() => {
    alert('teste botao editar')
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
              <Tag onClick={handleUpdateUser} width="medium" height="thin">
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

  const renderHeader = () => {
    return (
      <>
        <Text size="large" color="blueActive" >Lista de usuários</Text>  
        <ButtonWrapper>
          <Button onClick={redirectAddUser} width="exsmall" color="blueActive" type="submit">Adicionar Usuário</Button>
        </ButtonWrapper>    
      </>
    )
  }

  const renderMain = () => {
    return (
      <>
        {dataContacts &&
          <div>
            <UserList>
              {renderContactsCard()}  
            </UserList>
          </div>
        }
        {!dataContacts &&
          <SimpleCard color="backgroundColorSimpleCard" text="Nenhum usuário encontrado, cadastre um usuário" />
        }
      </>
    )
  }

  return (

    <Layout
      header = {renderHeader()}
      children = {renderMain()}
    />
  );

}

export default Users;