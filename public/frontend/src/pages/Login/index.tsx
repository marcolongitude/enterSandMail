import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { colors } from '../../styles'
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


const useStyles = makeStyles({
  root: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundColorDefault,
    height: '40%',
    width: '65%',
    borderRadius: 9,
    padding: 30
  },
  containerComponentsLogin: {
    width: '90%',
    maxWidth: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '70%'
  },  
  input: {
    width: '100%',
    minWidth: '80%',
    margin: '10px 0 10px 0',
    backgroundColor: colors.backgroundInput,
    height: '30px',
    borderRadius: '5px',
    boxSizing: 'border-box',
    padding: 10,
    border: '1px solid #ccc',
  },
  inputError: {
    width: '100%',
    minWidth: '80%',
    margin: '10px 0 10px 0',
    backgroundColor: colors.backgroundInput,
    height: '30px',
    border: '2px solid #c40000',
    borderRadius: '5px',
    boxSizing: 'border-box',
    padding: 10
  },
  buttonLogin: {
    // backgroundColor: colors.blueActive,
    margin: '15px 0 0 0',
    width: '100%',
    height: '36px',
    color: 'white',
    backgroundColor: '#0077b6',
    borderRadius: '6px',
  },
  logo: {
    height: 80,
    margin: '-25px 0 10px 0'
  },
  title: {
    paddingBottom: 10
  },
  errorInput: {
    color: '#c40000',
    fontSize: '14px',
    marginTop: '-6px',
  }
})

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
  const classes = useStyles()
  const [isAuth, setIsAuth] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: IFormInputs) => {
    let response: IResponse = await sessionUser('sessions', data); 

    if(response.data){
      dispatch(loginUser(response.data))
    }else{
      console.log(response.message, response.status)
      return;
    }
  
    flowService.goTo(ROUTES.HOME);
  }

  useEffect(() => {
    const isAuth = localStorage.getItem("reduxState");
    if (isAuth) {
      setIsAuth(true);
    }
  }, []);

  return (
    <div className={classes.root}> 
      {isAuth ? ( 
          <Redirect to={ROUTES.HOME} />
      ) : (
        <div className={classes.loginBox}>
          <h3 className={classes.title}>Enter SandMail</h3>
          <img className={classes.logo} src={logoSandMail} alt='logo sand mail'/>
          <div className={classes.containerComponentsLogin}>
              <form className={classes.formContainer} onSubmit={handleSubmit(onSubmit)}>
                <input className={errors.user_email ? classes.inputError : classes.input} id="user_email" {...register("user_email")} placeholder="E-mail" />
                {errors.user_email && <span className={classes.errorInput} >{errors.user_email?.message}</span>}
                
                <input className={errors.password ? classes.inputError : classes.input} id="password" {...register("password")} placeholder="Senha" />
                {errors.password && <span className={classes.errorInput} >{errors.password?.message}</span>}
                <button 
                  type='submit'
                  className={classes.buttonLogin} 
                  > Entrar 
                </button>
              </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login