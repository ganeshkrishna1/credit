import React, { useEffect,useState } from "react";
import axios from "axios";
import Nav from "../Navigation/nav";
function Status() {
    const [originalData, setOriginalData] = useState([]);
    const [data, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");


  useEffect(()=>{
      axios.get('http://localhost:8081/getapplications')
      .then(res=>{
        if (res.data.Status === "Success") {
            console.log(res.data.Result);
            setOriginalData(res.data.Result);
          } else {
            alert("Error");
          }
        })
        .catch((err) => console.log(err));
    }, []);
    const handleSearch = (event) => {
        event.preventDefault();
        const filteredResults = originalData.filter((item) =>
          item.id.toString().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filteredResults);
      };

  return (
    <>
    <Nav/>
      <div className='body'>
        <div><br/></div>

      </div>
      <br></br><br></br>
      <div className="template_Container">
  <div className="row justify-content-center mb-3">
    <div className="col-lg-8 col-md-10 col-sm-12">
      <div className="input-group">
        <input
          id="searchStudent"
          type="text"
          className="form-control"
          placeholder="Type here Application ID to track your status"
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
          }}
        />
        <button className="btn btn-success" type="submit" onClick={handleSearch}>
          Track
        </button>
      </div>
    </div>
  </div>
        <br></br>
  {data.length > 0 ? (
    <center>
    <table className="gridTable">
      <thead>
        <tr>
          <th>Application Id</th>
          <th>Applicant Name</th>
          <th>Dob</th>
          <th>Mobile number</th>
          <th>Occupation</th>
          <th>Income</th>
          <th>Submitted Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
      {data.map((val) => {

  const currentStatus = val.stat;
  const isAccepted = currentStatus === 'pending';
  const buttonText = isAccepted ? 'Accepted' : currentStatus === 'no' ? 'Rejected' : 'Approved';
  const buttonColor = isAccepted ? '#39C64D' : currentStatus === 'no' ? 'red' : 'green';

  return (
    <tr key={val.id}>
      <td>{val.id } </td>
      <td>{val.name} </td>
      <td>{val.dob}</td>
      <td>{val.phone}</td>
      <td>{val.occupation}</td>
      <td>{val.income}</td>
      <td>{val.date}</td>
      <td>
        <button
          style={{ backgroundColor: buttonColor }}
        >
          {buttonText}
        </button>
      </td>
    </tr>
  );
})}
      </tbody>
    </table>
    </center>
  ) : (
    <p></p>
  )}
</div>
<br></br>
    </>
  );
}

export default Status;