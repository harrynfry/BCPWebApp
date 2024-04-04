import React from 'react';
import FeedbackItem from './FeedbackItem';

function Feedback({ item, fbID }) {
    
    let total = 0;
    item.forEach(fb => {
        total += fb.rating;
    });

    let avg = total / item.length;

    console.log("feedback render ", fbID);
    console.log(item);
    console.log("avg = ", avg);

    return (
        <div className='feedback-container'>
            <h4>Average feedback for {fbID} = {avg}</h4>
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
