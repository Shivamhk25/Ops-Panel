import axios from "axios";
import configs from "../constants";
import Cookies from 'universal-cookie'


export async function getUserdetail() {
  const cookies = new Cookies();

  let URL = `${configs.MARKETING_ENDPOINT}/marketingopspanel/login?`;
  // console.log(URL);
  let query = "";
  let aid = cookies.get('aid',{domain : configs.DOMAIN, path : '/'});
  // console.log(cookies.get('aid') + " cookieaid");
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
      // console.log({ data: res.data });
      let statusCode = res.status;
      if (res.data.success) {
        // console.log("getUserPermissions data!!", res.data);
        return { ...res.data.data, status: statusCode };
      } else {
        console.log("API call failed!", res.data);
        return { ...res.data, status: statusCode };
      }
    })
    .catch((err) => {
      console.log(err, "api error");
      throw err;
    });
}
