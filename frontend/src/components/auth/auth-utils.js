import messages from '../../utils/messages';

const signUp = async ({
  setSignUpError,
  password,
  passwordVerify,
  createUserWithEmailAndPassword,
  auth,
  email,
  navigate,
  setMsg,
  setNavigateTo,
  setPassword,
  setPasswordVerify,
  setReload,
}) => {
  const backendCreateUser = async (userCredential) => {
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userCredential.user.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userCredential.user.uid,
        email: userCredential.user.email,
      }),
    };

    const url = `http://localhost:8080/api/v1/user`;
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      setSignUpError(true);
      throw new Error('Server Error');
    }

    const data = await response.json();
    setSignUpError(false);

    return data;
  };

  // Verify if both passwords are same
  if (password === passwordVerify) {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        backendCreateUser(userCredential).catch((error) => {
          console.log(error);
        });

        setSignUpError(false);
        navigate('/main');
      })
      .catch((err0r) => {
        console.log('signUp() Error');
        console.log(err0r.message);

        setSignUpError(true);
        setMsg(messages.userExists);
        setNavigateTo('/login');
      });
  } else {
    setSignUpError(true);
    setMsg(messages.verifyPassword);
    setNavigateTo('/signup');
    setPassword('');
    setPasswordVerify('');
    setReload(true);
    console.log('must be same password');
  }
};

const logIn = async ({
  auth,
  email,
  password,
  signInWithEmailAndPassword,
  setLoginError,
  navigate,
  setMsg,
  setReload,
  setNavigateTo,
  setEmail,
  setPassword,
}) => {
  const backendAuthCheck = async (userCredential) => {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userCredential.user.accessToken}`,
        'Content-Type': 'application/json',
      },
    };

    const url = `http://localhost:8080/api/v1/user`;
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error('Authentication Failed');
    }
  };

  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      backendAuthCheck(userCredential);
      setLoginError(false);
      navigate('/main');
    })
    .catch((err0r) => {
      setLoginError(true);

      if (err0r.code === messages.wrongPasswordError) {
        setMsg(messages.incorrectPassword);
        setReload(true);
      } else {
        setMsg(messages.userNotExist);
        setNavigateTo('/signup');
        setReload(false);
      }

      setEmail('');
      setPassword('');
    });
};

const authUtils = {
  signUp,
  logIn,
};

export default authUtils;
