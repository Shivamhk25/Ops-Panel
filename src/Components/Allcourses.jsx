import React from "react";
import TopHeader from "./topHeader";
import "./css/allcourses.css";
import { useEffect, useState } from "react";
import { getServerSideProps } from "../services/marketinggetapi";
import { Link } from 'react-router-dom';
import Loader from "./loader/loading";

function Allcourses() {
  useEffect(() => {
    sahil().then((something) => {
      setPropsdata(something);
      console.log(something.data.allData, "data")
      setLoading(false)
    });
    async function sahil() {
      setLoading(true)
      return await getServerSideProps();
    }
  }, []);

  const [propsdata, setPropsdata] = useState("");
  const [loading, setLoading] = useState(false)

  return (
    <>
      {loading && <Loader />}
      <div className="container-fluid" style={{ height: "100vh" }}>
        <div className="row" style={{ height: "100%" }}>
          <div>
            <TopHeader />
          </div>
          <div className="main-container">
            <div className="allcoursescontainer">
              <h1>All Courses</h1>
              
              {propsdata!==""?<div style={{display: 'flex', flexWrap: 'wrap'}} >{propsdata.map((data)=>{
                return(
                  <div className="data_card">
                    <p><span>Name: </span> {data.name}</p>
                    <p><span>Program Title: </span> {data.programtitle}</p>
                    <p><span>Duration: </span> {data.launch_date}</p>
                    <p><span>Program Description: </span>{data.metadesc}</p>
                    <p><span>Program Meta Keyword: </span>{data.metakeyword}</p>
                    <p><span>Program OG Desc: </span>{data.ogdesc}</p>
                    <p><span>Program Og title: </span>{data.ogtitle}</p>
                    <p><span>Categorie: </span>{data.categories}</p>
                    <p><span>Domain: </span>{data.domain}</p>
                    <p><span>ID: </span>{data._id}</p>

                    <div className="edit_button_main" >
                      <button >
                        <Link style={{textDecoration: "none", color: "#fff"}} to={`/Viewcoursedetail${data._id}`}>
                        <p>Edit</p>
                        </Link>
                      </button>
                    </div>
                </div>
                )
              })}</div>:null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Allcourses;
