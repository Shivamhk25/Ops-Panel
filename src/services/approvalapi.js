import axios from "axios";
import configs from "../constants";
import Cookies from 'universal-cookie';

export async function getApprovalallschema() {
  const cookies = new Cookies();
  // Fetch data from external API
  try {
    const res = await axios.get(
      `${configs.MARKETING_ENDPOINT}/marketingopspanel/get_approval_view`
      ,{
        headers: {
          'x-access-token': cookies.get('at',{domain : configs.DOMAIN, path : '/'}),
        }
      }
    );
    // console.log(res.data)
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export async function getApprovalspecificschema(id) {
  const cookies = new Cookies();

  // Fetch data from external API
  try {
    const res = await axios.get(
      `${configs.MARKETING_ENDPOINT}/marketingopspanel/get_sp_approval?_id=${id}`
      ,{
        headers: {
          'x-access-token': cookies.get('at',{domain : configs.DOMAIN, path : '/'}),
        }
      }
    );
    // console.log(res.data)
    return res.data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export async function getOtprequest(maildata, approvalId) {
  console.log(approvalId, ":::::::::::approvalID");
  const cookies = new Cookies();
  try {
    const res = await axios.post(
      `${configs.MARKETING_ENDPOINT}/marketingopspanel/marketing_otp`,
      {
        aid: cookies.get('aid',{domain : configs.DOMAIN, path : '/'}),
        pid: cookies.get('pid',{domain : configs.DOMAIN, path : '/'}),
        maildata: maildata,
        approvalId : approvalId
      },{
      headers: {
        'x-access-token': cookies.get('at',{domain : configs.DOMAIN, path : '/'}),
      }
    }
    )
    return res.data
  } catch (error) {
    console.log(error)
    return {}
  }
}

export async function getOtprequest_verify(data, approvalId,id) {
  const cookies = new Cookies();
  try {
    const res = await axios.post(
      `${configs.MARKETING_ENDPOINT}/marketingopspanel/marketing_otp_vrfy`,
      {
        aid: cookies.get('aid',{domain : configs.DOMAIN, path : '/'}),
        pid: cookies.get('pid',{domain : configs.DOMAIN, path : '/'}),
        otp: data,
        approvalId: approvalId,
        id:id
      },{
        headers: {
          'x-access-token': cookies.get('at',{domain : configs.DOMAIN, path : '/'}),
        }
      }
    )
    return res.data
  } catch (error) {
    console.log(error)
    return {}
  }
}

export async function getOtpTimer(id){
  const cookies = new Cookies();
  try {
    const res = await axios.get(
      `${configs.MARKETING_ENDPOINT}/marketingopspanel/get_otp_timer?_id=${id}`,
      {
        headers: {
          'x-access-token': cookies.get('at',{domain : configs.DOMAIN, path : '/'}),
        }
      }
    )
    return res.data
  } catch (error) {
    console.log(error)
    return {}
  }
}

export async function updata_data(id) {
  // console.log(id, "id in update_data");
  const cookies = new Cookies();
  try {
    const res = await axios.post(
      `${configs.MARKETING_ENDPOINT}/marketingopspanel/updata_data`,
      {
        id: id,
        changeapproveid : cookies.get('aid',{domain : configs.DOMAIN, path : '/'}),
      },{
        headers: {
          'x-access-token': cookies.get('at',{domain : configs.DOMAIN, path : '/'}),
        }
      }
    )
    return res.data
  } catch (error) {
    console.log(error)
    return {}
  }
}

export async function reject_data(id) {
  // console.log(id, "id in update_data");
  const cookies = new Cookies();
  try {
    const res = await axios.post(
      `${configs.MARKETING_ENDPOINT}/marketingopspanel/rj_d`,
      {
        id: id,
        chnagerejectid : cookies.get('aid',{domain : configs.DOMAIN, path : '/'}),
      },{
        headers: {
          'x-access-token': cookies.get('at',{domain : configs.DOMAIN, path : '/'}),
        }
      }
    )
    return res.data
  } catch (error) {
    console.log(error)
    return {}
  }
}
