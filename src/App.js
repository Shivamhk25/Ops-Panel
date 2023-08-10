import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import 'rsuite/styles/index.less';
import 'rsuite/dist/rsuite.min.css'

import { BrowserRouter, Navigate, Router, Routes } from "react-router-dom";
import TopHeader from "./Components/topHeader";
import SideHeader from "./Components/sideHeader";
import Componentrender from "./Components/Componentrender";
import { useState, useEffect } from 'react';
import { getUserdetail } from './services/getUserdetail';
import configs from './constants';
import Loader from "./Components/loader/loading";
import Cookies from 'universal-cookie';


function App() {
  const cookies = new Cookies();
  const [login, setLogin] = useState(cookies.get('at',{domain : configs.DOMAIN, path : '/'}) || false);
  const [loading, setLoading] = useState(false);

  const logout = () =>{
    setLoading(true)
    cookies.remove('at',{domain : configs.DOMAIN, path : '/'})
    cookies.remove('aid',{domain : configs.DOMAIN, path : '/'})
    cookies.remove('pid',{domain : configs.DOMAIN, path : '/'})
    setLoading(false)
    if(login) window.open("/", "_self")
  }
  useEffect(()=>{
    if(cookies.get('aid',{domain : configs.DOMAIN, path : '/'})){
      callasyncfunction().then((data) => {
        if(data.ifActive) setLogin(data.ifActive)
        setLoading(false)
      }).catch(err => {
        console.log(err, "loginerror");
        logout()
        alert("You are not authorised to access this panel, Please contact Marketingops Tech Support")
        setLoading(false)
      })
    }
    async function callasyncfunction() {
      return await getUserdetail()
    }
      
  }, [])

  return (
    <>
      {loading && <Loader />}
      <BrowserRouter >
        <div>
          <TopHeader />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              paddingTop: "70px",
            }}
          >
            
            {login ? <>
             <div style={{ width: "236px", height: "100vh", position: "fixed" }}>
              <SideHeader />
            </div>
            <div className="main-container3"
              style={{ width: "100%", paddingTop: "60px", marginLeft: "18%", overflowX: 'auto' }}
            >
              <Componentrender />
            </div>
            </>
              : <div className='main-container2'>
              <a style={{textDecoration: 'none', textAlign: 'center'}} href={configs.DASHBOARD} target="_blank">
              <button className='loginwithpegasus' >Login with Pegasus</button>
              </a>
            </div>}
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
