import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { getApprovalallschema } from "../services/approvalapi";
import Pagination from "./Pagination";
import "./css/home.css";
import moment from "moment";
import Loader from "./loader/loading";
import Pagination2 from "./Pagination2";
const PER_PAGE = 10;

function Approval() {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPAge] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    sahil().then((something) => {
      console.log(something.data, "data");
      setData(something.data);
      setLoading(false);
    });
    async function sahil() {
      setLoading(true);
      return await getApprovalallschema();
    }
  }, []);

  function handleClick({ selected: selectedPage }) {
    // console.log("selectedpage", selectedPage);
    setCurrentPAge(selectedPage);
  }

  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(data.length / PER_PAGE);
  let approvalrender = {
    1: "Change Proposed",
    2: "Change Approved",
    3: "Change Rejected",
    4: "Deployment Rejected",
    5: "Deployment Success",
  };

  return (
    <>
      {loading && <Loader />}
      <div className="home_container">
        <div className="home_title_div">
          <h1 className="home_title">Approvals List</h1>
        </div>
        <div className="home_table">
          <table className="table table-striped">
            <thead>
              <tr className="uper_table_container uper_table_container_field">
                <th scope="col">Edited On</th>
                <th scope="col" style={{ width: "30%", paddingRight: "10px" }}>
                  Program
                </th>
                <th scope="col">Field Change</th>
                <th scope="col">Schema Name</th>
                <th scope="col">Edited By</th>
                <th scope="col">Approved/Rejected By</th>
                <th scope="col">Approval Status</th>
                <th scope="col">Action</th>
                <th scope="col">Approval/Rejection On</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.slice(offset, offset + PER_PAGE).map((data, idx) => {
                  return (
                    <tr className="uper_table_container" key={idx}>
                      <th>
                        {moment(data.createdAt).format("DD/MM/YYYY,h:mm:ssa")}
                      </th>
                      <th
                        scope="row"
                        style={{ width: "400px", paddingRight: "20px" }}
                      >
                        {data.old_schema != null
                          ? data.schema_name.includes("Webinar")
                            ? data.old_schema.ProgramName
                            : data.old_schema.programTitle
                          : "--"}
                      </th>
                      <th scope="row" style={{ paddingRight: "20px" }}>
                        {data.field_name + ""}
                      </th>
                      <th>{data.schema_name || "---"}</th>
                      <th>{data.email || "---"}</th>
                      <th style={{textAlign:"center"}}>{data.approvedEmail || "Not yet Approved"}</th>
                      <th>
                        <Link
                          style={{ textDecoration: "none", color: "#3c4852"}}
                          to={`/Viewapprovaldetail${data._id}`}>
                          {approvalrender[data.final_status]}
                        </Link>
                      </th>
                      <th>
                        {data.final_status == 1 ? (
                          <Link
                            style={{ textDecoration: "none", color: "#fff" }}
                            to={`/Approvalspecific${data._id}`}
                          >
                            <img
                              src="https://cdn.pegasus.imarticus.org/iit_roorkee/editicon1.svg"
                              alt="edit icon"
                              height="20px"
                              width="20px"
                            />
                          </Link>
                        ) : (
                          ""
                        )}
                      </th>
                      <th>
                        {moment(data.updatedAt).format("DD/MM/YYYY,h:mm:ssa")}
                      </th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div>
          <Pagination2 handleClick={handleClick} pageCount={pageCount} />
        </div>
      </div>
    </>
  );
}

export default Approval;
