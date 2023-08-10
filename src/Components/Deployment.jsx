import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import {
  getDeployment,
  postDeployment,
  getDeploymentStatus,
} from "../services/deploymentapi";
import Pagination from "./Pagination";
import "./css/home.css";
import Loader from "./loader/loading";
import { Deploymentrender } from "../services/helper";
import moment from "moment";
import Pagination2 from "./Pagination2";

const PER_PAGE = 10;

function Deployment() {
  const [propsdata2, setPropsdata2] = useState("");
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPAge] = useState(0);
  const [size, setSize] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    deployment().then((ddata) => {
      setPropsdata2(ddata.data.data.sendData);
      // console.log(something, "::::::::::ksahfkj");
    });
    async function deployment() {
      setLoading(true);
      return await getDeployment();
    }

    deploymentlist().then((dstaus) => {
      setData(dstaus.data.data);
      setSize(dstaus.data.size)
      setLoading(false);
    });
    async function deploymentlist() {
      setLoading(true);
      return await getDeploymentStatus(currentPage,PER_PAGE);
    }
  }, []);

  function handleClick({ selected: selectedPage }) {
    // console.log("selectedpage", selectedPage);
    setCurrentPAge(selectedPage);
    deploymentlist().then((dstaus) => {
      setData(dstaus.data.data);
      setLoading(false);
    });
    async function deploymentlist() {
      setLoading(true);
      return await getDeploymentStatus(selectedPage,PER_PAGE);
    }
  }

  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(size / PER_PAGE);

  const submitHandler = async () => {
    try {
      setLoading(true);
      let deploymentstatus = await postDeployment();
      alert(deploymentstatus.data.data.msg);
      window.location.reload();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  let deploymentrender = {
    1: "Not Started",
    2: "Running",
    3: "Failed",
    4: "Success",
  };

  let approvaldeploymentrender = {
    1: "Not Started",
    2: "Pending Deployment",
    3: "Failed",
    4: "Success",
  };

  return (
    <>
      {loading && <Loader />}
      <div className="home_container">
        <div className="home_title_div">
          <h1 className="home_title">Approvals Pending Deployment</h1>
        </div>
        <div className="home_table">
          <table className="table table-striped">
            <thead>
              <tr className="uper_table_container">
                <th scope="col" style={{ width: "10%" }}>
                  Date/Time
                </th>
                <th scope="col" style={{ width: "20%", paddingRight: "10px" }}>
                  Program
                </th>
                <th scope="col">Schema Name</th>
                <th scope="col">Deployment Status</th>
              </tr>
            </thead>
            <tbody>
              {propsdata2 &&
                propsdata2.map((data, idx) => {
                  return (
                    <tr className="uper_table_container" key={idx}>
                      <th>
                        {moment(data.updatedAt).format("DD/MM/YYYY, h:mm:ss a")}
                      </th>
                      <th scope="row" style={{ paddingRight: "20px" }}>
                        {data.schema_name.includes("Webinar")
                          ? data.old_schema.ProgramName
                          : data.old_schema.programTitle}
                      </th>
                      <th>{data.field_name.join(",") || "---"}</th>

                      <th>{approvaldeploymentrender[data.final_status]}</th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="deployment_btn_div">
          <button className="deployment_btn" onClick={submitHandler}>
            Start Staging Deployment
          </button>
        </div>
      </div>

      <div className="home_container">
        <div className="home_title_div">
          <h1 className="home_title">Deployment Status</h1>
        </div>
        <div className="home_table">
          <table className="table table-striped">
            <thead>
              <tr className="uper_table_container">
                <th scope="col">Date/Time</th>
                <th scope="col" style={{ width: "10%", paddingRight: "10px" }}>
                  Deployment ID
                </th>
                <th scope="col">Environment</th>
                <th scope="col">Number of Request</th>
                <th scope="col">Deployment Status</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.map((data, idx) => {
                  return (
                    <tr className="uper_table_container" key={idx}>
                      <th>
                        {moment(data.createdAt).format("DD/MM/YYYY, h:mm:ss a")}
                      </th>
                      <th scope="row" style={{ paddingRight: "5px" }}>
                        {data._id}
                      </th>
                      <th>{data.env_type}</th>
                      <th>{data.linked_approval_ids.length}</th>
                      <th>
                        <Link
                          style={{ textDecoration: "none", color: "#3c4852" }}
                          to={`/Deploymentspecific${data._id}`}
                        >
                          {deploymentrender[data.deployment_status]}
                        </Link>
                      </th>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <Pagination2 handleClick={handleClick} pageCount={pageCount} />
      </div>
    </>
  );
}

export default Deployment;
