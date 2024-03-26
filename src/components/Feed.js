import FeedItem from './FeedItem';

function Feed({ data }) {
    return (
      <div className="feed-container">
        {data.map((item, index) => (
          <FeedItem key={index} item={item} />
        ))}
        
      </div>
    );
  }
export default Feed;