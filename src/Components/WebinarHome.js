import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WebinarAllField from "../services/webinarapi";
import Loader from "./loader/loading";
import "./css/webinar.css";
// import { CreateNewWebinar } from "../services/webinarapi";

function WebinarHome() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [webinar, setWebinar] = useState(false);
  console.log(webinar, "ressssss");

  useEffect(() => {
    getAllData().then((res) => {
      setData(res.data);
      setLoading(false);
      console.log(data, "data");
    });

    async function getAllData() {
      setLoading(true);
      return await WebinarAllField();
    }
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container-fluid" style={{ height: "100vh" }}>
          <div className="row" style={{ height: "100%" }}>
            <div className="home_container">
              <div className="home_title_div">
                <h1 className="home_title">Webinar List</h1>
              </div>
              <div className="home_table">
                <table className="table table-striped">
                  <thead>
                    <tr className="uper_table_container">
                      <th
                        scope="col"
                        style={{ width: "28%", paddingRight: "10px" }}
                      >
                        Webinar Title
                      </th>
                      <th scope="col">Webinar Live Date</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 &&
                      data.map((res) => {
                        return (
                          <tr className="uper_table_container">
                            <th scope="row" style={{ paddingRight: "20px" }}>
                              {res.ProgramName}
                            </th>
                            <th>{res.Header.WebinarDateAndTime}</th>
                            <th>
                              <Link
                                style={{
                                  textDecoration: "none",
                                  color: "#fff",
                                }}
                                to={`/Webinardetails${res._id}`}
                              >
                                <img
                                  src="https://cdn.pegasus.imarticus.org/iit_roorkee/editicon1.svg"
                                  alt="edit icon"
                                  height="20px"
                                  width="20px"
                                />
                              </Link>
                            </th>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              {/* <div>
                <button
                  type="submit"
                  className="button"
                  onClick={() => {
                    setWebinar(true);
                    // CreateNewWebinar()
                  }}
                >
                  <p>New Webinar</p>
                </button>
              </div> */}
              {/* {webinar && (
                <div className="webinar_pop_main">
                  <div className="webinar_pop">
                    <input type="text" />
                    <button
                      type="submit"
                      className="button"
                      onClick={() => {
                        CreateNewWebinar();
                      }}
                    >
                      <p>New Webinar</p>
                    </button>
                  </div>
                </div>
              )} */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default WebinarHome;
