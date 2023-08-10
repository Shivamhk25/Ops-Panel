import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getApprovalspecificschema } from "../services/approvalapi";
import { Nametorender } from "../services/helper";
import { Deploymentrender } from "../services/helper";
import moment from "moment";

function Viewapprovaldetail() {
  let { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    specificdata().then((specificdata) => {
      console.log(specificdata.data.data, "data");
      setPropsdata(specificdata.data.data);
      setLoading(false);
    });

    async function specificdata() {
      return await getApprovalspecificschema(id);
    }
  }, []);

  const [propsdata, setPropsdata] = useState("");

  let deploymentrender = {
    1: "Change Proposed and Change Approval Pending",
    2: "Change Approved and Pending Deployment",
    3: "Change Rejected",
    4: "Deployment Rejected",
    5: "Deployment Success",
  };

  return (
    <div>
      {!loading && (
        <div className="main_container_edit">
          <div className="program_name_container">
            {/* <h1 className='program_name' >{id}</h1> */}

            <div>
              <h4>Field Changed</h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "baseline",
                }}
              >
                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: "500",
                    color: "red",
                  }}
                >
                  {propsdata.field_name.join(",")}
                </p>
              </div>
            </div>
            <div style={{ marginTop: "20px" }}>
              <h5>Deployment Status</h5>
              <p
                style={{ fontSize: "18px", fontWeight: "500", color: "green" }}
              >
                {deploymentrender[propsdata.final_status]}
              </p>
            </div>
            {/* <div style={{ marginTop: "20px" }}>
              <h5>Deployment Environment</h5>
              <p
                style={{ fontSize: "18px", fontWeight: "500", color: "green" }}
              >
                {[
                  propsdata && propsdata.is_deployment_done.STAGING
                    ? "Staging"
                    : "",
                ]}
              </p>
            </div> */}
            <div style={{ marginTop: "20px" }}>
              <h5>Date and Time</h5>
              <p
                style={{ fontSize: "18px", fontWeight: "500", color: "green" }}
              >
                {moment(propsdata.updatedAt).format("DD/MM/YYYY, h:mm:ss a")}
              </p>
            </div>
            <div style={{ marginTop: "30px" }}>
              {propsdata.new_schema &&
                !propsdata.schema_name.includes("Webinar") &&
                Object.keys(propsdata.new_schema).map((data) => {
                  if (data == "_id") return "";
                  return (
                    <div className="change_content_box">
                      <p>{data}</p>
                      {data == "tag" ? (
                        <h1>{propsdata.new_schema[data].join(", ")}</h1>
                      ) : data === "brochureFileName" ? (
                        <a
                          href={propsdata.new_schema[data]}
                          target="_blank"
                          style={{ overflowWrap: "break-word" }}
                        >
                          {propsdata.new_schema[data]
                            ? propsdata.new_schema[data]
                            : "---"}
                        </a>
                      ) : (
                        <h1>{propsdata.new_schema[data]}</h1>
                      )}
                    </div>
                  );
                })}
              {propsdata.new_schema &&
                propsdata.schema_name.includes("Webinar") &&
                Object.keys(propsdata.new_schema).map((data) => {
                  if (data == "_id") return "";
                  if (data == "ProgramName") return "";
                  return (
                    <div>
                      <div className="webinarHeadingMain">{data}</div>
                      <div>
                        {Object.keys(propsdata.new_schema[data]).map(
                          (data1) => {
                            return (
                              <div>
                                <div className="webinarHeading">{data1}</div>
                                <div>
                                  {data1.includes("mage") &&
                                    Object.keys(
                                      propsdata.new_schema[data][data1]
                                    ).map((data2) => {
                                      return (
                                        <div className="webinarHeadingDiv">
                                          <div className="webinarHeading2">
                                            {data2}
                                          </div>
                                          <div>
                                            {
                                              propsdata.new_schema[data][data1][
                                                data2
                                              ]
                                            }
                                          </div>
                                        </div>
                                      );
                                    })}
                                </div>
                                <div>
                                  {data1.includes("Info") &&
                                    propsdata.new_schema[data][data1].map(
                                      (data3, index) => {
                                        return (
                                          <>
                                            <div className="webinarHeadingDiv">
                                              <div>
                                                {data1.split("Info")[0] +
                                                  " " +
                                                  (index + 1)}
                                              </div>
                                              <ul>
                                                {Object.keys(
                                                  propsdata.new_schema[data][
                                                    data1
                                                  ][index]
                                                ).map((data2) => {
                                                  if (data2 == "_id") return "";
                                                  return (
                                                    <li className="webinarHeadingDiv1">
                                                      {
                                                        propsdata.new_schema[
                                                          data
                                                        ][data1][index][data2]
                                                      }
                                                    </li>
                                                  );
                                                })}
                                              </ul>
                                            </div>
                                          </>
                                        );
                                      }
                                    )}
                                </div>
                                <div>
                                  {data1.includes("Description") &&
                                    propsdata.new_schema[data][data1].map(
                                      (data3, index) => {
                                        return (
                                          <ul className="webinarHeadingDiv">
                                            {Object.keys(
                                              propsdata.new_schema[data][data1][
                                                index
                                              ]
                                            ).map((data2) => {
                                              if (data2 == "_id") return "";
                                              return (
                                                <li className="webinarHeadingDiv1">
                                                  {
                                                    propsdata.new_schema[data][
                                                      data1
                                                    ][index][data2]
                                                  }
                                                </li>
                                              );
                                            })}
                                          </ul>
                                        );
                                      }
                                    )}
                                </div>
                                <div>
                                  {data1.includes("career") &&
                                    propsdata.new_schema[data][data1].map(
                                      (data3, index) => {
                                        return (
                                          <div>
                                            <div className="webinarHeadingDiv">
                                              {"Student" + " " + (index + 1)}
                                            </div>
                                            <ul>
                                              {Object.keys(
                                                propsdata.new_schema[data][
                                                  data1
                                                ][index]
                                              ).map((data2) => {
                                                if (data2 == "_id") return "";
                                                return (
                                                  <li className="webinarHeadingDiv2">
                                                    {
                                                      propsdata.new_schema[
                                                        data
                                                      ][data1][index][data2]
                                                    }
                                                  </li>
                                                );
                                              })}
                                            </ul>
                                          </div>
                                        );
                                      }
                                    )}
                                </div>
                                <div>
                                  {!data1.includes("career") &&
                                    !data1.includes("mage") &&
                                    !data1.includes("Info") &&
                                    !data1.includes("Description") && (
                                      <div className="webinarHeadingDiv">
                                        {propsdata.new_schema[data][data1]}
                                      </div>
                                    )}
                                </div>
                              </div>
                            );

                            // return (<div>{propsdata.old_schema[data][data1]}</div>)
                          }
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Viewapprovaldetail;
