import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Typography, Grid, TextField, Button, Paper, AppBar, Toolbar, Container} from '@mui/material';
import { passwordGen } from '../passGen.js';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Copyright from '../components/Copyright'

// Generate password Data
function createData(email, password, website, username) {
  return { email, password, website, username};
}

export default function Passwords() {

  const navigate = useNavigate()
  let params = useParams()
  let pass = passwordGen()

    
  const [password, setPassword] = React.useState('')
  const [website, setWebsite] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [username, setUsername] = React.useState('')
  const [emailErr, setEmailErr] = React.useState(false)
  const [passErr, setPassErr] = React.useState(false)
  const [webNameErr, setWebNameErr] = React.useState(false)
  const [currUserData, setCurrUserData] = React.useState({passwords: []})

  const fetchData = async () => {
    const res = await axios.get(`https://password-man.herokuapp.com/user/${params.username}`)
    setCurrUserData(res.data)
  }

  React.useEffect(() => {
    fetchData()
  }, [])
  
    

  const handleSubmit = async (event) => {
    event.preventDefault();

    setEmailErr(false)
    setPassErr(false)
    setWebNameErr(false)
    
    if(email === '') {
        setEmailErr(true)
    }
    if(password === '') {
        setPassErr(true)
    }
    if (website === '') {
        setWebNameErr(true)
    }

    if (email && password && website){
        const newData = createData(email, password, website, username)

        await axios.patch(`https://password-man.herokuapp.com/user/${params.username}`, newData)
        setEmail('')
        setUsername('')
        setPassword('')
        setWebsite('')

        fetchData()
    }
    

  };
  return (
    <Container component="main">
    <Box sx={{'flexGrow': 1}}>
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{'flexGrow': 1}}>
          Welcome {params.username},
        </Typography>
        <Button color='inherit' onClick={() => navigate('/')}>Logout</Button>
      </Toolbar>
    </AppBar>
    <Grid container component="main" sx={{ height: '100vh' }}>

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
        >
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              my: 2,
              mx: 2
            }}
            >
            <Typography align='center' component="h2" variant="h6" color="primary" gutterBottom>
                Passwords
            </Typography>
            {currUserData.passwords.length === 0 ? <Typography align='left' variant='body2' color="textSecondary" >No Data Stored</Typography> : <Table size="small">
                <TableHead>
                <TableRow>
                    <TableCell>Email</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Password</TableCell>
                    <TableCell>Website</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {currUserData.passwords.map((data, idx) => (
                    <TableRow key={idx}>
                    <TableCell>{data.email}</TableCell>
                    <TableCell>{data.username}</TableCell>
                    <TableCell>{data.password}</TableCell>
                    <TableCell>{data.website}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>}
            </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square>
          <Box
            sx={{
              my: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography align='center' component="h2" variant="h6" color="primary" gutterBottom>
              Generate New Password
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2} >
            <Grid item xs={12}>
                <TextField
                  name="website"
                  required
                  fullWidth
                  label="Website"
                  error={webNameErr}
                  onChange={(e) => setWebsite(e.target.value)}
                  value={website}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    margin="normal"
                    fullWidth
                    label="Username"
                    name="username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    margin="normal"
                    required
                    error={emailErr}
                    fullWidth
                    label="Email Address"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    margin="normal"
                    error={passErr}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />             
            </Grid>
            <Grid item xs={12} sm={6}>
                <Button
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 3, mb: 2 }}
                    color='success'
                    onClick={() => setPassword(pass)}
                >
                    Generate Password
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    SAVE
                </Button>
            </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}