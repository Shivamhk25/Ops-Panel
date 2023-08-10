import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "./loader/loading";
import { editCourseApi, BrochureApi } from "../services/editCourseapi";
import { getApprovalspecificschema } from "../services/approvalapi";
import { getOtprequest } from "../services/approvalapi";
import { TagPicker } from "rsuite";
import { Nametorender } from "../services/helper";
import { getProgramtag } from "../services/marketinggetapi";

function Editcourse() {
  const [options, setOption] = useState("");

  useEffect(() => {
    something.state.checkbox.forEach((data) => {
      if (data.name === "brochureFileName") {
        let body = { ...editdata };
        body["brochureFileName"] = data.value;
        setEditdata(body);
      }
    });
    getPtag().then((data) => {
      setOption(data);
      console.log(data);
      setLoading(false);
    });
    async function getPtag() {
      setLoading(true);
      return await getProgramtag();
    }
  }, []);

  let { id } = useParams();
  let something = useLocation();
  console.log(something.state.checkbox, ":::::::::");

  let tagsArr = [];
  for (let i = 0; i < something.state.checkbox.length; i++) {
    if (something.state.checkbox[i].name == "tag") {
      let tags = something.state.checkbox[i].value;
      tagsArr = tags.split(",");
      break;
    }
  }

  const [editdata, setEditdata] = useState({});
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();
  const [link, setLink] = useState();

  const [value, setValue] = React.useState(tagsArr || []);
  const [cacheData, setCacheData] = React.useState([]);
  const handleSelect = (value, item, event) => {
    // console.log(value, "value", item, "item", event, "event");
    setCacheData([...cacheData, item]);
  };

  const buttonClick = async (data) => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("file", data);
    console.log(formdata, "cccccccc");
    let body = { ...editdata };
    const res = await BrochureApi(id, formdata);
    if (res.status === 200) {
      setLink(res.data.data.newLink);
      body["brochureFileName"] = res.data.data.newLink;
      setEditdata(body);
      alert("Brochure Successfully Uploaded");
      setLoading(false);
    } else {
      alert(res.data.message);
      setLoading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let body = { ...editdata };
      if (value.length > 0) {
        body["tag"] = value;
        setEditdata(body);
      }
      for (let i = 0; i < Object.keys(body).length; i++) {
        // console.log("1")
        if (body[Object.keys(body)[i]]) {
          console.log(typeof body[Object.keys(body)[i]], "trim function");
          if (typeof body[Object.keys(body)[i]] == "string") {
            if (body[Object.keys(body)[i]].trim() === "") {
              setLoading(false);
              return alert("Empty Field Found");
            }
          } else if (body[Object.keys(body)[i]].length == 0) {
            setLoading(false);
            return alert("Empty Field Found");
          }
        }
      }

      console.log("body:::::::::", body, ":::::::body");
      // if (something.state.checkbox.filter(
      //   (data) => data.name === "brochureFileName")) {
      //     body["brochureFileName"] = something.state.checkbox.filter(
      //       (data) => data.name === "brochureFileName"
      //     )[0].value;
      //   }
      // if (!link && body["brochureFileName"]) {
      //   delete body.brochureFileName;
      // }
      const data = await editCourseApi(id, body);

      sahil().then((something) => {
        console.log(something, "askjhdfkjhasjkfhkjas");
        getOtprequest(
          {
            Fieldchange: something.data.data.field_name,
            Newdata: something.data.data.new_schema,
            Olddata: something.data.data.old_schema,
          },
          something.data.data._id
        );
        // console.log(maildata, ":::::::::::::::;;maildata");
        setLoading(false);
        alert("Successfully Added");
        window.open("/Approvalwindow", "_self");
      });
      // (maildata)
      async function sahil() {
        return await getApprovalspecificschema(data.data.data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Enter Field is less then the required Validation");
    }
  };

  const onchnage = function (e) {
    let body = { ...editdata };
    body[e.target.name] = e.target.value;

    setEditdata(body);
  };

  // console.log('====================================');
  // console.log(editdata, cacheData, value);
  // console.log('====================================');

  return (
    <>
      {loading && <Loader />}

      <div className="main_container_edit" style={{ width: "80%" }}>
        <div className="main_container_divider">
          <div className="main_container_divid">
            <div className="change_content">
              <p>CHANGE CONTENT</p>
            </div>
            <form onSubmit={submitHandler}>
              <div>
                {something.state.checkbox
                  .filter((data, index) => index != 0)
                  .map((data) => {
                    return (
                      <div className="enquire_box_space">
                        <div className="form-inpt-contnr">
                          <p className="enquireFormplace">{data.name}</p>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <h1
                              style={{
                                fontSize: "18px",
                                opacity: ".75",
                                width: "18%",
                              }}
                            >
                              PREVIOUS CONTENT
                            </h1>
                            &nbsp;&nbsp;&nbsp;
                            {data.name === "brochureFileName" ? (
                              data.value ? (
                                <a
                                  style={{ fontSize: "18px" }}
                                  href={data.value}
                                  target="_blank"
                                >
                                  {data.value}
                                </a>
                              ) : (
                                "---"
                              )
                            ) : (
                              <p className="enquireFormplace2">{data.value}</p>
                            )}
                          </div>
                          {data.name === "tag" ? (
                            <div>
                              <TagPicker
                                cacheData={cacheData}
                                value={value}
                                onChange={setValue}
                                onSelect={handleSelect}
                                style={{ width: 500 }}
                                placeholder="Select Tags"
                                data={options}
                              />
                            </div>
                          ) : data.name === "brochureFileName" ? (
                            <div>
                              <div>
                                <div className="program_container_box">
                                  <h2>New Brochure Upload</h2>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <input
                                      style={{ marginTop: "10px" }}
                                      type="file"
                                      accept="application/pdf"
                                      name="file"
                                      onChange={(e) => {
                                        buttonClick(e.target.files[0]);
                                      }}
                                    ></input>
                                  </div>
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <h1
                                    style={{ fontSize: "18px", opacity: ".75" }}
                                  >
                                    NEW CONTENT
                                  </h1>

                                  {link ? (
                                    <a
                                      href={link}
                                      style={{ marginLeft: "20px" }}
                                    >
                                      {link}
                                    </a>
                                  ) : (
                                    "---"
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <h1 style={{ fontSize: "18px", opacity: ".75" }}>
                                NEW CONTENT
                              </h1>
                              <input
                                defaultValue={data.value}
                                value={editdata[data.name]}
                                onChange={onchnage}
                                type="text"
                                className="form-inpt enquireFormInputedit"
                                name={data.name}
                                required
                                maxLength={10000}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="request_approval">
                <button
                  type="submit"
                  id="edit-submit-btn"
                  className="request_approval_btn"
                >
                  Request Approval
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Editcourse;
