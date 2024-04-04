import React, { useEffect, useState } from "react";
import useFirestore from "../firebase/useFirestore";
import Button from '@mui/material/Button';
import Feedback from "./Feedback";
import { Typography, Box, Link, autocompleteClasses } from "@mui/material";


function FeedItem({ item }) {
  console.log("feeditem render ", item.id);

  const {addFeedback, findFeedback} = useFirestore();

  const [rating, setRating] = useState(0); // State to track the selected rating
  const [comment, setComment] = useState(""); // State to track the feedback
  const [linkClicked, setLinkClicked] = useState(false); // State to track whether the link has been clicked
  const [showFeedback, setShowFeedback] = useState(false); // State to track whether button to show feedback has been clicked
  const [feedbackList, setFeedbackList] = useState([]); // State to hold feedback of article

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
  
  
  useEffect(() => {
      // Call the fetchFeedback function when the component mounts
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

  const handleCommentChange = (event) => {
    setComment(event.target.value); // Update the feedback state when a radio button is selected
  };

  const handleLinkClick = () => {
    setLinkClicked(true); // Update the state to indicate that the link has been clicked
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (rating === 0 || comment.trim() === "") {
      alert("Please provide both a rating and feedback before submitting.");
      return; // Exit the function early if validation fails
    }

    try {
      const id = item.id;
      // Call the addFeedback function to write data to Firestore
      await addFeedback({id: id, rating: rating, comment: comment});

      // Reset rating and feedback states after successful submission
      setRating(0);
      setComment("");
      alert("Thank you for your feedback.")
    } catch (error) {
      console.error("Error adding feedback:", error);
    }
  };

  const handleShowFeedback = () => {
    setShowFeedback(!showFeedback);
  }

  const sentiment = [
    { label: "Strongly against", value: 1 },
    { label: "Somewhat against", value: 2 },
    { label: "Neutral", value: 3 },
    { label: "Somewhat for", value: 4 },
    { label: "Strongly for", value: 5 }
  ];  

  return (
    // div containing a link, description, datetime info and ID. Will detect once the link has been clicked
    <Box 
      marginTop={1}
      marginLeft={1}
      marginRight={1}
      border={2}
      borderRadius={5}
      borderColor="#5419638e"
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
      <Typography variant="caption" gutterBottom>ID: {item.id}</Typography>
      <br/>

      {linkClicked && ( // Show the form only if the link has been clicked
        <div>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <Typography variant="subtitle1">
                <legend><u>How do you feel towards this?</u></legend>
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
                    />
                    {option.label}
                  </label>
                </Typography>
              ))}
              <Typography variant="body2"><legend>Leave your feedback:</legend></Typography>
              <textarea value={comment} onChange={handleCommentChange} style={{ width: "100%", height: "100%" }}/>
              <Button variant="contained" type="submit">Submit Rating and Feedback</Button>
            </fieldset>
          </form>
        </div>
      )}
      <Button variant="contained" onClick={handleShowFeedback}> {showFeedback ? "Hide Feedback" : "Show Feedback"} </Button>
            {showFeedback && <Feedback key={item.id} item={feedbackList} fbID={item.id} />} 
    </Box>
  );
}

export default FeedItem;
