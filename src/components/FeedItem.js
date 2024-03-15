import React, { useState } from "react";
import useFirestore from "../firebase/useFirestore";
import Button from '@mui/material/Button';


function FeedItem({ item }) {

  const {addFeedback} = useFirestore();

  const [rating, setRating] = useState(0); // State to track the selected rating
  const [comment, setComment] = useState(""); // State to track the feedback
  const [linkClicked, setLinkClicked] = useState(false); // State to track whether the link has been clicked

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value)); // Update the rating state when a radio button is selected
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value); // Update the feedback state when a radio button is selected
  };

  const handleLinkClick = () => {
    setLinkClicked(true); // Update the state to indicate that the link has been clicked
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const id = item.id;
      // Call the addFeedback function to write data to Firestore
      await addFeedback({articleID: id, rating: rating, comment: comment});

      // Reset rating and feedback states after successful submission
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error adding feedback:", error);
    }
  };

  const sentiment = ["Strongly against", "Somewhat against", "Neutral", "Somewhat for", "Strongly for"]
  
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
              <legend>Rate this content (1 being negative, 5 being positive):</legend>
              {sentiment.map((value) => (
                <label key={value}>
                  <input
                    type="radio"
                    name="rating"
                    value={value}
                    checked={rating === value}
                    onChange={handleRatingChange}
                  />
                  {value}
                </label>
              ))}
              <legend>Leave your feedback:</legend>
              <textarea value={comment} onChange={handleCommentChange} style={{ width: "100%", height: "100%" }}/>
              <Button variant="contained" type="submit">Submit Rating and Feedback</Button>
            </fieldset>
          </form>
        </div>
      )}

    </div>
  );
}

export default FeedItem;
