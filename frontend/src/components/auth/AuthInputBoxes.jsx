const AuthInputBoxes = (props) => {
  const { email, password, passwordVerify ,setEmail, setPassword, setPasswordVerify } = props;
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
      <input
        type='password'
        placeholder='Verify Your Password'
        value={passwordVerify}
        onChange={(e) => setPasswordVerify(e.target.value)}
      />
    </>
  );
};

export default AuthInputBoxes;
