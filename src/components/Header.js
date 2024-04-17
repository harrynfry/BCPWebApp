import '../css/Header.css'
import { Typography, Box, Link, Button } from '@mui/material';
function Header(){

  // returns survey info and social links
    return(
      <Box marginBottom={2}
              borderLeft={2}
              borderRight={2}
              borderColor="#4a1657"
              bgcolor="white">

        <header className="header">
          <Typography variant='h2'>News from BCP</Typography>
        </header>
        
        <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center" margin={1}>
          <Typography marginTop={1} marginLeft={2} marginRight={2} marginBottom={1} textAlign={'center'}>
            After interacting with the app, please take the time to complete this survey.
          </Typography>
          <Button variant='outlined' component="a" href='https://app.onlinesurveys.jisc.ac.uk/s/solent/civic-engagement-and-democratic-awareness-in-bournemouth-christ' target="_blank">
            Survey
          </Button>
        </Box>

        <Box  borderTop={1}
              borderBottom={2}
              borderColor="#4a1657"
              padding={1}
              marginBottom={2}
              bgcolor="white">
            <Typography variant="h6" textAlign="center">
                      BCP on social media:
                      {' '}
                      <Link href="https://www.facebook.com/MyBCPCouncil" target="_blank" rel="noopener">
                          Facebook
                      </Link>
                      {' | '}
                      <Link href="https://twitter.com/bcpcouncil" target="_blank" rel="noopener">
                          Twitter (X)
                      </Link>
                      {' | '}
                      <Link href="https://www.linkedin.com/company/bcpcouncil" target="_blank" rel="noopener">
                          LinkedIn
                      </Link>
                      {' | '}
                      <Link href="https://www.youtube.com/channel/UCaearvk1qkoYvDSuCxlokyw" target="_blank" rel="noopener">
                          Youtube
                      </Link>
                      {' | '}
                      <Link href="https://www.instagram.com/mybcpcouncil" target="_blank" rel="noopener">
                          Instagram
                      </Link>
                      {' | '}
                      <Link href="https://nextdoor.co.uk/agency-detail/england/bcp/bcp-council" target="_blank" rel="noopener">
                          Nextdoor
                      </Link>
                      {' | '}
                      <Link href="https://www.tiktok.com/@bcpcouncil" target="_blank" rel="noopener">
                          Tiktok
                      </Link>
                  </Typography>
          </Box>
      </Box>
      
    )
  }
export default Header;