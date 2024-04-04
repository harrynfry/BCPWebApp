import FeedItem from './FeedItem';
import { Box } from '@mui/material';


function Feed({ data }) {
    return (
      <Box margin={2}>
        {data.map((item, index) => (
          <FeedItem key={index} item={item} />
        ))}
      </Box>
    );
  }
export default Feed;