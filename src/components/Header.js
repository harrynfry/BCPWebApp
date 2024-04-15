import '../css/Header.css'
import { Typography, Box, Link } from '@mui/material';
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
          <Typography marginTop={1} marginLeft={2} marginRight={2} marginBottom={1} textAlign={'center'}>
            Welcome to my BCP Web App, here you'll be able to view council news and updates, while also being able to leave your feedback and opinions!
            Before you can leave any feedback, you must access the article via the supplied link. 
          </Typography>

          <Typography variant="body1" textAlign="center">
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