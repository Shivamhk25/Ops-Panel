import React, { useEffect, useState } from "react";
import Form from "react-jsonschema-form";
import { useLocation, useParams } from "react-router-dom";
import { WebinarEditApi } from "../services/webinarapi";
import WebinarJsonForm from "../services/webinarFormApi";
import Loader from "./loader/loading";
import {
  getApprovalspecificschema,
  getOtprequest,
} from "../services/approvalapi";
import "./css/webinar.css";

function WebinarEdit() {
  let data = useLocation();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  console.log(data.state.state, "data");
  for (let i in data.state.state) {
    for (let j in data.state.state[i]) {
      if (
        !(
          j.includes("Image") ||
          j.includes("Info") ||
          j == "image" ||
          j == "career"
        )
      ) {
        let data1 = data.state.state[i][j].data1;
        data.state.state[i][j].data = data1;
      }
    }
  }
  console.log(data.state.state, "dataaa");

  // useEffect(() => {
  //   getAllData();

  //   async function getAllData() {
  //     setLoading(true);
  //     await WebinarJsonForm().then((res) => {
  //       setEdituischema(res.data[0].Edituischema);
  //       console.log("3");
  //     });

  //     console.log("5");
  //     setLoading(false);
  //   }
  // }, []);

  const handleSubmit = async (e) => {
    console.log(e.formData, "res");
    try {
      let obj = {};
      for (let i in data.state.state) {
        obj[i] = {};
        for (let j in data.state.state[i]) {
          if (data.state.state[i][j].checkbox) {
            obj[i][j] =
              e.formData[i][j].data === undefined ? "" : e.formData[i][j].data;
            if (
              e.formData[i][j].data === undefined &&
              typeof e.formData[i][j].data1 === "object"
            ) {
              obj[i][j] = {};
            }
            if (
              e.formData[i][j].data === undefined &&
              Array.isArray(e.formData[i][j].data1)
            ) {
              obj[i][j] = [];
            }
          }
        }
        for (let i in obj) {
          if (Object.keys(obj[i]).length === 0) {
            delete obj[i];
          }
        }
      }
      console.log(obj, "data");
      setLoading(true);
      let resBack = await WebinarEditApi(id, obj);
      if (resBack.status === 200) {
        approvalCall().then((something) => {
          console.log(something, "askjhdfkjhasjkfhkjas");
          getOtprequest(
            {
              Fieldchange: something.data.data.field_name,
              Newdata: something.data.data.new_schema,
              Olddata: something.data.data.old_schema,
            },
            something.data.data._id
          );
          setLoading(false);
          alert("Successfully Added");
          window.open("/Approvalwindow", "_self");
        });
        async function approvalCall() {
          return await getApprovalspecificschema(resBack.data.data);
        }
      } else {
        setLoading(false);
        alert(resBack.data.message);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("Enter Field is less then the required Validation");
    }
  };
let WebinarUiSchema= data.state.edituischema

  modifyStaticWebinarSchemaAsPerFieldsToEdit();
  function modifyStaticWebinarSchemaAsPerFieldsToEdit() {
    for (let webinarSectionKey in data.state.state) {
      let webinarSectionObject = data.state.state[webinarSectionKey];
      let count = 0;
      for (let webinarSubSectionKey in webinarSectionObject) {
        let webinarSubSectionObject =
          webinarSectionObject[webinarSubSectionKey];
        if (webinarSubSectionObject.checkbox == true) {
          count += 1;
        }
        if (webinarSubSectionObject.checkbox != true) {
          WebinarUiSchema[webinarSectionKey][webinarSubSectionKey]["ui:widget"] =
            "hidden";
        }
      }
      if (count == 0) {
        WebinarUiSchema[webinarSectionKey]["ui:widget"] = "hidden";
      }
    }
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="main_container_edit_viewCourse">
          <Form
            schema={data.state.formDataSchema}
            uiSchema={data.state.edituischema}
            formData={data.state.state}
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          />
        </div>
      )}
    </div>
  );
}

export default WebinarEdit;
// export const data=data1
