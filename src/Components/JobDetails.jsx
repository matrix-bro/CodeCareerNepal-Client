import React from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import { useJobForCompany } from "../store/useJobs";
import { useSearch } from "../store/useSearch";
import { formatDistanceToNow } from "date-fns";

function JobDetails() {
  const { id } = useParams();
  const { allListing, companyName, loading, error } = useJobForCompany(id);
  const { filteredList, inputRef } = useSearch(
    allListing ? allListing : [],
    "jobName"
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <div className="container py-5">
            <div className="col-lg-6 mx-auto text-center mb-3">
              <h1 className="display-4">{companyName?.toUpperCase()}</h1>
              <p className="lead text-muted mb-0">Latest Job Openings.</p>
              <div style={{ margin: "20px 0" }}>
                <input
                  type="text"
                  placeholder="Search by Job Title"
                  ref={inputRef}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                />
              </div>
            </div>
            <div className="row">
              {filteredList.map((element, index) => (
                <div key={index} className="col-lg-4 col-md-6 mb-4">
                  <div className="card h-100 p-3">
                    <div className="d-flex justify-content-between">
                      <div className="d-flex flex-row align-items-center">
                        <div className="icon">
                          <i
                            className="bx bx-code-alt bx-rotate-180"
                            alt="Code Icon"
                          ></i>
                        </div>
                        <div className="ms-2 c-details">
                          <h6 className="mb-0">{id}</h6>
                          <span>
                            {`Last updated ${formatDistanceToNow(
                              new Date(element.updatedAt),
                              { addSuffix: true }
                            )}`}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <h3 className="display-6">{element.jobName}</h3>
                    </div>
                    <div className="mt-auto pt-4">
                      <a
                        href={element.jobUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-light px-5 rounded-pill shadow-sm custom-hover-effect"
                      >
                        Apply
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default JobDetails;
