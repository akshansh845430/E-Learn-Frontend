import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/userContext";
import { CourseData } from "../../context/CourseContext";

const Login = () => {
  const navigate = useNavigate();
  const { btnLoading, loginUser } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { fetchMyCourse } = CourseData();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    await loginUser(email, password, navigate, fetchMyCourse);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          width: "320px",
        }}
      >
        <h2 style={{ color: "purple", marginBottom: "20px" }}>Login</h2>

        <form onSubmit={submitHandler} style={{ textAlign: "left" }}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            style={{
              width: "95%",
              padding: "10px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            style={{
              width: "95%",
              padding: "10px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            disabled={btnLoading}
            type="submit"
            className="common-btn"
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: "purple",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {btnLoading ? "Please wait..." : "Login"}
          </button>
        </form>

        <p style={{ marginTop: "15px" }}>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
