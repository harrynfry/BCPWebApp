

function FeedbackItem({feedback}){
    return(
        <div>
            <h3>id</h3>
            <p>{feedback.id}</p>
            <h3>rating</h3>
            <p>{feedback.rating}</p>
            <h3>comment</h3>
            <p>{feedback.comment}</p>

        </div>
    )
}
export default FeedbackItem;