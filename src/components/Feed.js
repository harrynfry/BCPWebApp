import FeedItem from './FeedItem';
import { Box, Typography, Link } from '@mui/material';


function Feed({ data }) {

  // returns container with FeedItem components
    return (
      <Box margin={2}>
        
        <Typography variant='h3' color={'#4a1657'} textAlign={'center'}>
          <b>News Feed</b>
          <Box sx={{margin: 1, borderRadius: 2, background: '#ffff99', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)'}}>
            <Typography variant='h6' color={'#4a1657'}>
              Next election: Police and Crime Commissioner (2 May 2024)
              <Typography variant='h6'>
                <Link href="https://www.bcpcouncil.gov.uk/councillors-committees-and-elections/elections-and-voting/register-to-vote" target="_blank" rel="noopener">
                  Register to vote.
                </Link>
              </Typography>
              
            </Typography>

          </Box>
          <Box sx={{margin: 1, borderRadius: 2, background: 'white', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)'}}>
            <Typography variant='h6' color={'#4a1657'}>
              To leave feedback, click the article link and return to this page.
            </Typography>
          </Box>
        </Typography>
        {data.map((item, index) => (
          <FeedItem key={index} item={item} />
        ))}
      </Box>
    );
  }
export default Feed;