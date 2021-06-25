import React from 'react'
import { Box, Container, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { colors } from '../../styles'
import logoSandMail from '../../assets/images/logo.png' 

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
  }
})

const Login = () => {
  const classes = useStyles()

  return (
    <Container className={classes.root}> 
      <Box className={classes.loginBox}>
        <img className={classes.logo} src={logoSandMail} alt='logo sand mail'/>
        <div className={classes.containerComponentsLogin}>
          <TextField className={classes.input} variant="outlined" label="Usuário" />
          <TextField className={classes.input} variant="outlined" label="Senha" />
          <Button size="large" className={classes.buttonLogin} variant="contained" color="primary"> Entrar </Button>
        </div>
      </Box>
    </Container>
  )

}

export default Login