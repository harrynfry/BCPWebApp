import { Typography, Box } from "@mui/material";

function FeedbackItem({feedback}){ // displays rating and feedback of prop
    
    console.log("feedbackItem render");


    return(
        <Box className="feedBack-item card">
            
            <Typography variant="body3">{feedback.comment}</Typography>
        </Box>
    )
}
export default FeedbackItem;