import React, { useState } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import "./index.css";
import Job from "./../../Assets/jobs.json";
import Filter from "../Filter";
import { AiOutlinePlus, AiFillPlusSquare } from "react-icons/ai";

const experience = [
  { min: 0, max: 1 },
  { min: 2, max: 3 },
  { min: 4, max: 5 },
  { min: 5, max: 10 },
];

const Jobs = () => {
  const JobData = JSON.parse(localStorage.getItem("item")) || [];
  const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
  const [filteredJobs, setFilteredJobs] = useState([...JobData, ...Job]);
  const [searchterm, setSearchTerm] = useState("");
  
  function handleJobFilter(event) {
    const value = event.target.innerText;
    event.preventDefault();
    setFilteredJobs(
      Job.filter((job) => job.role === value)
    );
  }

  function saveClick(job) {
    let updatedSavedJobs = savedJobs;
    if (savedJobs.find(savedJob => savedJob.id === job.id)) {
      updatedSavedJobs = savedJobs.filter(savedJob => savedJob.id !== job.id);
    } else {
      updatedSavedJobs = [...savedJobs, job];
    }
    localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
    setFilteredJobs([...filteredJobs]); 
  }

  const searchEvent = (event) => {
    const data = event.target.value;
    setSearchTerm(data);
    if (searchterm !== "" && searchterm.length > 2) {
      const filterData = Job.filter((item) =>
        Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchterm.toLowerCase())
      );
      setFilteredJobs(filterData);
    } else {
      setFilteredJobs(Job);
    }
  };

  function handleExperienceFilter(checkedState) {
    let filters = [];
    checkedState.forEach((item, index) => {
      if (item === true) {
        const filterS = Job.filter((job) => 
          job.experience >= experience[index].min && 
          job.experience <= experience[index].max
        );
        filters = [...filters, ...filterS];
      }
    });
    setFilteredJobs(filters);
  }

  return (
    <>
      <Navbar />
      <div className="jobs-for-you">
        <div className="job-background">
          <h2>Open Roles</h2>
        </div>
        <div className="job-section">
          <div className="job-page">
            {filteredJobs.map(
              ({ id, logo, company, position, location, posted, role }) => (
                <div className="job-list" key={id}>
                  <div className="job-card">
                    <div className="job-name">
                      <img
                        src={
                          logo.length > 20
                            ? logo
                            : require(`../../Assets/images/${logo}`)
                        }
                        alt="logo"
                        className="job-profile"
                      />
                      <div className="job-detail">
                        <h4>{company}</h4>
                        <h3>{position}</h3>
                        <div className="category">
                          <p>{location}</p>
                          <p>{role}</p>
                        </div>
                      </div>
                    </div>
                    <div className="job-button">
                      <div className="job-posting">
                        <Link to="/apply-jobs">Apply Now</Link>
                      </div>
                      <div className="save-button" onClick={() => saveClick({ id, logo, company, position, location, posted })}>
                        {savedJobs.find(savedJob => savedJob.id === id) ? (
                          <AiFillPlusSquare />
                        ) : (
                          <AiOutlinePlus />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          <Filter
            setFilteredJobs={setFilteredJobs}
            handleJobFilter={handleJobFilter}
            handleExperienceFilter={handleExperienceFilter}
            searchEvent={searchEvent}
          />
        </div>
      </div>
    </>
  );
};

export default Jobs;
