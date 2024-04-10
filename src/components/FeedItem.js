import React, { useEffect, useState } from "react";
import useFirestore from "../firebase/useFirestore";
import Button from '@mui/material/Button';
import Feedback from "./Feedback";
import { Typography, Box, Link } from "@mui/material";


function FeedItem({ item }) {
  
  // const tfb = [
  //     {
  //         "id": "1P4GaVwqefQyE0md1pzV",
  //         "rating": "1",
  //         "comment": "test1"
  
  //     },
  //     {
  //         "id": "4Ll0iTONFrRMoKHWIjp1",
  //         "rating": "2",
  //         "comment": "test2"
  
  //     },
  //     {
  //         "id": "3",
  //         "rating": "3",
  //         "comment": "test3"
  
  //     },
  //     {
  //         "id": "4",
  //         "rating": "4",
  //         "comment": "test4"
  
  //     },
  //     {
  //         "id": "5",
  //         "rating": "5",
  //         "comment": "test5"
  
  //     }
  // ];
  
  console.log("feeditem render ", item.id);

  const {addFeedback, findFeedback} = useFirestore();

  const [rating, setRating] = useState(0); // State to track the selected rating
  const [postcode, setPostCode] = useState(""); // State to track the postcode
  const [comment, setComment] = useState(""); // State to track the feedback
  const [linkClicked, setLinkClicked] = useState(false); // State to track whether the link has been clicked
  const [showFeedback, setShowFeedback] = useState(false); // State to track whether button to show feedback has been clicked
  const [feedbackList, setFeedbackList] = useState([]); // State to hold feedback of article
  
  // get feedback for feeditem on render
  useEffect(() => {
    const fetchFeedback = async () => {
    try{
      const feedbackData = await findFeedback(item); // call findFeedback function from useFirestore to get feedback attached to item
      setFeedbackList(feedbackData); // Set feedback returned in state
    }catch (error){
      console.log("Error finding feedback: ", error);
    }
  };
  fetchFeedback();
  }, []); // Empty dependency array ensures the effect runs only once

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value)); // Convert the value to an integer
  };

  const handlePostCodeChange = (event) => {
    setPostCode(event.target.value); // Update the postcode state 
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value); // Update the comment state
  };

  const handleLinkClick = () => {
    setLinkClicked(true); // Update the state to indicate that the link has been clicked
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (rating === 0 || postcode.trim() === "" || comment.trim() === "") {
      alert("Please provide your postcode and feedback before submitting.");
      return; // Exit the function early if validation fails
    }

    try {
      const id = item.id;
      // Call the addFeedback function to write data to Firestore
      await addFeedback({id: id, rating: rating, postcode: postcode, comment: comment});

      // Reset rating and feedback states after successful submission
      setRating(0);
      setPostCode("");
      setComment("");
      
      // Trigger a page reload
      window.location.reload();
    
    } catch (error) {
      console.error("Error adding feedback:", error);
    }
  };

  const handleShowFeedback = () => {
    setShowFeedback(!showFeedback);
  }

  const feedbackText = () => {
    let txt = "Feedback:";
    switch (rating) {
        case 1:
            txt = "We love compliments, let us know what you liked and how we can continue to improve below:";
            break;
        case 2:
            txt = "Your comments and suggestions are important to us, please provide them below:";
            break;
        case 3:
            txt = "Let us know what the problem is, and please suggest how we may improve below:";
            break;
        default:
            break;
    }
    return txt;
  };

  const sentiment = [
    { label: "Compliment", value: 1 },
    { label: "Comment", value: 2 },
    { label: "Complaint", value: 3 }
  ];  

  return (
    // div containing a link, description, datetime info and ID. Will detect once the link has been clicked
    <Box 
      marginTop={1}
      marginLeft={1}
      marginRight={1}
      border={2}
      borderRadius={3}
      borderColor="#4a1657"
      padding={2}
      marginBottom={2}
      bgcolor="aliceblue"
    >

      <Link href = {item.link} target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
        <Typography variant="h6">{item.link}</Typography>
      </Link>
      <Typography variant="subtitle1"><b>Overview:</b></Typography>
      <Typography variant="body1" gutterBottom>{item.description}</Typography>
      <Typography variant="body2" gutterBottom>{item.dateTime}</Typography>
      <br/>
      <Typography variant="body1"><b>Read the article using the link to leave your feedback!</b></Typography>
      <br/>
      {linkClicked && ( // Show the form only if the link has been clicked
        <div>
          <form onSubmit={handleSubmit}>

            <Box marginTop={1}
              marginLeft={1}
              marginRight={1}
              border={1}
              borderRadius={3}
              borderColor="#4a1657"
              padding={1}
              marginBottom={2}
              bgcolor="white">

              <Typography variant="subtitle2">
                <legend>I'd like to leave a:</legend>
              </Typography>

              {sentiment.map(option => (
                <Typography variant="caption">
                  <label key={option.value}>
                    <input
                      type="radio"
                      name="rating"
                      value={option.value}
                      checked={rating === option.value}
                      onChange={handleRatingChange}
                      required
                    />
                    {option.label}
                  </label>
                </Typography>
              ))}

              
              <Typography variant="subtitle2"><legend>Your postcode:</legend></Typography>
              <input type='text' value={postcode} onChange={handlePostCodeChange} style={{ width: "10%", height: "100%" }} required/>
              
              <Typography variant="subtitle2"><legend>{feedbackText()}</legend></Typography>
              <textarea value={comment} onChange={handleCommentChange} style={{ width: "100%", height: "100%" }} required/>
              
              <Button variant="contained" type="submit">Submit Feedback</Button>
           
            </Box>
          </form>
        </div>
      )}
      <Button variant="contained" onClick={handleShowFeedback}> {showFeedback ? "Hide Community Feedback" : "Show Community Feedback"} </Button>
            {showFeedback && <Feedback key={item.id} item={feedbackList} fbID={item.id} />} 
    </Box>
  );
}

export default FeedItem;
