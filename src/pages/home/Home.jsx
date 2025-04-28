import React from "react";
import { useNavigate } from "react-router-dom";
import './home.css'
import Testimonials from "../../components/testimonials/Testimoials";

const Home = () => {
  const navigate =useNavigate()
  return (
<div>
  <div className="home">
    <div className="home-content">

      <h1>Welcome to our E-learning platform</h1>
      <p style={{textAlign:"centre"}}>Learn ,Grow,Excel </p>
      <p style={{color:"#9fd3c7"}}>Join our community of learners and start your journey towards success today!</p>
      <button onClick={()=>navigate('/courses')} className="common-btn"> Get Started</button>
    </div>
  </div>
  <Testimonials/>
</div>


  )
};

export default Home;
