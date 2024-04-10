import { getFirestore, collection, addDoc, getDocs, query, where, getDoc, doc, orderBy } from "firebase/firestore";
// contains all firestore functions
function useFirestore(){

    const db = getFirestore(); // gets database from firestore

    // Uploads scraped articles into "articles" collection
    async function uploadArticles(data){

      const articleQuery = query(collection(db, "articles"), where("link", "==", data.link));
      const querySnapshot = await getDocs(articleQuery);
      
      // checks to make sure no duplicates are uploaded
      if (!querySnapshot.empty){
        console.log("Article already uploaded: ", data.link);
        return;
      }

      try{
        const docRef = await addDoc(collection(db, "articles"), {
          link: data.link,
          description: data.description,
          dateTime: data.dateTime
        });
        console.log("article uploaded: ", docRef.id);
      }catch(e){
        alert(e);
      }
    }

    // adds feedback and rating to article in sub collection
    async function addFeedback(formData){
      console.log(formData);
      // Extract data from formData
      let { id, rating, postcode, comment } = formData;
      // Trim empty space and capitalise
      postcode = postcode.trim().toUpperCase();

      if(!postcode.startsWith("BH")){
        alert("Sorry, you appear to live in an area that BCP do not operate in.");
        return;
      }else{
        
        try {
          
          // Get reference to the article document
          const articleDocRef = doc(db, "articles", id);
          const articleQuerySnapshot = await getDoc(articleDocRef);

          // Check if the article document exists
          if (articleQuerySnapshot.exists()) {
              // Document exists, add feedback to "feedback" subcollection
              const feedbackCollRef = collection(articleDocRef, "feedback");
              const feedbackDocRef = await addDoc(feedbackCollRef, {
                  rating: rating,
                  postcode: postcode,
                  comment: comment
              });
              console.log("Feedback added:", feedbackDocRef.id);
              alert("Thank you for your feedback!");
          } else {
              console.error("Article not found with ID:", id);
          }
        } catch (error) {
            console.error("Error adding feedback:", error);
        }
      }
    }


    // finds feedback from colletion attached to article
    async function findFeedback(data) {
      console.log("Searching for feedback for article with ID: ", data.id);
  
      try {
          // Get reference to the article document using its ID
          const articleDocRef = doc(db, "articles", data.id);
          const articleDocSnapshot = await getDoc(articleDocRef);
  
          if (!articleDocSnapshot.exists()) {
              console.error("No article found with ID: ", data.id);
              return [];
          }
  
          // Get reference to the feedback subcollection of the article document
          const feedbackCollRef = collection(articleDocRef, "feedback");
          const feedbackCollSnapshot = await getDocs(feedbackCollRef);
  
          if (feedbackCollSnapshot.empty) {
              console.log("Feedback for article is empty: ", data.id);
              return [];
          }
  
          const feedbackList = [];
  
          feedbackCollSnapshot.forEach(doc => {
              const feedbackData = doc.data();
              const feedbackObj = {
                  id: doc.id,
                  rating: feedbackData.rating,
                  postcode: feedbackData.postcode,
                  comment: feedbackData.comment
              };
              feedbackList.push(feedbackObj);
          });
  
          console.log(feedbackList);
          return feedbackList;
  
      } catch (error) {
          console.error("Error getting feedback: ", error);
          return [];
      }
    }  

    // async function testFindFeedback(){
    //   const feedbackList = [
    //     { id: 1, rating: 4, comment: "Great article, very informative!" },
    //     { id: 2, rating: 3, comment: "Good content, but could be more detailed." },
    //     { id: 3, rating: 5, comment: "Excellent writing, loved it!" },
    //     { id: 4, rating: 2, comment: "Not very helpful, needs improvement." },
    //     { id: 5, rating: 1, comment: "Terrible article, waste of time." }
    //   ];
    //   return feedbackList;
    // }

    // gets all articles from firestore
    
    async function getFeed() {
      console.log("getFeed");
      try {
        const articleQuery = query(collection(db, "articles"));
          const querySnapshot = await getDocs(articleQuery);
          const articles = [];
          if (querySnapshot.empty) {
              console.log("No articles found.");
              return []; // Return an empty array if no articles are found
          }

          querySnapshot.forEach((doc) => {
            const data = doc.data();
            articles.push({
              id: doc.id,
              link: data.link,
              description: data.description,
              dateTime: data.dateTime
            });
          });
          return articles;
      } catch (error) {
          console.error("Error getting articles:", error);
          return []; // Return an empty array if an error occurs
      }
    }
     
    return {uploadArticles, addFeedback, findFeedback, getFeed};

}
export default useFirestore;
