import React from "react";
import { useState, useEffect } from "react";
import {Modal} from "react-bootstrap";
import "./css/approval.css";
import {getOtprequest_verify, updata_data, getOtpTimer} from '../services/approvalapi'
import {useParams} from 'react-router-dom';

function MyVerticallyCenteredModal(props) {
console.log(props,"modal call");
  const {id} = useParams();
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [resotp, setResotp] = useState(false);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
          setSeconds(seconds - 1);
      }
      if (seconds === 0) {
          if (minutes === 0) {
              clearInterval(myInterval)
          } else {
              setMinutes(minutes - 1);
              setSeconds(59);
          }
      } 
  }, 1000)
  return ()=> {
      clearInterval(myInterval);
    };
});

//  console.log({props})
  const resendotp = () => {
    resend().then(() => {
      otptimer()
      props.setLoading(false)
    })
    
    async function resend (){
        props.setLoading(true)
        setResotp(true)
        return await props.getOtprequest(props.maildata, props.approvalId);
      }
  }

  const otptimer = () => {
    timer().then((time) => {
      var myDate = new Date(time.data.timer.gnat);
      var newDate = new Date()
      var diff = Math.abs(newDate - myDate);
      var msec = diff;
      var hh = Math.floor(msec / 1000 / 60 / 60);
      msec -= hh * 1000 * 60 * 60;
      var mm = Math.floor(msec / 1000 / 60);
      msec -= mm * 1000 * 60;
      var ss = Math.floor(msec / 1000);
      msec -= ss * 1000;
      
      let mint = 29 - mm
      let secd = 60 - ss
      if(mint <= -1){
        setMinutes("0")
        setSeconds("0")
      }else {
        setMinutes(mint)
        setSeconds(secd)
      }

    });

    async function timer() {
      return await getOtpTimer(props.approvalId);
    }
  }

  useEffect(() => {
    otptimer()
  },[])

  const [otp, setOtp] = useState("")
  const [error, setError] = useState()
  const [success, setSuccess] = useState("")

  const submitOtp = async (e) => {
    e.preventDefault()
    try {
      setError(null)
      const data = await getOtprequest_verify(
        otp,
        props.approvalId,
        props.id
      )
      if(data.success){
        setSuccess("Otp is verified and data has been updated")
        const updata = await updata_data(
          id
        )
        localStorage.setItem("min", 0);
        localStorage.setItem("sec", 0);
        window.open("/Approvalwindow", "_self");
      } else {
        setError("OTP is not valid")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={props.handleClose}
      className="model_container"
     
    >
      <Modal.Header closeButton></Modal.Header>
      <div>
        <div className="otp_main_div">
          <img
            src="https://cdn.pegasus.imarticus.org/imarticus_2/EnquireOTP.webp"
            alt=""
            height="120px"
            width="120px"
          />
          <p className="otp_main_div_p">
            An OTP is sent to your manager email id. <br /> OTP is valid upto 30
            min
          </p>
        </div>
        <div>
          <input
            value={otp}
            type="number"
            onChange={(e) => setOtp(e.target.value)}
            className="form-inpt otp-input"
            placeholder="0-0-0-0-0-0"
            name="otp"
            required
            maxLength={6}
          />
        </div>
        <div className="otp_div_button" >
          <div style={{display:'flex', justifyContent: 'center'}} >
            <p>{minutes >= 10 ? minutes : "0" + minutes}:{seconds >= 10 ? seconds : "0" + seconds}</p>
            <div  style={{position:'absolute', right: '20px'}} >
              <p  onClick={resendotp} style={{fontSize: '16px', color: '#68c29d', cursor: 'pointer'}}>Resend OTP</p>
            </div>
          </div>
              {resotp? <p>OTP has been resent on your manager Email Id</p> : <p>OTP has been send on your manager Email Id</p>}
          <div className="otp_btn">
            <button type="submit" onClick={submitOtp} className="otp_very_btn" >Verify & Proceed</button>
            {error && <p className="error_msg_bottom">{error}</p>}
            {success && <p className="success_msg_bottom">{success}</p>}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
