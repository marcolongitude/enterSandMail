import React, { useState } from 'react'

import { addUser } from '../../api'
// import { IResponse } from '../../interfaces'

import { ContainerAddUser, ContainerTitle, ContainerForm, SideForm } from './stylesAddUser'
import { Text, TextError, Input, Select, Button, TextButton, DotWrapper, Dot } from '../../components'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.min.css";
import { flowService } from '../../helpers/flow'
import { ROUTES } from '../../constants'

interface IFormInputs {
  user_name: string;
  user_email: string;
  password: string;
  user_permission: string;
}

export interface IResponse {
  status?: number;
  error?: string;
  message?: string;
  data?: object;
} 

const schema = yup.object().shape({
  user_name: yup.string().max(100).required('O campo nome é obrigatório'),
  user_email: yup.string().email('Entre com um email válido').max(100).required('O campo email é obrigatório'),
  password: yup.string().max(100).required('O campo senha é obrigatório'),
});

export const AddUsers = () => {

  const [loader, setLoader] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: IFormInputs) => {

    setLoader(true)

    console.log(data)

    const token: any = localStorage.getItem('reduxState')

    let response: any = await addUser('users', data, token)

    if(!response.data){
      console.log(response.message, response.status)
      toast.error(` ${response.status} : ${response.message} `, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      setLoader(false)
      return;
    }

    toast.success(` ${response.status} : Usuário criado com sucesso`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
    setTimeout(() => {
      
      flowService.goTo(ROUTES.USERS);
      setLoader(false)
    }, 3000);

    setLoader(false)

    console.log(response)
  }

  return (
    <ContainerAddUser>
       <ToastContainer />
      <ContainerTitle>
        <Text color="blue">Adicionar usuário</Text>
      </ContainerTitle>

      <ContainerForm onSubmit={handleSubmit(onSubmit)}>
        <SideForm>
          <Input width="block" error={errors.user_name ? true : false} {...register("user_name")} id="user_name" placeholder="Nome do usuário"/>
          {errors.user_name && <TextError >{errors.user_name?.message}</TextError>}
          <Input width="block" error={errors.user_email ? true : false} {...register("user_email")} id="user_email" placeholder="Email do usuário"/>
          {errors.user_email && <TextError >{errors.user_email?.message}</TextError>}
        </SideForm>
        <SideForm>
          <Input width="block" error={errors.password ? true : false} {...register("password")} id="password" placeholder="Senha do usuário" type="password"/>
          {errors.password && <TextError >{errors.password?.message}</TextError>}
          <Select {...register("user_permission")} id="user_permission">
            <option value="usuario">Usuário</option>
            <option value="admin">Administrador</option>
            <option value="super">Super usuário</option>
          </Select>
        </SideForm>

        <Button type='submit'> 
          {loader ?(
            <DotWrapper>
              <Dot delay="0s" />
              <Dot delay=".1s" />
              <Dot delay=".2s" />
            </DotWrapper>
          ): (
            <TextButton color='white' size="xsmall" >Salvar Usuário</TextButton>
          )}
        </Button>
      </ContainerForm>

    </ContainerAddUser>
  )
}

export default AddUsers