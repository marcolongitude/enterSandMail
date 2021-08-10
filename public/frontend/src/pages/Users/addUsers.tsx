import React from 'react'
import { ContainerAddUser, ContainerTitle, ContainerForm, SideForm } from './stylesAddUser'
import { Text, Input, Select } from '../../components'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"

interface IFormInputs {
  user_name: string;
  user_email: string;
  password: string;
}

const schema = yup.object().shape({
  user_name: yup.string().email('Entre com um nome válido').max(100).required('O campo nome é obrigatório'),
  user_email: yup.string().email('Entre com um email válido').max(100).required('O campo email é obrigatório'),
  user_password: yup.string().email('Entre com um senha válida').max(100).required('O campo senha é obrigatório'),
});

export const AddUsers = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: IFormInputs) => {

  }

  return (
    <ContainerAddUser>
      <ContainerTitle>
        <Text color="blue">Adicionar usuário</Text>
      </ContainerTitle>

      <ContainerForm onSubmit={handleSubmit(onSubmit)}>
        <SideForm>
          <Input width="block" error={errors.user_name ? true : false} {...register("user_name")} id="user_name" placeholder="Nome do usuário"/>
          <Input width="block" error={errors.user_email ? true : false} {...register("user_email")} id="user_email" placeholder="Email do usuário"/>
        </SideForm>
        <SideForm>
          <Input width="block" error={errors.password ? true : false} {...register("password")} id="password" placeholder="Senha do usuário" type="password"/>

          <Select>
            <option value="usuario">Usuário</option>
            <option value="admin">Administrador</option>
            <option value="super">Super usuário</option>
          </Select>
        </SideForm>
      </ContainerForm>

    </ContainerAddUser>
  )
}

export default AddUsers