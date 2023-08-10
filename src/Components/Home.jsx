import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { getServerSideProps } from "../services/marketinggetapi";
import './css/home.css'
import Cookies from 'universal-cookie';
import configs from "../constants";
import Loader from './loader/loading';


function Home() {
  const cookies = new Cookies();
  useEffect(()=>{
    
    sahil().then((something) => {
      let ck = cookies.get('at',{domain : configs.DOMAIN, path : '/'})
      if(!ck)
        return;
      setPropsdata(something.data.allData);
      setLoading(false)
      // console.log(something.data.allData);
    });
    async function sahil() {
      setLoading(true);
      return await getServerSideProps();
    }
      
  }, [])


  const [propsdata, setPropsdata] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <>
    {loading && <Loader />}
    <div className="container-fluid" style={{height:"100vh"}}>
      <div className="row" style={{height:"100%"}}>
          <div className='home_container'>
            <div className='home_title_div'>
              <h1 className='home_title' >Program List</h1>
            </div>
            <div className='home_table'>
            <table className="table table-striped">
              <thead>
                <tr className='uper_table_container' >
                  <th scope="col" style={{width: '28%', paddingRight: '10px'}} >Program Title</th>
                  <th scope="col">Application Deadline</th>
                  {/* <th scope="col">Edited By</th>
                  <th scope="col">Edited On</th>
                  <th scope="col">Approved By</th> */}
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {propsdata.length > 0 && propsdata.map((data, idx) => {
                  return(
                    <tr className='uper_table_container' key={idx}>
                      <th scope="row" style={{paddingRight: '20px'}}>{data.programTitle}</th>
                      <th>{data.applicationDeadline||'---'}</th>
                      {/* <th>{data.aid?data.aid: '---'}</th>
                      <th>{data.editeddate?data.editeddate:'---'}</th>
                      <th>{data.approvedaid?data.approvedaid:'---'}</th> */}
                      <th>
                        <Link style={{textDecoration: "none", color: "#fff"}} to={`/Viewcoursedetail${data._id}`}>
                        <img src="https://cdn.pegasus.imarticus.org/iit_roorkee/editicon1.svg" alt="edit icon" height="20px" width="20px"/>
                        </Link>
                      </th>

                    </tr>
                  )
                })}
              </tbody>
            </table>
            
            </div>
          </div>
        
      </div>
    </div>
    </>
  )
}

export default Home