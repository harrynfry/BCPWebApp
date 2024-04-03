import React, { useState, useEffect, useCallback } from 'react';
import useFirestore from "../firebase/useFirestore";
import FeedbackItem from './FeedbackItem';

function Feedback({ item }) {
    const { findFeedback } = useFirestore();
    const [feedbackList, setFeedbackList] = useState([]);
    
    return (
        <div className='feedback-container'>
            <h2>Feedback for {item.id}</h2>
            {feedbackList.length > 0 ? (
                <ul>
                    {feedbackList.map(feedback => (
                        <FeedbackItem key={feedback.id} feedback={feedback} />
                    ))}
                </ul>
            ) : (
                <p>No feedback available for {item.id}</p>
            )}
        </div>
    );
}

export default Feedback;
