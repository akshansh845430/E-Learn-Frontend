





import React, { useEffect } from "react";
import "./dashboard.css";
import { CourseData } from "../../context/CourseContext";
import { useNavigate } from "react-router-dom";
// import CourseCard from "../course/CourseCard"; // assuming this is the correct import
import CourseCard from "../../components/coursecard/CourseCard";

const Dashboard = () => {
  const { mycourse } = CourseData();
  const navigate = useNavigate();

  useEffect(() => {
    if (mycourse && mycourse.length === 0) {
      const timer = setTimeout(() => {
        navigate("/courses"); // Redirect to course page after 2 seconds
      }, 2000);
      return () => clearTimeout(timer); // cleanup
    }
  }, [mycourse, navigate]);

  return (
    <div className="student-dashboard">
      <h2>All Enrolled Courses</h2>
      <div className="dashboard-content">
        {mycourse && mycourse.length > 0 ? (
          mycourse.map((e) => <CourseCard key={e._id} course={e} />)
        ) : (
          <p>No course enrolled yet! Redirecting...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
