import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import messages from './messages';

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

  const url = `${process.env.REACT_APP_BACKEND_URL}/api/v1/user`;
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
  if (!password === '' || !passwordVerify === '') {
    setMsg(messages.enterPassword);
    return;
  }

  if (password === '' || passwordVerify === '') {
    setMsg(messages.enterPassword);
    return;
  }

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

const backendAuthCheck = async (user) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
      'Content-Type': 'application/json',
    },
  };

  const url = `${process.env.REACT_APP_BACKEND_URL}/api/v1/user`;
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
  if (password === '') {
    setMsg(messages.enterPassword);
    return;
  }

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
  signUp,
  logIn,
};

export default authUtils;
