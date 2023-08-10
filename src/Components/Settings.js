import React, { useEffect, useState } from "react";
import WebinarAllField from "../services/webinarapi";
import {WebinarEditJsonForm} from "../services/webinarFormApi";
import Loader from "./loader/loading";
import WebinarJsonForm from "../services/webinarFormApi";
import "./css/webinar.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import { CreateNewWebinar } from "../services/webinarapi";

function Settings() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [viewuischema, setViewuischema] = useState();
  const [formDataSchema, setFormDataSchema] = useState();
  const [edituischema, setEdituischema] = useState();
  const [open, setOpen] = useState(false);
  const [pop, setPop] = useState(false);
  const [editFormData,setEditFormData] = useState()

  useEffect(() => {
    async function allData() {
      await WebinarJsonForm().then((res) => {
        console.log(res);
        setLoading(true);
        setViewuischema(res.data[0].Viewuischema);
        setFormDataSchema(res.data[0].FormDataSchema);
        setEdituischema(res.data[0].Edituischema);
        setLoading(false);
      });
    }
    allData();
  }, []);

  const handleChange = (e) => {
    setEditFormData(e.target.value)
  };

  const editform = async (e) => {
    e.preventDefault();
    let res = await WebinarEditJsonForm(editFormData)
    console.log(res,"aaaaaa");
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="Main-div">
            <div className="Main-div1">
              <h1 className="Setting-heading">Form Json Schema</h1>
              <div className="Setting-data-div">
                <div className="Setting-data-div1">
                  <pre>{JSON.stringify(formDataSchema, null, 4)}</pre>
                </div>
              </div>
              <div className="setting-div-button">
                {!pop && (
                  <button
                    type="submit"
                    className="button"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    <p>Edit Schema</p>
                  </button>
                )}
              </div>
              {pop && (
                <div className="Setting-data-div">
                  <div className="Setting-data-div1">
                        <textarea className="setting-textarea" onChange={handleChange}>
                          {JSON.stringify(formDataSchema, null, 4)}
                        </textarea>
                        <button type="submit" className="button" onClick={editform}>
                          <p>Edit Schema</p>
                        </button>
                  </div>
                </div>
              )}
            </div>
            <div className="Main-div1">
              <h1 className="Setting-heading">ViewUi Json Schema</h1>
              <div className="Setting-data-div">
                <div className="Setting-data-div1">
                  <pre>{JSON.stringify(viewuischema, null, 4)}</pre>
                </div>
              </div>
            </div>
            <div className="Main-div1">
              <h1 className="Setting-heading">EditUi Json Schema</h1>
              <div className="Setting-data-div">
                <div className="Setting-data-div1">
                  <pre>{JSON.stringify(edituischema, null, 4)}</pre>
                </div>
              </div>
            </div>
            <div>
              <Dialog
                open={open}
                onClose={() => {
                  setOpen(false);
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  Are you want to edit Form Json Schema
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description"></DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    Disagree
                  </Button>
                  <Button
                    autoFocus
                    onClick={() => {
                      setPop(true);
                      setOpen(false);
                    }}
                  >
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Settings;
