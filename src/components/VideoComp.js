import React from "react";
import { Box, Typography} from '@mui/material';


// returns BCP youtube video
function VideoComp(){
    

    return(
        <Box sx={{ textAlign: 'center', justifyContent: 'center',
        flexWrap: 'wrap',
        maxWidth: '100%',
        margin: 'auto', 
        padding: '10px'}}>
            <Typography variant="h4">
                Check out BCP's latest video:
            </Typography>
            <iframe
                width="90%"
                height="400vh"
                src="https://www.youtube.com/embed/BRx52Jf713s"
                title="Latest Video From BCP"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
            </iframe>
        </Box>
    )
}
export default VideoComp;