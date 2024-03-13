import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    updateProfile,
} from "firebase/auth";
import React from "react";

function useAuth(){

    const auth = getAuth();

}export default useAuth;