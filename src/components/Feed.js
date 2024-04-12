import FeedItem from './FeedItem';
import { Box, Typography } from '@mui/material';


function Feed({ data }) {
    return (
      <Box margin={2}>
        <Typography variant='h3' color={'#4a1657'} textAlign={'center'}>
          <b>News Feed</b>
        </Typography>
        {data.map((item, index) => (
          <FeedItem key={index} item={item} />
        ))}
      </Box>
    );
  }
export default Feed;