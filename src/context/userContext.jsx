import { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";
import { server } from "../main";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast/headless";
import { data } from "react-router-dom";
import Swal from "sweetalert2";
// import { useEffect } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loginUser(email, password, navigate, fetchMyCourse) {
    setBtnLoading(true);
    try {
      console.log("before server");
      const { data } = await axios.post(
        "https://e-learn-backend-sbet.onrender.com/api/user/login",
        {
          email,
          password,
        }
      );
      Swal.fire("you are logged in successfully");
      // alert("you are logged in successfully")
      console.log("just after the server");
      toast.success(data.message);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/");
      fetchMyCourse();
    } catch (err) {
      setBtnLoading(false);
      console.log(err.response.data);
      setIsAuth(false);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.response?.data?.message || "Something went wrong",
      });

      // toast.error(error.response.data.message)
      // toast.error(error?.response?.data?.message || "Login failed");
    }
  }

  async function registerUser(name, email, password, navigate) {
    setBtnLoading(true);
    try {
      console.log("before server");
      const { data } = await axios.post(
        "https://e-learn-backend-sbet.onrender.com/api/user/register",
        {
          name,
          email,
          password,
        }
      );

      // adding alert
      // Swal.fire("you are registered  successfully");
      console.log("just after the server");
      toast.success(data.message);
      localStorage.setItem("activationToken", data.activationToken);

      setBtnLoading(false);
      navigate("/verify");

    }
  catch (err) {
    setBtnLoading(false);
    console.log(err.response.data);

    // Check if the error is due to user already existing
    if (err.response?.data?.message === "User Already exists") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "User already exists with this email. Please try another.",
      });
    } else {
      // Show a general error if the error is different
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.response?.data?.message || "Something went wrong.",
      });
    }
  }
}








  async function verifyOtp(otp, navigate) {
    setBtnLoading(true);
    const activationToken = localStorage.getItem("activationToken");
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/user/verify",
        {
          otp,
          activationToken,
        }
      );
      Swal.fire("otp verified and you are registered successfully");
      toast.success(data.message);
      navigate("/login");
      localStorage.clear();
      setBtnLoading(false);
    } catch (err) {
      console.log(err.response.data);
      setBtnLoading(false);
    }
  }

  async function fetchUser() {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/user/me`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setIsAuth(true);
      setUser(data.user);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setIsAuth,
        isAuth,
        loginUser,
        btnLoading,
        loading,
        registerUser,
        verifyOtp,
      }}
    >
      {children} <Toaster />
    </UserContext.Provider>
  );
};
export const UserData = () => useContext(UserContext);
