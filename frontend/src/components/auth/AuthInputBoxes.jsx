const AuthInputBoxes = (props) => {
  const {
    email,
    password,
    passwordVerify,
    setEmail,
    setPassword,
    setPasswordVerify,
    secondInputBox,
  } = props;
  return (
    <>
      <input
        type='email'
        placeholder='Enter Your Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Enter Your Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {secondInputBox && (
        <input
          type='password'
          placeholder='Confirm Your Password'
          value={passwordVerify}
          onChange={(e) => setPasswordVerify(e.target.value)}
        />
      )}
    </>
  );
};

export default AuthInputBoxes;
