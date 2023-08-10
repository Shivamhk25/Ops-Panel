import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { getServerSideProps } from "../services/marketinggetapi";
import "./css/editcourse.css";
import { TagPicker } from "rsuite";
import { editCourseApi } from "../services/editCourseapi";
import { ListGroupItem } from "react-bootstrap";
import Loader from "./loader/loading";

function Viewcoursedetail() {
  let { id } = useParams();
  console.log(id);
  const [propsdata, setPropsdata] = useState("");
  const [programtag, setProgramtag] = useState([]);
  const [checkbox, setCheckbox] = useState([{ name: "", value: "" }]);

  useEffect(() => {
    specificdata().then((specificdata) => {
      setPropsdata(specificdata.data.specific);
      setProgramtag(specificdata.data.programtag);
      // console.log(specificdata.data.programtag, ":::::::::::");
      // console.log(specificdata.data.specific);
    });

    async function specificdata() {
      return await getServerSideProps(id);
    }
  }, []);

  useEffect(() => {}, [checkbox.length]);

  function handlecheckbox(e) {
    let arrayToDo = [];
    if (e.target.checked) {
      // console.log("It is checked!")
      if (checkbox && checkbox.length > 0) {
        arrayToDo = [
          ...checkbox,
          { name: e.target.name, value: e.target.value },
        ];
      } else arrayToDo = [e.target.name.trim()];
    } else {
      // console.log("It is unchecked!")
      var index = checkbox
        .map((data) => data.name)
        .indexOf(e.target.name.trim());
      if (index !== -1) {
        checkbox.splice(index, 1);
        // console.log("In if")
        // console.log("checkbox ::: ", checkbox)
        arrayToDo = checkbox;
      } else {
        // console.log("second else")
        // console.log("checkbox ::: ", checkbox)
        arrayToDo = checkbox;
      }
    }

    setCheckbox([...arrayToDo]);
    return;
  }
  console.log("Checkbox :::::: ", checkbox);
  return (
    <div>
      <div className="main_container_edit_viewCourse">
        <div className="program_name_container">
          <h1 className="program_name">Program Name</h1>
          <h1 style={{ fontSize: "21px", lineHeight: "24px", opacity: "75%" }}>
            {propsdata.programTitle}
          </h1>
        </div>
        <div>
          <h1 className="program_page">Program Page</h1>
        </div>

        <div className="program_container">
          <div className="program_container_inside">
            <input
              onClick={handlecheckbox}
              className="check_box"
              type="checkbox"
              id=""
              name="programTitle"
              value={propsdata.programTitle}
            />
            <div className="program_container_box">
              <h2>Program Title</h2>
              <h1>{propsdata.programTitle}</h1>
            </div>
          </div>
          <div className="program_container_inside">
            <input
              onClick={handlecheckbox}
              className="check_box"
              type="checkbox"
              id=""
              name="programName"
              value={propsdata.programName}
            />
            <div className="program_container_box">
              <h2>Program Name</h2>
              <h1>{propsdata.programName}</h1>
            </div>
          </div>
          <div className="program_container_inside">
            <input
              onClick={handlecheckbox}
              className="check_box"
              type="checkbox"
              id=""
              name="metaDescription"
              value={propsdata.metaDescription}
            />
            <div className="program_container_box">
              <h2>Meta Description</h2>
              <h1>{propsdata.metaDescription}</h1>
            </div>
          </div>
          <div className="program_container_inside">
            <input
              onClick={handlecheckbox}
              className="check_box"
              type="checkbox"
              id=""
              name="metaKeyword"
              value={propsdata.metaKeyword}
            />
            <div className="program_container_box">
              <h2>Meta Keywords</h2>
              <h1>{propsdata.metaKeyword}</h1>
            </div>
          </div>
          <div className="program_container_inside">
            <input
              onClick={handlecheckbox}
              className="check_box"
              type="checkbox"
              id=""
              name="ogTitle"
              value={propsdata.ogTitle}
            />
            <div className="program_container_box">
              <h2>Og:Title</h2>
              <h1>{propsdata.ogTitle}</h1>
            </div>
          </div>
          <div className="program_container_inside">
            <input
              onClick={handlecheckbox}
              className="check_box"
              type="checkbox"
              id=""
              name="ogDescription"
              value={propsdata.ogDescription}
            />
            <div className="program_container_box">
              <h2>Og:Description</h2>
              <h1>{propsdata.ogDescription}</h1>
            </div>
          </div>
          <div className="program_container_inside">
            <input
              onClick={handlecheckbox}
              className="check_box"
              type="checkbox"
              id=""
              name="applicationDeadline"
              value={propsdata.applicationDeadline || "---"}
            />
            <div className="program_container_box">
              <h2>Application Deadline</h2>
              <h1>{propsdata.applicationDeadline || "---"}</h1>
            </div>
          </div>
          <div className="program_container_inside">
            <input
              onClick={handlecheckbox}
              className="check_box"
              type="checkbox"
              id=""
              name="startDate"
              value={propsdata.startDate || "---"}
            />
            <div className="program_container_box">
              <h2>Start Date</h2>
              <h1>{propsdata.startDate || "---"}</h1>
            </div>
          </div>
          <div className="program_container_inside">
            <input
              onClick={handlecheckbox}
              className="check_box"
              type="checkbox"
              id=""
              name="tag"
              value={programtag.map((d) => d.label) || "---"}
            />
            <div className="program_container_box">
              <h2>Program Tags</h2>
              {programtag.length > 0 ? (
                <h1>{programtag.map((d) => d.label).join(",")}</h1>
              ) : (
                <h1>--</h1>
              )}
            </div>
          </div>
          <div className="program_container_inside">
            <input
              onClick={handlecheckbox}
              className="check_box"
              type="checkbox"
              id=""
              name="brochureFileName"
              value={propsdata.brochureFileName}
            />
            <div className="program_container_box">
              <h2>Brochure Link</h2>
              <a
                href={propsdata.brochureFileName}
                target="_blank"
                style={{ fontWeight: 500, overflowWrap: "break-word" }}
              >
                {propsdata.brochureFileName
                  ? propsdata.brochureFileName
                  : "---"}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div>
        {checkbox && checkbox.length >= 2 ? (
          <div className="floater_edit">
            <p>{checkbox.length - 1} Field Selected</p>
            <Link
              to={`/Editcourse${propsdata._id}`}
              state={{ checkbox }}
              style={{ textDecoration: "none" }}
            >
              <button className="floater_button">
                <p>Edit</p>
              </button>
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Viewcoursedetail;
