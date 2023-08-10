import React,{useState,useEffect} from "react";
import Form from "react-jsonschema-form";
import { useNavigate,useParams } from "react-router-dom";
import WebinarAllField from "../services/webinarapi";
import WebinarJsonForm from "../services/webinarFormApi"
import Loader from "./loader/loading";
import "./css/webinar.css";

function Webinardetails() {
  const [data,setData] = useState()
  const [viewuischema,setViewuischema] = useState()
  const [formDataSchema,setFormDataSchema] = useState()
  const [edituischema,setEdituischema] = useState()
  const [loading,setLoading] = useState(true)
  const [programName,setProgramName] = useState()
  const {id} = useParams()
  let navigate=useNavigate()

  useEffect(() => {
    getAllData().then((res) => {
      let ApiData=res.data
      setProgramName(res.data['ProgramName'])
      for(let i in ApiData){
        if( i == "ProgramName" || i == "_id" || i == "createdAt" || i == "updatedAt")
        {
          delete ApiData[i]
        }
      }
      for(let i in ApiData){
        for(let j in ApiData[i])
        {
          let data1=ApiData[i][j]
          delete ApiData[i][j]
          ApiData[i][j]={data1:data1}
        }
      }
      setData(ApiData);
      setLoading(false);
    });

    async function getAllData() {
      setLoading(true);
      // console.log(await WebinarJsonForm(),"ssssssss");
      await WebinarJsonForm().then((res)=>{
      setViewuischema(res.data[0].Viewuischema)
       setFormDataSchema(res.data[0].FormDataSchema)
       setEdituischema(res.data[0].Edituischema)
      })
      return await WebinarAllField(id);
    }
  },[]);

  const handleclick = (e)=>{
    console.log(e.formData, "datattatatatat");
    navigate(`/WebinarEdit${id}`,{state:{state:e.formData,edituischema:edituischema,formDataSchema:formDataSchema}})
  }
  return (
   
    <div>
       {loading ? <Loader/> :
      <div className="main_container_edit_viewCourse">
        <h1 className="header">
          {programName} 
        </h1>
        <Form
          schema={formDataSchema}
          uiSchema={viewuischema}
          formData={data}
          onSubmit={(e)=>{
            handleclick(e);
         
          }}
        >
          <div>
            <button type="submit" className="button">
                <p>
                Edit Fields
                </p>
            </button>             
          </div>
        </Form>
      </div>}
    </div>
  );
}

export default Webinardetails;
