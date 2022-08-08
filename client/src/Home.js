import axios from "axios";
import { useContext, useState, useEffect } from "react";
import userContext from "./userContext";

const Home = () => {
  const user = useContext(userContext);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await axios.get("http://localhost:4000/api/users", {
          headers: { token: user.token },
        });
        console.log("response", response);
        setUsers(response.data.users);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  if (user.email === "") {
    return (
      <div>
        <h2>You need to be logged in to see this page</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {users.map((user) => (
          <li>{user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
