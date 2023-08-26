import { createTheme } from "@mui/material";



const Theme = createTheme({
    typography:{
        h5:{
            color:'white',
            size:20,
            fontWeight: 'bold'
        },
        h6:{
            fontWeight: 'bold',
            color:'#616161'
        },
        body1:{
            fontStyle: 'italic',
            color:'#bdbdbd'
        }
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#212121',
                    borderRadius:40,
                    
                    
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                contained: {
                    background: 'linear-gradient(45deg , #9e9d24 ,#bdbdbd )',
                    transition:  'background 0.3s ease-in-out',
                    ":hover":{
                        background: 'linear-gradient( 45deg,#827717 , #9e9e9e)'
                    }

                },
            }
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    height: 70,
                    width: 70
                }
            }
        },
        
    }
})

export default Theme