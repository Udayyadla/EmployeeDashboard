import {useEffect, useState} from 'react'
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EditEmployee = () => {
    const id=localStorage.getItem("id")
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        designation: "",
        gender: "",
        department: "hr",
        courses:"",
        image: null,
      });
      useEffect(()=>{
        if (!localStorage.getItem("token")) {
            navigate("/login");
          }
        axios.get(`http://localhost:8000/getoneEmployee/${id}`)
        .then((response)=>{console.log(response.data)
            setFormData({...formData,name:response.data.employeeDetails.name,
            email:response.data.employeeDetails.mobileNumber,
            mobile:response.data.employeeDetails.email,
            designation:response.data.employeeDetails.designation,
            courses:response.data.employeeDetails.course,
            department:response.data.employeeDetails.department,
            image:response.data.employeeDetails.image,
            gender:response.data.employeeDetails.gender,
        })
            console.log(formData)
        })
        .catch((err)=>console.log(err.message))
      },[])
    
      const [errors, setErrors] = useState({});
      const [isNewImageSelected, setIsNewImageSelected] = useState(false);
    
      const validateForm = () => {
        let valid = true;
        console.log("form validating")
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
          console.log(submissionData)
          submissionData.append('name', formData.name);
          submissionData.append('email', formData.email);
          submissionData.append('mobileNumber', formData.mobile);
          submissionData.append('designation', formData.designation);
          submissionData.append('gender', formData.gender);
          submissionData.append('department', formData.department);
          submissionData.append('course', formData.courses);
          // formData.courses.forEach(course => {
          //   submissionData.append('courses', course);
          // });
          if (isNewImageSelected) {
            submissionData.append('image', formData.image);
          }
          console.log(submissionData)
    
          try {
            fetch(`http://localhost:8000/updateEmployeesData/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `${localStorage.getItem("token")}`
    },
      body: submissionData
    })
      .then(response => {
        if (!response.ok) {
         console.log(response.message)
      
        }
        navigate("/employees")
        return response.json();
      })
      .then(data => {
        // Handle the data received from the server
        console.log(data);
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('There was a problem with your fetch operation:', error);
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
       <Navbar/>
      <h1>Welcome to Admin Panel</h1>
      <h2>Edit Employee Details</h2>
      <form className="create-employee" onSubmit={handleSubmit}>
        <div className='fields'>
          <div>
            {" "}
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
          <div >
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
          <div >
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
          <label htmlFor="course" >Course</label>
      
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
            id="bsc"
            name="courses"
            value="bsc"
            checked={formData.courses.includes("bsc")}
            onChange={(e) =>
              setFormData({ ...formData, courses: e.target.value })
            }
          />
          <label htmlFor="bsc">BSC</label>
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
          {errors.courses && <span className="error">{errors.courses}</span>}
        </div>
        <div className="fields">
          <label htmlFor="image">Image Upload</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={(e) => {
              const selectedImage = e.target.files[0];
              console.log(selectedImage)
              setFormData({ ...formData, image: selectedImage });
              setIsNewImageSelected(true); 
            }}
       
          />
      
  
          {errors.image && <span className="error">{errors.image}</span>}
        </div>
        {isNewImageSelected ? (
      <img
        src={URL.createObjectURL(formData.image)} // Show preview of the selected image
        alt="Selected Image"
        className="images"
      />
    ) : (
      <img
        src={`http://localhost:8000/uploads/${formData.image}`} // Show image from backend
        alt="Image"
        className="images"
      />
    )}
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default EditEmployee
