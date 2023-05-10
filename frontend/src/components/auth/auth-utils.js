import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import messages from '../../utils/messages';

const provider = new GoogleAuthProvider();

const googleSignUp = async (auth) => {
  await signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;

      backendAuthCheck(user).catch(() => {
        backendCreateUser(user);
      });
    })
    .catch((error) => {
      console.log('error message:', error.message);
    });
};

const backendCreateUser = async (user) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: user.uid,
      email: user.email,
    }),
  };

  const url = `http://localhost:8080/api/v1/user`;
  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    throw new Error('Server Error');
  }
};

const signUp = async ({
  auth,
  email,
  password,
  passwordVerify,
  navigate,
  setMsg,
  setPassword,
  setPasswordVerify,
}) => {
  // Verify if both passwords are same
  if (password === passwordVerify) {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        backendCreateUser(userCredential.user).then(() => navigate('/main'));
      })
      .catch((err0r) => {
        setMsg(messages.userExists);
      });
  } else {
    setMsg(messages.verifyPassword);
    setPassword('');
    setPasswordVerify('');
    console.log('must be same password');
  }
};

// const googleSignIn = async (auth, navigate) => {
//   await signInWithPopup(auth, provider).then((result) => {
//     const user = result.user;

//     backendAuthCheck(user).then((data) => {
//       if (!data) {
//         console.log('n0-user-data');
//       }
//     });
//   });
// };

const backendAuthCheck = async (user) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
      'Content-Type': 'application/json',
    },
  };

  const url = `http://localhost:8080/api/v1/user`;
  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    throw new Error('Authentication Failed');
  }

  const data = await response.json();

  return data;
};

const logIn = async ({
  auth,
  email,
  password,
  navigate,
  setMsg,
  setEmail,
  setPassword,
}) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      backendAuthCheck(userCredential.user).then(() => {
        navigate('/main');
      });
    })
    .catch((err0r) => {
      setEmail('');
      setPassword('');

      if (err0r.code === messages.wrongPasswordError) {
        setMsg(messages.incorrectPassword);
      } else {
        setMsg(messages.userNotExist);
      }
    });
};

const authUtils = {
  googleSignUp,
  // googleSignIn,
  signUp,
  logIn,
};

export default authUtils;
