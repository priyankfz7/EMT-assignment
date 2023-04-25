import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    let res = await fetch("http://localhost:8080/users/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setLoad(false);
    res = await res.json();
    console.log(res);
    if (!res.token) {
      toast.error(`${res.msg}`);
    } else {
      localStorage.setItem("token", res.token);
      localStorage.setItem("userdata", JSON.stringify(res.data));
      toast.success("Logged in successfully");
      navigate("/");
    }
  };
  return (
    <div className="log-sign-wrapper">
      <div className="formWrapper">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>Your email</label>
          <br />
          <input
            value={email}
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <label>Your Password</label>
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <br />
          <button type="submit" className="primary-btn">
            {load ? "loading..." : "Login"}
          </button>
          <br />
          <br />
          <Link to="/signup">
            <span className="nav-link">create a new account</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
