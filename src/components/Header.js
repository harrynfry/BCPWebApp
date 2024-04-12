import '../css/Header.css'
import { Typography, Box } from '@mui/material';
function Header(){
    return(
      <Box marginBottom={2}>
        <header className="header">
          <Typography variant='h2'>News from BCP</Typography>
        </header>
        <Box  border={2}
              borderColor="#4a1657"
              padding={1}
              marginBottom={2}
              bgcolor="white">
          <Typography marginTop={1} marginLeft={20} marginRight={20} marginBottom={1} textAlign={'center'}>
            Welcome to my BCP Web Application. Here you can find budget charts as well as news from BCP council, while also being able to provide and view community feedback. 
            To leave feedback you'll have to click the article link, a submission form will then appear.
          </Typography>
        </Box>
      </Box>
      
    )
  }
export default Header;