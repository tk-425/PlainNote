const AuthInputBoxes = ({ email, password, setEmail, setPassword }) => {
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
    </>
  );
};

export default AuthInputBoxes;
