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

        const total = numCompliments + numComplaints + numComments;
        const complimentPercentage = numCompliments / total;
        const complaintPercentage = numComplaints / total;



        if (numCompliments === numComplaints && numComplaints === numComments) {
            return ("Split");
        } else if (numCompliments > numComplaints && numCompliments > numComments) {
            if(complimentPercentage > 0.75){
                return ("Extremely positive!");
            }else if(complimentPercentage > 0.5){
                return("Very positive!");
            }else if(complimentPercentage > 0.25){
                return("Positive!");
            }else{
                return("Slightly positive!");
            }
        } else if (numComplaints > numCompliments && numComplaints > numComments) {
            if(complaintPercentage > 0.75){
                return ("Extremely negative!");
            }else if(complaintPercentage > 0.5){
                return("Very negative!");
            }else if(complaintPercentage > 0.25){
                return("Negative!");
            }else{
                return("Slightly negative!");
            }
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
                    <Typography variant='body1'>Feedback so far has been {sentiment()}</Typography>
                    
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
