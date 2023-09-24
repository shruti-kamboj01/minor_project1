import React from 'react'
import { auth, provider } from '../../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Auth = () => {

  const navigate = useNavigate();

   const signInWithGoogle = async() => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    const authInfo = {
      userID: result.user.uid,
      name: result.user.displayName,
      profilePhoto: result.user.photoURL,
      isAuth: true,
    }
    localStorage.setItem("auth", JSON.stringify(authInfo));
     navigate("/expense-tracker");
   };


  return (
    <div className=''>
       <p>Sign In With Google to Continue</p>
       <button onClick={signInWithGoogle}>
       {" "}
        Sign In With Google
       </button>
    </div>
  )
}

export default Auth