import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main"
const CourseContext = createContext()

export const CourseContextProvider = ({ children }) => {
    const [courses, setCourses] = useState([])
    const [mycourse, setMyCourse] = useState([])
    const [course, setCourse] = useState([])

    async function fetchCourses() {
        try {
            const { data } = await axios.get(`${server}/api/course/all`)
            setCourses(data.courses);
        }
        // need to chec err and error if error occurs
        catch (err) {
            console.log(err)

        }
    }
    async function fetchCourse(id) {
        try {
            const { data } = await axios.get(`${server}/api/course/${id}`)
            setCourse(data.course);

        }
        // need to chec err and error if error occurs
        catch (err) {
            console.log(err)

        }
    }
    async function fetchMyCourse() {
        try {
            const { data } = await axios.get(`${server}/api/myCourse/`, {
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            setMyCourse(data.courses);
        } catch (err) {
            console.log(err)
        }

    }
    useEffect(() => {
        fetchCourses();
        fetchMyCourse();
    }, []);
    return (<CourseContext.Provider value={{
        courses,
        fetchCourses,
        fetchCourse,
        course,
        mycourse,
        fetchMyCourse,
    }}>{children}</CourseContext.Provider>
)}

export const CourseData = () => useContext(CourseContext)


