import React from 'react';
import FeedbackItem from './FeedbackItem';

function Feedback({ item }) {
    console.log("feedback render ", item.id);
    console.log(item);

    return (
        <div className='feedback-container'>
            <h4>Feedback for {item.id}</h4>
            {item.length > 0 ? (
                <ul>
                    {item.map(feedback => (
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
