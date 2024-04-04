function FeedbackItem({feedback}){ // displays rating and feedback of prop
    
    console.log("feedbackItem render");
    return(
        <div className="feedBack-item card">
            <h5>rating</h5>
            <p>{feedback.rating}</p>
            <h5>comment</h5>
            <p>{feedback.comment}</p>
        </div>
    )
}
export default FeedbackItem;