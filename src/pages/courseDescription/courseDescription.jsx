import React, { useEffect } from 'react'
import './coursedescription.css';
import { useNavigate, useParams } from 'react-router-dom'
import {CourseData} from "../../context/CourseContext"
import {server} from "../../main"
const courseDescription=({user})=>{
    const params=useParams();
    const navigate=useNavigate()   
    const {fetchCourses}=CourseData()
    useEffect(()=>{
        fetchCourses(params.id)
    },[]);
    return(
        <>
        {course && <div className='course-description'>
            <div className="course-header">
            <img src={`${course.image}`}
            alt=""
            className='course-image'
            />
            <div className='course-info'>
            <h2>{course.title}</h2>
            <p>Instructor:{course.createBy}</p>
            <p>Duration:{course.duration} weeks</p>
           
            </div>
            </div>
            <p>{course.description}</p>
            <p>Lets get started with Course at ₹{course.price}</p>
            {user && user.subscription.includes(course._id) ? (
                <button
                onClick={()=>navigate(`/course/study/${course._id}`)}
                className='course-button'
                >
                    study
                    </button>
            ):(
            <button className='common-btn'>Buy Now</button>
            )}
            <button className='common-btn'>Buy Now</button>

            </div>} 
    
        </>
    )
}
export default courseDescription;