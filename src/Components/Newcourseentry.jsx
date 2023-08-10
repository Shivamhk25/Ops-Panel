import React from "react";
import TopHeader from "./topHeader";
import "./css/newcourseentry.css";
import { useEffect, useState } from "react";
import { marketingApiHelper } from '../services/marketingapi';
import Loader from "./loader/loading";

function Newcourseentry() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [name, setName] = useState("");
  const [pgdesc, setPgdesc] = useState("")
  const [launchdate, setLaunchdate] = useState("")
  const [pgmetakeyword, setProgrammetakeyword] = useState("")
  const [pgogtitle, setpgogtitle] = useState("")
  const [title, setTitle] = useState("")
  const [pgogdesc, setPgogdesc] = useState("")
  const [categorie, setCotegorie] = useState("")
  const [domain, setDomain] = useState("")

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        setLoading(true)
      setError(null);
      const data = await marketingApiHelper({
        name: name,
        pgtitle: title,
        date: launchdate,
        pgmetadesc: pgdesc,
        pgmetakeyword: pgmetakeyword,
        pgogtitle: pgogtitle,
        pgogdesc: pgogdesc,
        categorie: categorie,
        domain: domain,

      });
        setLoading(false)
        // setDomain("")
        // setName("")
        // setLaunchdate("")
        // setPgdesc("")
        // setCotegorie("")
        // setPgogdesc("")
        // setTitle("")
        // setpgogtitle("")
        // setPgogdesc("")
        // setProgrammetakeyword("")
    } catch (error) {
      setLoading(false);

      setError(error);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="container-fluid" style={{ height: "100vh" }}>
        <div className="row" style={{ height: "100%" }}>
          <div className="main-container"></div>
          <div className="coursecontainer">
            <div className="enquire_form_main">
              <form onSubmit={submitHandler}>
                <div className="top_closing_button">
                  <h3 className="blc enquireFormheading">
                    Add New Course
                  </h3>
                </div>

                <div className="enquire_box_space">
                  <div className="form-inpt-contnr">
                    <input
                      value={title}
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                      className="form-inpt enquireFormInput"
                      placeholder="Program Title*"
                      id="title"
                      name="title"
                      required
                      maxLength={1000}
                    />
                  </div>
                </div>
                <div className="enquire_box_space">
                  <div className="form-inpt-contnr">
                    <input
                      type="text"
                      value={name}
                      className="form-inpt enquireFormInput"
                      placeholder="Enter Program Name*"
                      id="name"
                      onChange={(e) => setName(e.target.value)}
                      name="name"
                      required
                      maxLength={1000}
                    />
                  </div>
                </div>
                <div className="enquire_box_space">
                  <div className="form-inpt-contnr">
                    <input
                      type="text"
                      value={pgdesc}
                      className="form-inpt enquireFormInput"
                      placeholder="Enter Program Description*"
                      id="pgdesc"
                      onChange={(e) => setPgdesc(e.target.value)}
                      name="pgdesc"
                      required
                      maxLength={1000}
                    />
                  </div>
                </div>
                <div className="enquire_box_space">
                  <div className="form-inpt-contnr">
                    <input
                      type="text"
                      value={pgmetakeyword}
                      className="form-inpt enquireFormInput"
                      placeholder="Enter Program Meta Keyword*"
                      id="pgmetakeyword"
                      onChange={(e) => setProgrammetakeyword(e.target.value)}
                      name="pgmetakeyword"
                      required
                      maxLength={1000}
                    />
                  </div>
                </div>
                <div className="enquire_box_space">
                  <div className="form-inpt-contnr">
                    <input
                      type="text"
                      value={pgogtitle}
                      className="form-inpt enquireFormInput"
                      placeholder="Enter Program OG Title*"
                      id="pgogtitle"
                      onChange={(e) => setpgogtitle(e.target.value)}
                      name="pgogtitle"
                      required
                      maxLength={1000}
                    />
                  </div>
                </div>
                <div className="enquire_box_space">
                  <div className="form-inpt-contnr">
                    <input
                      type="text"
                      value={pgogdesc}
                      className="form-inpt enquireFormInput"
                      placeholder="Enter Progam OG Description*"
                      id="pgogdesc"
                      onChange={(e) => setPgogdesc(e.target.value)}
                      name="pgogdesc"
                      required
                      maxLength={1000}
                    />
                  </div>
                </div>
                <div className="enquire_box_space">
                  <div className="form-inpt-contnr">
                    <input
                      type="text"
                      value={categorie}
                      className="form-inpt enquireFormInput"
                      placeholder="Enter Course Category*"
                      id="categorie"
                      onChange={(e) => setCotegorie(e.target.value)}
                      name="categorie"
                      required
                      maxLength={1000}
                    />
                  </div>
                </div>
                <div className="enquire_box_space">
                  <div className="form-inpt-contnr">
                    <input
                      type="text"
                      value={domain}
                      className="form-inpt enquireFormInput"
                      placeholder="Enter Course Domain*"
                      id="domain"
                      onChange={(e) => setDomain(e.target.value)}
                      name="domain"
                      required
                      maxLength={1000}
                    />
                  </div>
                </div>
                <div className="enquire_box_space">
                  <div className="form-inpt-contnr">
                    <input
                      type="text"
                      value={launchdate}
                      className="form-inpt enquireFormInput"
                      placeholder="Enter Application Deadline Date*"
                      id="launchdate"
                      onChange={(e) => setLaunchdate(e.target.value)}
                      name="launchdate"
                      required
                      maxLength={1000}
                    />
                  </div>
                </div>
                <div className="submit_button">
                  <button
                    type="submit"
                    className="cus-btn user-form-submit form-submit-text enquireFormButton"
                    id="request-otp-button"
                    style={{}}
                  >
                    Submit
                  </button>
                </div>
                <div
                  submit-error
                  className="form-bottom-alerts form-bottom-alert-error center"
                >
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Newcourseentry;
