import "./sideHeader.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import configs from "../constants";
import Loader from "./loader/loading";

const SideHeader = () => {
  const cookies = new Cookies();
  const [loading, setLoading] = useState(false);

  const [paths, setPaths] = useState(window.location.href.split("/")[3] || "");
  console.log("window.location.href :::", window.location.href.split("/")[3]);
  function handleclick(event, path) {
    console.log(path);
    setPaths(path);
  }

  let history = useNavigate();
  const logout = () => {
    setLoading(true);
    cookies.remove("at", { domain: configs.DOMAIN, path: "/" });
    cookies.remove("aid", { domain: configs.DOMAIN, path: "/" });
    cookies.remove("pid", { domain: configs.DOMAIN, path: "/" });
    setLoading(false);
    window.open("/", "_self");
  };

  return (
    <>
      {loading && <Loader />}
      <div
        style={{
          backgroundColor: "#055646",
          width: "100%",
          height: "150vh",
          paddingTop: "35px",
        }}
      >
        <ul style={{ paddingLeft: "0rem" }}>
          <div className="box_li_container">
            <Link to="/Home" style={{ textDecoration: "none" }}>
              <li
                onClick={(e) => handleclick(e, "")}
                className={`side_li ${paths == "" ? "active" : ""}`}
              >
                <p>Program Schema</p>
              </li>
            </Link>
            <Link to="/WebinarHome" style={{ textDecoration: "none" }}>
              <li
                onClick={(e) => handleclick(e, "WebinarHome")}
                className={`side_li ${paths == "WebinarHome" ? "active" : ""}`}
              >
                <p>Webinar Schema</p>
              </li>
            </Link>
            <Link to="/Approvalwindow" style={{ textDecoration: "none" }}>
              <li
                onClick={(e) => handleclick(e, "Approvalwindow")}
                className={`side_li ${
                  paths == "Approvalwindow" ? "active" : ""
                }`}
              >
                <p>Approvals</p>
              </li>
            </Link>
            <Link to="/Deployment" style={{ textDecoration: "none" }}>
              <li
                onClick={(e) => handleclick(e, "Deployment")}
                className={`side_li ${paths == "Deployment" ? "active" : ""}`}
              >
                <p>Deployment</p>
              </li>
            </Link>
         
            {/* <Link to='/Settings' style={{textDecoration: 'none'}}>
              <li onClick={e => (handleclick(e, "Settings")) } className={`side_li ${paths=="Settings"? "active" : ""}`} >
                  <p>Settings</p>
              </li>
            </Link> */}
          </div>
        </ul>
        <div style={{ padding: "28%", position: "absolute", bottom: "30px" }}>
          <button className="logout" onClick={logout}>
            Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export default SideHeader;
