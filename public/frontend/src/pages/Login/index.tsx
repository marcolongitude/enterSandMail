import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { colors } from '../../styles'
import { Container, LoginBox, LogoSandMailImg, Title, ContainerComponentsLogin, FormLogin, Input, TextError, ButtonSubmit } from './styles'
import logoSandMail from '../../assets/images/logo.png' 

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { Redirect } from "react-router-dom"
import { ROUTES } from "../../constants"
import { flowService } from "../../helpers/flow"

import {useDispatch} from 'react-redux'
import { loginUser } from '../../store/slices/userLogin/userLoginSlice'
import { sessionUser } from '../../api'


interface IResponse {
  status?: number;
  error?: string;
  message?: string;
  data?: object;
}     

interface IFormInputs {
  user_email: string
  password: string
}

const schema = yup.object().shape({
  user_email: yup.string().email('Entre com um email válido').max(100).required('O campo email é obrigatório'),
  password: yup.string().required('O campo senha é obrigatório').min(6, 'A senha deve ter mais de 6 dígitos')
});

export const Login = (): JSX.Element => {

  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: IFormInputs) => {
    let response: IResponse = await sessionUser('sessions', data); 

    if(!response.data){
      console.log(response.message, response.status)
      return;
    }
    
    dispatch(loginUser(response.data))
    flowService.goTo(ROUTES.HOME);
  }

  useEffect(() => {
    const isAuth = localStorage.getItem("reduxState");
    if (isAuth) {
      setIsAuth(true);
    }
  }, []);

  return (
    <Container > 
      {isAuth ? ( 
          <Redirect to={ROUTES.HOME} />
      ) : (
        <LoginBox >
          <Title >Enter SandMail</Title>
          <LogoSandMailImg src={logoSandMail} alt='logo sand mail'/>
          <ContainerComponentsLogin >
              <FormLogin onSubmit={handleSubmit(onSubmit)}>
                <Input error={errors.user_email ? true : false} id="user_email" {...register("user_email")} placeholder="E-mail" />
                {errors.user_email && <TextError >{errors.user_email?.message}</TextError>}
                
                <Input error={errors.password ? true : false} id="password" {...register("password")} placeholder="Senha" />
                {errors.password && <TextError >{errors.password?.message}</TextError>}
                <ButtonSubmit type='submit'> Entrar</ButtonSubmit>
              </FormLogin>
          </ContainerComponentsLogin>
        </LoginBox>
      )}
    </Container>
  )
}

export default Login