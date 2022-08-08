import { useState, useContext } from "react";
import axios from "axios";
import userContext from "./userContext";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");

  const user = useContext(userContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = {
      email,
      password,
    };
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/register",
        userInfo
      );
      if (data.token) {
        user.setEmail(data.user.email);
        setPassword("");
        setEmail("");
        localStorage.setItem("user", JSON.stringify(data));
        setRegisterError(false);
        setRedirect(true);
        setRegisterErrorMessage("");
      } else {
        setRegisterError(true);
        setRegisterErrorMessage(data.message);
      }
    } catch (error) {
      console.log(error);
      setRegisterError(true);
      setRegisterErrorMessage("Something went wrong");
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
      {registerError && (
        <div>
          <p>{registerErrorMessage}</p>
        </div>
      )}
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
