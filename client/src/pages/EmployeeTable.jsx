import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import Navbar from "../components/Navbar";
import "./employeeTable.css";
import { useNavigate } from "react-router-dom";

const EmployeeTable = () => {
  const navigate=useNavigate()
  const [data, setData] = useState("");
  const [records, setRecords] = useState("");
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    axios
      .get("http://localhost:8000/getEmployeesData")
      .then((res) => {
        console.log(res.data);
        setData(res.data.details);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (row) => {
    // Implement delete functionality here, e.g., delete the row from the database
    axios
      .delete(`http://localhost:8000/deleteEmployee/${row._id}`)
      .then((response) => {
        console.log(response.data);
        // Remove the deleted row from the state
        setData(data.filter((item) => item._id !== row._id));
      })
      .catch((err) => console.log(err));
  };
  const handleEdit=(row)=>{
    console.log(row._id)
    localStorage.setItem("id",row._id)
    navigate("/editEmployee")
  }
  const columns = [
    {
      name: "unique Id",
      selector: (row) => row._id,
      minWidth: '200px', // Set a minimum width for the column
    },
    {
      name: "Image",
      selector: (row) => (
        <img
          className="images"
          src={`http://localhost:8000/uploads/${row.image}`}
          alt={`${row.name}`}
        />
      ),
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
    },
    {
      name: "Mobile.No",
      selector: (row) => row.mobileNumber,
    },
    {
      name: "course",
      selector: (row) => row.course,
    },
    {
      name: "created",
      selector: (row) => row.createDate,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <button onClick={() => handleEdit(row)} id="edit">
            Edit
          </button>
          <button onClick={() => handleDelete(row)} id="delete">
            Delete
          </button>
        </>
      ),
      width: "250px",
    },
  ];
  const hanldeFilter = async (event) => {
    const newData = await data.filter((row) => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setData(newData);
  };
  const customStyles = {
    headCells: {
      style: {
        fontSize: "17px",
        textTransform:"uppercase",
        backgroundColor:"#f70776",
        margin:"5px",
        color:"aliceblue",
        borderRadius:"10px",
      },
    },
  };

  return (
    <div>
      <Navbar />
      <h1>Employee Table</h1>
      <div className="search-container">
        <input type="text" placeholder="search" onChange={hanldeFilter} />
      </div>
      <DataTable
        columns={columns}
        data={data}
        selectableRows
        pagination
        customStyles={customStyles}
        highlightOnHover
        fixedHeader
      ></DataTable>
    </div>
  );
};

export default EmployeeTable;
