import { getFirestore, collection, addDoc, getDocs, query, where, setDoc } from "firebase/firestore";
// contains all firestore functions
function useFirestore(){

    const db = getFirestore(); // gets database from firestore

    // Uploads scraped articles into "articles" collection
    async function uploadArticles(data){

      const articleQuery = query(collection(db, "articles"), where("id", "==", data.id));
      const querySnapshot = await getDocs(articleQuery);
      // checks to make sure no duplicates are uploaded
      if (!querySnapshot.empty){
        console.log("Article already uploaded: ", data.id);
        return;
      }

      try{
        const docRef = await addDoc(collection(db, "articles"), {
          id: data.id,
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
      
      try{
        const articleQuery = query(collection(db, "articles"), where ("id", "==", formData.articleID));
        const articleQuerySnapshot = await getDocs(articleQuery);

        if (articleQuerySnapshot.empty) {
          console.error("Article not found with ID: ", formData.articleID);
          return;
        }
        // get 1st doc in query
        const articleDocRef = articleQuerySnapshot.docs[0].ref;
        console.log("Found the article");

        // Check if "feedback" collection exists
        const feedbackCollRef = collection(articleDocRef, "feedback");
        const feedbackCollSnapshot = await getDocs(feedbackCollRef);
        
        if (feedbackCollSnapshot.empty){
          // create if does not exist
          await setDoc(articleDocRef, { feedback: {} }, { merge: true });
          console.log("Feedback subcollection created for article: ", formData.id);
        }

        // Add the rating and comment to the "feedback" collection
        const docRef = await addDoc(feedbackCollRef, {
          rating: formData.rating,
          comment : formData.comment
        });
        console.log("Feedback added: ", docRef.id);
        } 
        catch (error) {
        console.error("Error adding feedback: ", error);
      }
    }

    return {uploadArticles, addFeedback};
}
export default useFirestore;
