import axios from "axios";
import configs from "../constants";
import Cookies from 'universal-cookie'


export async function getUserdetail() {
  const cookies = new Cookies();

  let URL = `${configs.MARKETING_ENDPOINT}/marketingopspanel/login?`;
  let query = "";
  let aid = cookies.get('aid',{domain : configs.DOMAIN, path : '/'});
  let pid = cookies.get("pid",{domain : configs.DOMAIN, path : '/'});

  if (aid) query += "aid=" + aid;
  if (!query) {
    if (pid) query += "pid=" + pid;
  } else {
    if (pid) query += "&pid=" + pid;
  }
  return axios({
    method: "get",
    url: URL + query,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "x-access-token": cookies.get("at",{domain : configs.DOMAIN, path : '/'}),
    },
  })
    .then((res) => {
      let statusCode = res.status;
      if (res.data.success) {
        return { ...res.data.data, status: statusCode };
      } else {
        return { ...res.data, status: statusCode };
      }
    })
    .catch((err) => {
      throw err;
    });
}
