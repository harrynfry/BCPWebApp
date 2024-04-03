

function FeedbackItem({feedback}){
    console.log("feedbackItem render");
    return(
        <div>
            <h5>id</h5>
            <p>{feedback.id}</p>
            <h5>rating</h5>
            <p>{feedback.rating}</p>
            <h5>comment</h5>
            <p>{feedback.comment}</p>
        </div>
    )
}
export default FeedbackItem;