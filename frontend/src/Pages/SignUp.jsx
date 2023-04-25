import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setName] = useState("");
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoad(true);
    e.preventDefault();
    const user = { email, password, username };
    let res = await fetch("http://localhost:8080/users/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setLoad(false);
    if (res.status >= 300) {
      res = await res.json();
      toast.error(`${res.msg}`);
    } else {
      toast.success("Signed up successfully");
      navigate("/login");
    }
  };
  return (
    <div className="log-sign-wrapper">
      <div className="formWrapper">
        <h1>SignUp</h1>
        <form onSubmit={handleSubmit}>
          <label>Your name</label>
          <br />
          <input
            value={username}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <br />
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
            {load ? "loading ..." : "Sign Up"}
          </button>
          <br />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
