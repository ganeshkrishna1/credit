import React, { useEffect, useState } from "react";
import axios from "axios";
import "./statistics.css";
import Nav from "../Navigation/nav";

function Statisticsusername() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Make a GET request to the API
    axios
      .get("http://localhost:8081/applicants-with-username")
      .then((res) => {
        if (res.data && res.data.length > 0) {
          // If data is received successfully, set it in the state
          setData(res.data);
        } else {
          // If the response does not contain data, handle it as an error
          setError("No results found.");
        }
      })
      .catch((err) => {
        // Handle network or other errors
        console.error(err);
        setError("An error occurred while fetching data.");
      });
  }, []);

  return (
    <>
      <Nav />
      <div className="templateContainer">
        <div className="template_ContainerEnroll">
          {error ? (
            <p>{error}</p>
          ) : data.length > 0 ? (
            <table className="enrolledTable">
              <thead>
                <h2>Admins List</h2>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                {data.map((val, index) => (
                  <tr key={index}>
                    <td>{val.name}</td>
                    <td>{val.username}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Statisticsusername;
