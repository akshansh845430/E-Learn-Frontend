


import React, { useEffect, useState } from "react";
import "./lecture.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState({});
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  async function fetchLectures() {
    console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDD")
    setLecLoading(true);
    try {
      const { data } = await axios.get(
        `https://e-learn-backend-sbet.onrender.com/api/lectures/${params.id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log("data", data.lectures)
      setLectures(data.lectures);
      if (data.lectures.length > 0) {
        setLecture(data.lectures[0]);
      } else {
        setLecture({});
      }
      setLecLoading(false);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLecLoading(false);
      setLoading(false);
    }
  }

  async function fetchLecture(id) {
    console.log("FUCJed ")
    setLecLoading(true);
    try {
      const { data } = await axios.get(
        `https://e-learn-backend-sbet.onrender.com/api/lecture/${id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setLecture(data.lecture); 
      setLecLoading(false);
    } catch (err) {
      console.log(err);
      setLecLoading(false);
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const myForm = {
      title,
      description,
      video,
    };

    try {
      const { data } = await axios.post(
        `https://e-learn-backend-sbet.onrender.com/api/course/${params.id}`,
        myForm,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      toast.success(data.message);
      setTitle("");
      setDescription("");
      setVideo("");
      setShow(false);
      await fetchLectures();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setBtnLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    if (confirm("Are you sure you want to delete this lecture?")) {
      try {
        const { data } = await axios.delete(
          `https://e-learn-backend-sbet.onrender.com/api/lecture/${id}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        toast.success(data.message);
        await fetchLectures();
      } catch (err) {
        toast.error(err.response?.data?.message || "Deletion failed");
      }
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="lecture-page">
          <div className="left">
            {lecLoading ? (
              <Loading />
            ) : lecture?.video ? (
              <>
                <video
                  key={lecture.video}
                  src={lecture.video}
                  width={"100%"}
                  controls
                  controlsList="nodownload noremoteplayback"
                  disablePictureInPicture
                  disableRemotePlayback
                  autoPlay
                ></video>
                <h1>{lecture.title}</h1>
                <h3>{lecture.description}</h3>
              </>
            ) : (
              <h1>Please select a lecture</h1>
            )}
          </div>

          <div className="right">
            {user && user.role === "admin" && (
              <button className="common-btn" onClick={() => setShow(!show)}>
                {show ? "Close" : "Add Lecture"}
              </button>
            )}

            {show && (
              <div className="lecture-form">
                <h2>Add Lecture</h2>
                <form onSubmit={submitHandler}>
                  <label>Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />

                  <label>Description</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />

                  <input
                    type="text"
                    required
                    placeholder="Enter video URL"
                    value={video}
                    onChange={(e) => setVideo(e.target.value)}
                  />

                  <button disabled={btnLoading} type="submit" className="common-btn">
                    {btnLoading ? "Adding..." : "Add Lecture"}
                  </button>
                </form>
              </div>
            )}

            {lectures && lectures.length > 0 ? (
              lectures.map((e, i) => (
                <div key={e._id}>
                  <div
                    onClick={() => fetchLecture(e._id)}
                    className={`lecture-number ${
                      lecture._id === e._id ? "active" : ""
                    }`}
                  >
                    {i + 1} - {e.title}
                  </div>
                  {user && user.role === "admin" && (
                    <button
                      className="common-btn"
                      style={{ background: "red" }}
                      onClick={() => deleteHandler(e._id)}
                    >
                      Delete {e.title}
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p>No lectures yet</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Lecture;
