import { AppBar, Avatar, Box, Button, CircularProgress, Grid, IconButton, LinearProgress, Stack, ThemeProvider, Toolbar, Typography } from '@mui/material';
import CssBaseLine from '@mui/material/CssBaseline'
import Theme from './Theme';
import { useEffect, useState } from 'react';
import RefreshIcon from '@mui/icons-material/Refresh';

function App() {
  const[data  , setData] = useState([])
  const[percentage , setPercentage]  = useState(0)
  const[startLoading ,setStartLoading] = useState(false)
  const[fetchData , setFetchData] = useState(false)

  useEffect(() => {
    const interval = setInterval(() =>{
      if(startLoading){
        if(percentage < 100){
          setPercentage((prev) => prev+5)
        }
        else{
          clearInterval(interval)
          setStartLoading(false)
          setFetchData(true)
        }
      }
    },300);
    return ()=>clearInterval(interval)
  },[percentage ,startLoading])

  useEffect(() =>{
    if(fetchData){
      fetch('https://reqres.in/api/users?page=1')
      .then(res => res.json())
      .then(data => setData(data.data))
    
      .catch(err => console.error("Error fetching data : ",err))
    }
  })
  
    const refreshAll = () =>{
      setPercentage(0)
      setFetchData(false)
    }
    
  
  

  return (
    <ThemeProvider theme = {Theme}>
    <div className="App" style={{backgroundColor:"#616161" , height:"100vh" ,backgroundSize:'cover'}}>
      <CssBaseLine/>
      <AppBar>
        <Toolbar>
          <Typography variant='h5'>Api Call</Typography>
        </Toolbar>
      </AppBar>
      <div style={{height:120}}></div>

      <Stack direction='row' display='flex' justifyContent='center' spacing={2}>
        <Button variant='contained' onClick={()=>setStartLoading(true)}>Get Users</Button>
        <IconButton onClick={refreshAll}><RefreshIcon/></IconButton>
      </Stack><br/>


      {fetchData?
       
      <Grid  container spacing={5} display='flex' justifyContent='center' p={2}>

      {data.map(item =>(
        <Grid key={item.id} item lg={4} md={6} sm={12}>
          <Box sx={{
            borderRadius:50 , 
            border:'solid 1px #9e9e9e', 
            background:item.id%2===0? 'linear-gradient(135deg,#bdbdbd,#212121)' :'linear-gradient(45deg,#212121,#263238)' , 
            padding:2,
            transition:'transform ease-in-out 300ms',
            cursor:'pointer',
            ":hover":{
              transform:'scale(1.05)'
            }
            }}>

            <Stack direction='row' spacing={2} display='flex' alignItems='center'>
              <Avatar src={item.avatar}/>
              <Stack direction='column'>
                <Typography variant='h6'>{item.first_name} &nbsp;{item.last_name}</Typography>
                <Typography variant='body1'>{item.email}</Typography>
              </Stack>
            </Stack>  
          </Box> 
        </Grid>
      ))}
      </Grid>:
      
        <Stack direction='column' display='flex' alignItems='center'  justifyContent='center'>
          <CircularProgress variant='determinate'  value={percentage}  />
          {startLoading&& <Typography variant='h5'>
                  {percentage>30&&percentage<=60?'Fetch Users':percentage>60&&percentage<=80?'Almost Done':percentage>80?'Just a sec':'Loading'} {percentage}%
          </Typography>}
        </Stack>
        }
    </div>
    </ThemeProvider>
  );
}

export default App;
