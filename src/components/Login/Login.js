import firebaseConfig from './Firebase.config';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from 'react';
import { useContext } from 'react';
import { userContext } from '../../App';

const app = initializeApp(firebaseConfig);

function Login() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth()
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignIn: false,
    name: '',
    email: '',
    photo: ''
  })

  const handleSignIn = () => {
    //console.log('clicked')
    signInWithPopup(auth, provider)
      .then(result => {
        //console.log(result.user);
        const { displayName, email, photoURL } = result.user;
        const signInUser = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signInUser);
      })
      .catch(err => {
        console.log(err);
      })
  }
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        const signOutUser = {
          isSignIn: false,
          name: '',
          password: '',
          email: '',
          photo: '',
          error: '',
          success: false
        }
        setUser(signOutUser);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const [loggedInUser,setLoggedInUser] = useContext(userContext)


  const handleBlur = (event) => {
    let isFieldValid = true;
    if (event.target.name === 'email') {
      isFieldValid = /^\S+@\S+\.\S+$/.test(event.target.value);
    }
    if (event.target.name === 'password') {
      const passwordHasNumber = event.target.value.length > 8;
      isFieldValid = passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (event) => {
    const auth = getAuth();
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          const user = userCredential.user;
          // ...
        })
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name)
          //console.log(res)
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo)
        });
    }
    if (!newUser && user.email && user.password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          const user = userCredential.user;
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          console.log('sign in user info',user);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo)
        });
    }


    event.preventDefault();
  }
  const updateUserName = name => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: name
    })
    .then(() => {
      console.log('user name updated successfully')
    })
    .catch((error) => {
      console.log(error)
    });
  }

  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignIn ? <button onClick={handleSignOut}>Sign out</button> :
          <button onClick={handleSignIn}>Sign in</button>
      }
      {
        user.isSignIn && <div>
          <h2>Name: {user.name}</h2>
          <h4>Email: {user.email}</h4>
          <img src={user.photo} alt="" />
        </div>
      }
      <h1>My own authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User Sign up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" name='name' onBlur={handleBlur} placeholder='Your Name' required />}
        <br />
        <input type="text" required name="email" onBlur={handleBlur} placeholder='Write Your Email' />
        <br />
        <input type="password" required name="password" onBlur={handleBlur} placeholder='Write Your Password' />
        <br />
        <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
      </form>
      <h2 style={{ color: 'red' }}>{user.error}</h2>
      {
        user.success && <h2 style={{ color: 'green' }}>Account {newUser ? 'created' : 'logged in'} successfully</h2>
      }
    </div>
  );
}

export default Login;
