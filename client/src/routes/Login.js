import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import bgImage from '../images/pwman.jpg'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Copyright from '../components/Copyright'

export default function Login() {

    const navigate = useNavigate()
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const smBg = {
      bgcolor: '#f5f5f5',
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover'
    }

    const [emailErr, setEmailErr] = React.useState(false)
    const [passErr, setPassErr] = React.useState(false)
    const [authUser, setAuthUser] = React.useState('')
    const [authPass, setAuthPass] = React.useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get('username')
    const password = data.get('password')

    setEmailErr(false)
    setPassErr(false)
    
    if(username === '') {
        setEmailErr(true)
    }
    if(password === '') {
        setPassErr(true)
    }

    if (username && password){

      let url = `https://password-man.herokuapp.com/user/${username}`
      const {data} = await axios.get(url)

      if (data) {
        if (password === data.password) {
          navigate(`/password/${username}`)
        } else {
          setPassErr(true)
          setAuthPass('Incorrect Password')
        }
      } else {
        setAuthUser('User does not exist')
        setEmailErr(true)
        
      }
      
  
    }
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${bgImage})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid sx={matches ? smBg : null} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                error={emailErr}
                helperText={authUser}
                fullWidth
                label="Username"
                name="username"
                autoFocus
              />
              <TextField
                margin="normal"
                error={passErr}
                helperText={authPass}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}