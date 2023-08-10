import React from 'react'
import Home from './Home';
import Allcourses from './Allcourses';
import Newcourseentry from './Newcourseentry';
import Viewcoursedetail from './Viewcoursedetail';
import { Navigate, Route, Routes } from "react-router-dom";
import Editcourse from './Editcourse';
import Approval from './Approvalwindow';
import Approvalspecific from './Approvalspecific';
import Deployment from './Deployment';
import Deploymentspecific from './Deploymentspecific';
import Viewdeploymentdetail from './Viewdeploymentdetail';
import WebinarHome from './WebinarHome';
import WebinarEdit from './WebinarEdit';
import Webinardetails from './Webinardetails';
import Viewapprovaldetail from './Viewapprovaldetail'
import Settings from './Settings';


function Componentrender() {
  return (
    <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/allcourses" element={<Allcourses />} />
                <Route path="/Newcourseentry" element={<Newcourseentry />} />
                <Route path="/Viewcoursedetail:id" element={<Viewcoursedetail />}/>
                <Route path="/Editcourse:id" element={<Editcourse />} />
                <Route path="/WebinarHome" element={<WebinarHome />} />
                <Route path="/Settings" element={<Settings />} />
                <Route path="/Webinardetails:id" element={<Webinardetails />} />
                <Route path="/WebinarEdit:id" element={<WebinarEdit />} />
                <Route path='/Approvalwindow' element={<Approval/>}/>
                <Route path='/Approvalspecific:id' element={<Approvalspecific/>}/>
                <Route path='/Viewapprovaldetail:id' element={<Viewapprovaldetail/>}/>
                <Route path='/Deployment' element={<Deployment/>} />
                <Route path='/Deploymentspecific:id' element={<Deploymentspecific/>} />
                <Route path="*" element={<Navigate to="/" replace />} />
                <Route path="/Viewdeploymentdetail:id" element={<Viewdeploymentdetail/>} />
            </Routes>
    </>
  )
}

export default Componentrender