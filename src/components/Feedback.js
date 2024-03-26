import React, { useState, useEffect } from 'react';
import useFirestore from "../firebase/useFirestore";

function Feedback({ item }) {
    const { findFeedback } = useFirestore();
    
    const [feedbackList, setFeedbackList] = useState([]);

    return (
        <div>
            <h2>Feedback for {item.id}</h2>
         
        </div>
    );
}

export default Feedback;
