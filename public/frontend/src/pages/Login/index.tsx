import React, { useEffect, useState } from 'react'
import { 
  Container, 
  LoginBox, 
  LogoSandMailImg, 
  Title, 
  ContainerComponentsLogin, 
  FormLogin, 
  TextError, 
  DotWrapper, 
  Dot 
} from './styles'

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

import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.min.css";

import { Text, TextButton } from '../../components/typography'
import { ButtonSubmit } from '../../components/buttonSubmit'
import { Input } from '../../components/input'



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
  const [loader, setLoader] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: IFormInputs) => {
    setLoader(true)
    let response: IResponse = await sessionUser('sessions', data); 

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
    toast.success(` ${response.status} : Login realizado com sucesso`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
    setTimeout(() => {
      dispatch(loginUser(response.data))
      flowService.goTo(ROUTES.HOME);
      setLoader(false)
    }, 3000);

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
          <ToastContainer />
          <Text color='blue' size="medium" >Enter Sand Email</Text>
          <LogoSandMailImg src={logoSandMail} alt='logo sand mail'/>
          <ContainerComponentsLogin >
              <FormLogin onSubmit={handleSubmit(onSubmit)}>
                <Input error={errors.user_email ? true : false} id="user_email" {...register("user_email")} placeholder="E-mail" />
                {errors.user_email && <TextError >{errors.user_email?.message}</TextError>}
                
                <Input type="password" error={errors.password ? true : false} id="password" {...register("password")} placeholder="Senha" />
                {errors.password && <TextError >{errors.password?.message}</TextError>}
                <ButtonSubmit type='submit'> 
                  {loader ?(
                    <DotWrapper>
                      <Dot delay="0s" />
                      <Dot delay=".1s" />
                      <Dot delay=".2s" />
                    </DotWrapper>
                  ): (
                    <TextButton color='white' size="xsmall" >Entrar</TextButton>
                  )}
                </ButtonSubmit>
              </FormLogin>
          </ContainerComponentsLogin>
        </LoginBox>
      )}
    </Container>
  )
}

export default Login