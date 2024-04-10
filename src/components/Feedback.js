import React from 'react';
import FeedbackItem from './FeedbackItem';
import { Typography, Box } from '@mui/material';

function Feedback({ item, fbID }) {
    
    let numCompliments = 0;
    let numComplaints = 0;
    let numComments = 0;

    // gather amount of compliments, comments and complaints
    item.forEach(fb => {
        if(fb.rating === 1){
            numCompliments+=1;
        }else if(fb.rating ===2){
            numComplaints +=1;
        }else{
            numComments+=1;
        }
    });

    // set sentiment value based on largest amount of comments
    const sentiment = () => {
        if (numCompliments === numComplaints && numComplaints === numComments) {
            return "Split";
        } else if (numCompliments > numComplaints && numCompliments > numComments) {
            return "Positive";
        } else if (numComplaints > numCompliments && numComplaints > numComments) {
            return "Negative";
        } else {
            return "Neutral";
        }
    }

    console.log("feedback render ", fbID);
    console.log(item);
    console.log("compliments", numCompliments);
    console.log("complaints", numComplaints);
    console.log("comments", numComments);

    return (
        <Box
        marginTop={1}
        marginLeft={1}
        marginRight={1}
        border={1}
        borderRadius={3}
        borderColor="#4a1657"
        padding={1}
        marginBottom={2}
        bgcolor="white">
            
            
            {item.length > 0 ? (
                
                <ul>
                    <Typography variant='body1'>Feedback has been {sentiment()} so far!</Typography>
                    
                    {item.map(feedback => (
                        <FeedbackItem key={feedback.id} feedback={feedback} />
                    ))}
                </ul>
            ) : (
                <Typography variant='body1'>No one has left any feedback yet, be the first!</Typography>
            )}
        </Box>
    );
}

export default Feedback;
