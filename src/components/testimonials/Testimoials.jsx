import React from "react";
import "./testimonials.css";
import Aryaimg from "../../assets/Arya.jpg";
import Hariomimg from "../../assets/Hariom.jpg";
import Rajivimg from "../../assets/Rajiv.jpg";
import Rohitimg from "../../assets/Rohit.jpg";
import Rishabhimg from "../../assets/Rishabh.jpg";
import Akshanshimg from "../../assets/Akshnah.jpeg";


const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "Arya Kumari",
      position: "Student",
      message:
        "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image:
        Aryaimg
    },
    {
      id: 2,
      name: "Hariom chaurasiya",
      position: "Student",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        Hariomimg,
    },
    {
      id: 3,
      name: " Rajeev Kumar",
      position: "Student",
      message:
        "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image:
      Rajivimg
    },
    {
      id: 4,
      name: "Rohit Raj",
      position: "Student",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        Rohitimg,
    },
    {
      id: 5,
      name: "Rishabh Yadav",
      position: "Student",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        Rishabhimg,
    },
    {
      id: 6,
      name: " Akshansh Kumar Tiwari",
      position: "Student",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image:
        Akshanshimg,
    },




  ];
  return (
    <section className="testimonials">
      <h2>What our students say</h2>
      <div className="testimonials-cards">
        {testimonialsData.map((e) => (
          <div className="testimonial-card" key={e.id}>
            <div className="student-image">
              <img src={e.image} alt="" />
            </div>
            <p className="message">{e.message}</p>
            <div className="info">
              <p className="name">{e.name}</p>
              <p className="position">{e.position}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
