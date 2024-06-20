import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import {  AiFillPlusSquare } from "react-icons/ai";

const SaveJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(jobs);
  }, []);

  function removeSavedJob(id) {
    const updatedJobs = savedJobs.filter((job) => job.id !== id);
    localStorage.setItem("savedJobs", JSON.stringify(updatedJobs));
    setSavedJobs(updatedJobs);
  }

  return (
    <>
      <Navbar />
      <div className="jobs-for-you">
        <div className="job-background">
          <h2>Saved Jobs</h2>
        </div>
        <div className="job-section">
          <div className="job-page">
            {savedJobs.length > 0 ? (
              savedJobs.map(
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
                        <div
                          className="save-button"
                          onClick={() => removeSavedJob(id)}
                        >
                          <AiFillPlusSquare />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )
            ) : (
              <p>No saved jobs found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SaveJobs;
