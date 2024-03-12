import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./home.css";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    department: "hr",
    courses: "",
    image: null,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;
    console.log("form validating");
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    // Add validations for other fields...

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit the form data
      const submissionData = new FormData();
      console.log(submissionData);
      submissionData.append("name", formData.name);
      submissionData.append("email", formData.email);
      submissionData.append("mobileNumber", formData.mobile);
      submissionData.append("designation", formData.designation);
      submissionData.append("gender", formData.gender);
      submissionData.append("department", formData.department);
      submissionData.append("course", formData.courses);
      // formData.courses.forEach(course => {
      //   submissionData.append('courses', course);
      // });
      if (formData.image) {
        submissionData.append("image", formData.image);
      }
      console.log(submissionData);

      try {
        fetch("http://localhost:8000/addEmployee", {
          method: "POST",
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
          body: submissionData,
        })
          .then((response) => {
            if (!response.ok) {
              console.log(response.message);
              toast.error(response.message);
            }
            return response.json();
          })
          .then((data) => {
            // Handle the data received from the server
            console.log(data);
            toast.success(data.message);
          })
          .catch((error) => {
            console.log(
              "There was a problem with your fetch operation:",
              error
            );
            toast.error(error.data.message)
          });
        setFormData({
          name: "",
          email: "",
          mobile: "",
          designation: "",
          gender: "",
          department: "hr",
          courses: "",
          image: null,
        });
      } catch (error) {
        console.log("Form submission failed:", error.message);
      }
      console.log("Form submitted:", formData);
    } else {
      console.error("Form submission failed. Validation errors exist.");
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Welcome to Admin Panel</h1>
      <h2>Create Employee</h2>
      <form className="create-employee" onSubmit={handleSubmit}>
        <div className="fields">
          <div>
            <label htmlFor="name">Name</label>
          </div>

          <input
            className="text-field"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="fields">
          <div className="col-25">
            <label htmlFor="email">Email </label>
          </div>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="fields">
          <div>
            {" "}
            <label htmlFor="mobile">Mobile Number</label>
          </div>

          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={(e) =>
              setFormData({ ...formData, mobile: e.target.value })
            }
          />
          {errors.mobile && <span className="error">{errors.mobile}</span>}
        </div>
        <div className="fields">
          {" "}
          <label htmlFor="gender">Gender</label>
          <label htmlFor="female">Female</label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="F"
            checked={formData.gender === "F"}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
          />
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            id="male"
            name="gender"
            value="M"
            checked={formData.gender === "M"}
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
          />
          {errors.gender && <span className="error">{errors.gender}</span>}
        </div>
        <div className="fields">
          <label htmlFor="designation">Designation</label>
          <select
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={(e) =>
              setFormData({ ...formData, designation: e.target.value })
            }
          >
            <option value="hr">HR</option>
            <option value="manager">Manager</option>
            <option value="sales">Sales</option>
          </select>
          {errors.designation && (
            <span className="error">{errors.designation}</span>
          )}
        </div>
        <div className="fields">
          <label htmlFor="course">Course</label>

          <input
            type="checkbox"
            id="mca"
            name="courses"
            value="mca"
            checked={formData.courses.includes("mca")}
            onChange={(e) =>
              setFormData({ ...formData, courses: e.target.value })
            }
          />
          <label htmlFor="mca">MCA</label>
          <input
            type="checkbox"
            id="bca"
            name="courses"
            value="bca"
            checked={formData.courses.includes("bca")}
            onChange={(e) =>
              setFormData({ ...formData, courses: e.target.value })
            }
          />
          <label htmlFor="bca">BCA</label>

          <input
            type="checkbox"
            id="bsc"
            name="courses"
            value="bsc"
            checked={formData.courses.includes("bsc")}
            onChange={(e) =>
              setFormData({ ...formData, courses: e.target.value })
            }
          />
          <label htmlFor="bsc">BSC</label>
          {errors.courses && <span className="error">{errors.courses}</span>}
        </div>
        <div>
          <label htmlFor="image">Image Upload</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={(e) => {
              const selectedImage = e.target.files[0];
              console.log(selectedImage);
              setFormData({ ...formData, image: selectedImage });
            }}
          />
          {errors.image && <span className="error">{errors.image}</span>}
        </div>

        <button type="submit">Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Home;
