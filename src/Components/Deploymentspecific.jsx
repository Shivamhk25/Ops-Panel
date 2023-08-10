import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { getDeploymentSpecificStatus, getDeploymentName } from "../services/deploymentapi";
import './css/approval.css'
import Loader from "./loader/loading";
import moment from 'moment';


function Deploymentspecific() {
  let { id } = useParams();
  const [propsdata, setPropsdata] = useState("");
  const [loading, setLoading] = useState(false);
  const [approvalID, setApprovalID] = useState([]);
  const [programName, setProgramName] = useState("");

  useEffect(() => {
    sahil().then((something) => {
      setPropsdata(something.data.deploymentdata);
      deploymentName(something.data.deploymentdata.linked_approval_ids).then((data) => {
        setProgramName(data.data.data)
        setLoading(false)
      })
    });
    async function sahil() {
      setLoading(true)
      return await getDeploymentSpecificStatus(id);
    }
    
    async function deploymentName(apid){
      setLoading(true)
      return await getDeploymentName(apid)
    }

  }, []);

  let deploymentStatusRender = {
      1: "Pending Deployment",
      2: "Running",
      4: "Success",
      3: "Fail"
  }


  // console.log({approvalID});

  return ( 
  <>
      {loading && <Loader />}
      <div className="deploymentComponent">
        <h1 className="deploymentComponenth1">Deployment Logs</h1>
        <div className="deploymentsecondarycomponent" >
            <div className="deploymentlogcontainer">
                <h1>Deployment Status</h1>
                <h1 style={{fontSize: "18px"}} >{deploymentStatusRender[propsdata.deployment_status]}</h1>
            </div>
            <div className="deploymentlogcontainer">
                <h1>Environment Type</h1>
                <h1 style={{fontSize: "18px"}} >{propsdata.env_type}</h1>
            </div>
            <div className="deploymentlogcontainer">
                <h1>Date and Time</h1>
                <h1 style={{fontSize: "18px"}} >{moment(propsdata.updatedAt).format("DD/MM/YYYY, h:mm:ss a")}</h1>
            </div>
            <div className="deploymentlogcontainer">
                <h1>Linked Approval</h1>
                <div>
                  {programName && programName.map((data) => {
                    return(
                      <Link style={{textDecoration: "none"}} to={`/Viewdeploymentdetail${data._id}`}>
                        <h1 style={{fontSize: "18px", lineHeight: '24px'}} >{(data.schema_name.includes("Webinar")?data.new_schema.ProgramName :data.new_schema.programTitle)}</h1>
                      </Link>
                    )
                  })}
                </div>
            </div>
            <div className="deploymentlogcontainer2">
                <h1> Logs</h1>
                <div className="deploymentlog">
                    <h1>{propsdata.logs}</h1>
                </div>
            </div>
        </div>
      </div>
  </>
  );
}

export default Deploymentspecific;
