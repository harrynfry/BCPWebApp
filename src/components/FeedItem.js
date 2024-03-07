import React, { useState } from "react";

function FeedItem({ item }) {
  const [rating, setRating] = useState(0); // State to track the selected rating
  const [feedback, setFeedback] = useState(""); // State to track the feedback
  const [linkClicked, setLinkClicked] = useState(false); // State to track whether the link has been clicked

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value)); // Update the rating state when a radio button is selected
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value); // Update the feedback state when a radio button is selected
  };

  const handleLinkClick = () => {
    setLinkClicked(true); // Update the state to indicate that the link has been clicked
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  }

  return (
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
              {[1, 2, 3, 4, 5].map((value) => (
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
              <textarea value={feedback} onChange={handleFeedbackChange} style={{ width: "100%", height: "100%" }}/>
              <button type="submit">Submit Rating and Feedback</button>
            </fieldset>
          </form>
        </div>
      )}
    </div>
  );
}

export default FeedItem;
