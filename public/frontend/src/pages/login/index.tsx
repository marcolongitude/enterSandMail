import React, { useState } from 'react'
import { Box, Container, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { colors } from '../../styles'
import logoSandMail from '../../assets/images/logo.png' 

import {useDispatch} from 'react-redux';
import { loginUser } from '../../store/slices/userLogin/userLoginSlice'
import { sessionUser } from '../../api'
import { AxiosResponse } from 'axios'


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
  }
})

interface IResponse {
  status?: number;
  error?: string;
  message?: string;
  data?: any;
}     

const Login = () => {
  const dispatch = useDispatch();
  
  const classes = useStyles()

  const [usuario, setUsuario] = useState("")
  const [senha, setSenha] = useState("")

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const body = {
      user_email: usuario,
      password: senha
    }
    
    try{
      let response: IResponse = await sessionUser('sessions', body);

      if(response.data){
        dispatch(loginUser(response.data))
      }else{
        console.log(response.message, response.status)
      }

    }catch(e){
      return e.message
    }

  }

  return (
    <Container className={classes.root}> 
      <Box className={classes.loginBox}>
        <h3 className={classes.title}>Enter SandMail</h3>
        <img className={classes.logo} src={logoSandMail} alt='logo sand mail'/>
        <div className={classes.containerComponentsLogin}>
          <form onSubmit={ e => handleSubmit(e) }>
            <TextField 
              className={classes.input} 
              variant="outlined" 
              label="Usuário" 
              name="usuario"
              value={usuario}
              onChange={ e => setUsuario(e.target.value)}  
            />
            <TextField 
              className={classes.input} 
              variant="outlined" 
              label="Senha" 
              name="senha"
              value={senha}
              onChange={ e => setSenha(e.target.value)}
            />
            <Button type='submit' size="large" className={classes.buttonLogin} variant="contained" color="primary"> Entrar </Button>
          </form>
        </div>
      </Box>
    </Container>
  )

}

export default Login