import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import "./css/approval.css";
import Loader from "./loader/loading";
import MyVerticallyCenteredModal from "./Model";
import {
  getOtprequest,
  reject_data,
  getApprovalspecificschema,
} from "../services/approvalapi";
import { Nametorender } from "../services/helper";

function Approvalspecific() {
  const [maildata, setMaildata] = useState({
    Fieldchange: "",
    Newdata: "",
    Olddata: "",
  });
  const [approvalID, setApprovalID] = useState("");
  let { id } = useParams();
  // console.log(id, ":::::::::::::::");

  useEffect(() => {
    sahil().then((something) => {
      console.log(something.data.data);
      setPropsdata(something.data.data);
      setMaildata({
        Fieldchange: something.data.data.field_name,
        Newdata: something.data.data.new_schema,
        Olddata: something.data.data.old_schema,
      });
      setApprovalID(something.data.data._id);
      setLoading(false);
    });
    async function sahil() {
      setLoading(true);
      return await getApprovalspecificschema(id);
    }
  }, []);

  function apicall() {
    setLoading(true);
    setShow(true);
    console.log(maildata);
    setLoading(false);
  }

  let history = useNavigate();

  const rejection = async () => {
    try {
      setLoading(true);
      let data = await reject_data(id);
      setLoading(false);
      alert("Rejection Successful");
      window.open("/Approvalwindow", "_self");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [propsdata, setPropsdata] = useState("");
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && <Loader />}

      <div className="main_container_edit">
        {/* <Model /> */}
        {show && (
          <MyVerticallyCenteredModal
            setLoading={setLoading}
            getOtprequest={getOtprequest}
            maildata={maildata}
            show={show}
            handleClose={handleClose}
            approvalId={approvalID}
            id={propsdata._id}
          />
        )}
        <div>
          <h4>Fields Changed</h4>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              columnGap: "5px",
              whiteSpace: "nowrap",
            }}
          >
            {propsdata.field_name &&
              propsdata.field_name.map((data, idx) => {
                return (
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "500",
                      color: "red",
                    }}
                  >
                    {data} {idx == propsdata.field_name.length - 1 ? "" : ","}{" "}
                  </p>
                );
              })}
          </div>
        </div>
        <div className="main_container_divider">
          <div className="main_container_divid1">
            <div className="change_content">
              <p>Before</p>
            </div>
            <div style={{ marginTop: "10px" }}>
              {propsdata.old_schema &&
                !propsdata.schema_name.includes("Webinar") &&
                Object.keys(propsdata.old_schema).map((data) => {
                  if (data == "_id") return "";
                  return (
                    <div className="change_content_box">
                      <p>{data}</p>
                      {data == "tag" ? (
                        <h1>{propsdata.old_schema[data].join(", ")}</h1>
                      ) : data === "brochureFileName" ? (
                        <a
                          href={propsdata.old_schema[data]}
                          target="_blank"
                          style={{ overflowWrap: "break-word" }}
                        >
                          {propsdata.old_schema[data]
                            ? propsdata.old_schema[data]
                            : "---"}
                        </a>
                      ) : (
                        <h1>{propsdata.old_schema[data]}</h1>
                      )}
                    </div>
                  );
                })}
              {propsdata.old_schema &&
                propsdata.schema_name.includes("Webinar") &&
                Object.keys(propsdata.old_schema).map((data) => {
                  if (data == "_id") return "";
                  if (data == "ProgramName") return "";
                  return (
                    <div>
                      <div className="webinarHeadingMain">{data}</div>
                      <div>
                        {Object.keys(propsdata.old_schema[data]).map(
                          (data1) => {
                            return (
                              <div>
                                <div className="webinarHeading">{data1}</div>
                                <div>
                                  {data1.includes("mage") &&
                                    Object.keys(
                                      propsdata.old_schema[data][data1]
                                    ).map((data2) => {
                                      return (
                                        <div className="webinarHeadingDiv">
                                          <div className="webinarHeading2">
                                            {data2}
                                          </div>
                                          <div>
                                            {
                                              propsdata.old_schema[data][data1][
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
                                    propsdata.old_schema[data][data1].map(
                                      (data3, index) => {
                                        return (
                                          <>
                                            <div className="webinarHeadingDiv">
                                              <div>
                                                {data1.split("Info")[0] +
                                                  " " +
                                                  (index+1) }
                                              </div>
                                              <ul >
                                                {Object.keys(
                                                  propsdata.old_schema[data][
                                                    data1
                                                  ][index]
                                                ).map((data2) => {
                                                  if (data2 == "_id") return "";
                                                  return (
                                                    <li className="webinarHeadingDiv1">
                                                      {
                                                        propsdata.old_schema[
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
                                    propsdata.old_schema[data][data1].map(
                                      (data3, index) => {
                                        return (
                                          <ul className="webinarHeadingDiv">
                                            {Object.keys(
                                              propsdata.old_schema[data][data1][
                                                index
                                              ]
                                            ).map((data2) => {
                                              if (data2 == "_id") return "";
                                              return (
                                                <li className="webinarHeadingDiv1">
                                                  {
                                                    propsdata.old_schema[data][
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
                                    propsdata.old_schema[data][data1].map(
                                      (data3, index) => {
                                        return (
                                        <div>
                                          <div className="webinarHeadingDiv">{"Student"+" "+(index+1) }</div>
                                          <ul >
                                            {Object.keys(
                                              propsdata.old_schema[data][data1][
                                                index
                                              ]
                                            ).map((data2) => {
                                              if (data2 == "_id") return "";
                                              return (
                                                <li className="webinarHeadingDiv2">
                                                  {
                                                    propsdata.old_schema[data][
                                                      data1
                                                    ][index][data2]
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
                                      {typeof propsdata.old_schema[data][data1] == "boolean" ? (propsdata.old_schema[data][data1] == true ? "True": "False"): propsdata.old_schema[data][data1] }
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

          <div className="main_container_divide2">
            <div className="change_content">
              <p>After</p>
            </div>

            <div style={{ marginTop: "10px" }}>
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
                                                  (index+1) }
                                              </div>
                                              <ul >
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
                                          <div className="webinarHeadingDiv">{"Student"+" "+(index+1) }</div>
                                          <ul >
                                            {Object.keys(
                                              propsdata.new_schema[data][data1][
                                                index
                                              ]
                                            ).map((data2) => {
                                              if (data2 == "_id") return "";
                                              return (
                                                <li className="webinarHeadingDiv2">
                                                  {
                                                    propsdata.new_schema[data][
                                                      data1
                                                    ][index][data2]
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
                                        {typeof propsdata.new_schema[data][data1] == "boolean" ? (propsdata.new_schema[data][data1] == true ? "True": "False"): propsdata.new_schema[data][data1] }
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
        <div
          className="approvedandrejectbtn"
          style={{ marginBottom: "60px", marginTop: "30px" }}
        >
          <button className="approved" onClick={apicall}>
            Approve
          </button>
          <button className="reject" onClick={rejection}>
            Reject
          </button>
        </div>
      </div>
    </>
  );
}

export default Approvalspecific;
