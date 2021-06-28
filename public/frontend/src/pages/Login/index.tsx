import React, { useEffect, useState } from 'react'
import { Box, Container, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { colors } from '../../styles'
import logoSandMail from '../../assets/images/logo.png' 

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
  input: {
    width: '100%',
    minWidth: '80%',
    margin: '10px 0 10px 0',
    backgroundColor: colors.backgroundInput
  },
  buttonLogin: {
    // backgroundColor: colors.blueActive,
    margin: '15px 0 0 0',
    width: '100%'
  },
  logo: {
    height: 80,
    margin: '-25px 0 10px 0'
  },
  title: {
    paddingBottom: 10
  },
  errorInput: {
    color: '#922a2a'
  }
})

interface IResponse {
  status?: number;
  error?: string;
  message?: string;
  data?: object;
}     

export const Login = (): JSX.Element => {

  const dispatch = useDispatch();
  const classes = useStyles()
  const [isAuth, setIsAuth] = useState(false);
  const [hasError, setHasError] = useState({ isError: false, message: ""}); 
  const [formState, setFormState] = useState({ user_email: "", password: "" });

  const [errorsState, setErrorsState] = useState({fields: {user_email: '', password: ''}, errors: {user_email: '', password: ''} })

  useEffect(() => {
    const isAuth = localStorage.getItem("reduxState");
    if (isAuth) {
      setIsAuth(true);
    }
  }, []);

  const handleChange = (event: any) => {
    const { name, value } = event.target; 

    setFormState({
      ...formState,
      [name]: value 
    });

  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault(); 

    if(handleValidation()){
      let response: IResponse = await sessionUser('sessions', formState); 
      
      if(response.data){
        dispatch(loginUser(response.data))
      }else{
        console.log(response.message, response.status)
        setHasError({ isError: true, message: "Usuário ou senha inválidos"});
        return;
      }
  
      flowService.goTo(ROUTES.HOME);
    }

  };

  const handleValidation = (): boolean => {
    interface IErrors {
      user_email: string;
      password: string
    }
    interface IFields {
      user_email: string;
      password: string
    }

    let fields: IFields = formState;
    let errors: IErrors = {user_email: '', password: ''};
    let formIsValid = true;

    //Name
    if(!fields["password"]){
      formIsValid = false;
      errors["password"] = "Este campo é obrigatório";
    }

    //Email
    if(typeof fields["user_email"] !== "undefined"){
      let lastAtPos = fields["user_email"].lastIndexOf('@');
      let lastDotPos = fields["user_email"].lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["user_email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["user_email"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["user_email"] = "Digite um email válido";
      }
    }

    if(!fields["user_email"]){
      formIsValid = false;
      errors["user_email"] = "Este campo é obrigatório";
    }

    setErrorsState({fields: {user_email: fields["user_email"], password: fields["password"]}, errors: errors});
    return formIsValid;
  }

  return (
    <Container className={classes.root}> 
      {isAuth ? ( 
          <Redirect to={ROUTES.HOME} />
      ) : (
        <Box className={classes.loginBox}>
          <h3 className={classes.title}>Enter SandMail</h3>
          <img className={classes.logo} src={logoSandMail} alt='logo sand mail'/>
          <div className={classes.containerComponentsLogin}>
              {hasError.isError && <p>{ hasError.message }</p>}{" "}
              <TextField 
                error={hasError.isError}
                required
                id="standard-required"
                className={classes.input} 
                variant="outlined" 
                label="E-mail" 
                name="user_email"
                onChange={ handleChange }  
                value={formState["user_email"]}
              />
              <span className={classes.errorInput}>{errorsState.errors["user_email"]}</span>
              <TextField 
                error={hasError.isError}
                required
                type="password"
                id="standard-required"
                className={classes.input} 
                variant="outlined" 
                label="Senha" 
                name="password"
                onChange={ handleChange }
                value={formState["password"]}
              />
              <span className={classes.errorInput}>{errorsState.errors["password"]}</span>
              <Button 
                onClick={ handleSubmit } 
                //onClick={ () => {myRef.current.reportValidity()}} 
                size="large" className={classes.buttonLogin} 
                variant="contained" 
                color="primary"
                > Entrar 
              </Button>
          </div>
        </Box>
      )}
    </Container>
  )
}

export default Login