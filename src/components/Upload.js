import React from "react";
import useFirestore from "../firebase/useFirestore";
import Button from '@mui/material/Button';

function Upload({ data }) {
  
  const { uploadArticles } = useFirestore(); // import function

  // click handler, for each object in data call upload function
  async function clickHandler() {
    console.log("upload btn clicked");
    try {
      for (const obj of data) {
        await uploadArticles(obj);
      }
      console.log("All articles uploaded successfully");
    } catch (error) {
      console.error("Error uploading articles:", error);
      // Handle error (e.g., show error message to the user)
    }
  }

  return (
    // button with click handler
    <div>
      <Button variant="contained" onClick={clickHandler}>Upload</Button>
    </div>
  );
}

export default Upload;
