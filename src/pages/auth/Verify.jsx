import React, { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/userContext";

const Verify = () => {
  const [otp, setOtp] = useState("");

  // we may need to come back to review here
  const { btnLoading, verifyOtp } = UserData();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    //  check here if there is any error for verify otp
    await verifyOtp(Number(otp), navigate);
  };
  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Verify Account</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor="otp">0tp</label>
          <input
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button disabled={btnLoading} type="submit" className="common-btn">
            {btnLoading ? "please wait ..." : "verify"}
          </button>
        </form>
        <p>
          Go to<Link to="/login">Login</Link> page
        </p>
      </div>
    </div>
  );
};

export default Verify;

















// we are not getting popped up when otp verified
