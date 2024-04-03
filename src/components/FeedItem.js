import React, { useState } from "react";
import useFirestore from "../firebase/useFirestore";
import Button from '@mui/material/Button';
import Feedback from "./Feedback";


function FeedItem({ item }) {
  console.log("feeditem render");

  const {addFeedback} = useFirestore();

  const [rating, setRating] = useState(0); // State to track the selected rating
  const [comment, setComment] = useState(""); // State to track the feedback
  const [linkClicked, setLinkClicked] = useState(false); // State to track whether the link has been clicked

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

  const sentiment = [
    { label: "Strongly against", value: 1 },
    { label: "Somewhat against", value: 2 },
    { label: "Neutral", value: 3 },
    { label: "Somewhat for", value: 4 },
    { label: "Strongly for", value: 5 }
  ];  

  return (
    // div containing a link, description, datetime info and ID. Will detect once the link has been clicked
    <div className="feed-item card">

      <a href={item.link} target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
        <h2>{item.link}</h2>
      </a>
      <p><b>Overview:</b><br/>{item.description}</p>
      <p>{item.dateTime}</p>
      <p><b>ID: </b>{item.id}</p>
      {linkClicked && ( // Show the form only if the link has been clicked
        <div>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <legend>How do you feel towards this?</legend>
              {sentiment.map(option => (
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
              ))}
              <legend>Leave your feedback:</legend>
              <textarea value={comment} onChange={handleCommentChange} style={{ width: "100%", height: "100%" }}/>
              <Button variant="contained" type="submit">Submit Rating and Feedback</Button>
            </fieldset>
          </form>
        </div>
      )}
      <Feedback item = {item}/>
    </div>
  );
}

export default FeedItem;
