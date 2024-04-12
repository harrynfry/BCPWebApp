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
            numCompliments++;
        }else if(fb.rating ===3){
            numComplaints ++;
        }else{
            numComments++;
        }
    });

    

    // set sentiment value based on largest amount of comments
    const sentiment = () => {
        const total = numCompliments + numComplaints + numComments;
        const totalPosCom = numCompliments + numComments;
        const totalNegCom = numComplaints + numComments;
    
        // Calculate the percentage difference
        const positiveExcessPercentage = (numCompliments - totalNegCom) / total;
        const negativeExcessPercentage = (numComplaints - totalPosCom) / total;
        console.log(positiveExcessPercentage);
        console.log(negativeExcessPercentage);
    
        if (numCompliments === numComplaints && numComplaints === numComments) {
            return "split";
        } else if (positiveExcessPercentage > 0) {
            if (positiveExcessPercentage > 0.66) {
                return "extremely positive!";
            } else if (positiveExcessPercentage > 0.33) {
                return "very positive!";
            } else if (positiveExcessPercentage > 0.15) {
                return "positive!";
            } else {
                return "slightly positive!";
            }
        } else if (negativeExcessPercentage > 0) {
            if (negativeExcessPercentage > 0.66) {
                return "extremely negative!";
            } else if (negativeExcessPercentage > 0.33) {
                return "very negative!";
            } else if (negativeExcessPercentage > 0.15) {
                return "negative!";
            } else {
                return "slightly negative!";
            }
        } else {
            return "neutral";
        }
    };

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
                    <Typography variant='body1' data-testid='sentimenttxt'>Feedback so far has been {sentiment()}</Typography>
                    
                    {item.map(feedback => (
                        <FeedbackItem key={feedback.id} feedback={feedback} />
                    ))}
                </ul>
            ) : (
                <Typography variant='body1' data-testid='notxt'>No one has left any feedback yet, be the first!</Typography>
            )}
        </Box>
    );
}

export default Feedback;
