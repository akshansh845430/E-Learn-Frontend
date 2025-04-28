import React from "react";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import "./account.css";
import { MdOutlineLogout } from "react-icons/md";
import { UserData } from "../../context/userContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Account = ({ user }) => {
  const {setIsAuth,setUser}=UserData()

  const navigate=useNavigate()
  const logoutHandler=()=>{
    localStorage.clear()
    setUser([])
    setIsAuth(false)
    toast.success("Logged out")
    navigate("/login")
  }
  return (
    <div>
      {user && (
        <div className="profile">
          <h2>My Profile</h2>
          <div className="profile-info">
            <p>
              <strong>NAME-{user.name}</strong>
            </p>

            <p>
              <strong>email-{user.email}</strong>
            </p>

            <button onClick={()=>navigate(`/${user._id}/dashboard`)} className="common-btn">
              {" "}
              <MdOutlineDashboardCustomize />
              Dashboard
            </button>
            <br />

            <button onClick={logoutHandler} className="common-btn" style={{ background: "red" }}>
              {" "}
              <MdOutlineLogout />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
