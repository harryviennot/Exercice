import { useState, useContext } from "react";
import axios from "axios";
import userContext from "./userContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const user = useContext(userContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginerror] = useState(false);
  const [loginErrorMessage, setLoginerrorMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = {
      email,
      password,
    };
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/login",
        userInfo
      );
      if (data.token) {
        user.setEmail(data.user.email);
        localStorage.setItem("user", JSON.stringify(data));
        setPassword("");
        setLoginerror(false);
        setLoginerrorMessage("");
        setRedirect(true);
      } else {
        setLoginerror(true);
        setLoginerrorMessage(data.message);
      }
    } catch (error) {
      setLoginerror(true);
      setLoginerrorMessage(toString(error));
    }
  };

  if (redirect) {
    return navigate("/home");
  }

  return (
    <form action="" onSubmit={(e) => handleSubmit(e)}>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button type="submit">Login</button>
      <br />
      {loginError && (
        <div>
          <p>{loginErrorMessage}</p>
        </div>
      )}
      <text>Don't have an accout? You can register </text>
      <Link to="/register">here.</Link>
    </form>
  );
};

export default Login;
